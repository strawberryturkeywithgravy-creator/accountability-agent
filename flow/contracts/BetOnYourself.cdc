import "FlowTransactionScheduler"
import "FungibleToken"
import "FlowToken"

access(all) contract BetOnYourself {

    // Storage paths for the handler (caller saves; capability is issued from storage)
    access(all) let handlerStoragePath: StoragePath
    access(all) let handlerPublicPath: PublicPath

    // Events for observability
    access(all) event ContractInitialized()
    access(all) event BetHandlerCreated(amount: UFix64, path: StoragePath)
    access(all) event ScheduledExecutionReceived(id: UInt64, notes: String?)
    access(all) event ScheduledExecutionErrored(id: UInt64, reason: String)

    // Entitlements
    // access(all) entitlement join
    // access(all) entitlement updateCompleted

    // Data format you can encode into transactionData when scheduling
    access(all) resource Bet {

        access(all) let participants: [Address]
        access(all) let betVault: @FlowToken.Vault
        access(all) let completed: [Address]
        access(all) let initialBetAmount: UFix64

        init(participants: [Address], initialBetVault: @FlowToken.Vault) {
            self.participants = participants
            self.initialBetAmount = initialBetVault.balance
            self.betVault <- initialBetVault
            self.completed = []
        }

        // Join bet
        access(contract) fun joinBet(participant: Address, betVault: @FlowToken.Vault) {
            self.participants.append(participant)
            self.betVault.deposit(from: <- betVault)
            
            // If all participants have joined, launch the scheduled bet transaction
            if self.initialBetAmount * UFix64(self.participants.length) == self.betVault.balance {
                // create a new vault with the amount of the bet
                let newVault <- self.betVault.withdraw(amount: self.initialBetAmount * UFix64(self.participants.length)) as! @FlowToken.Vault
                // estimate the transaction fee
                let est = FlowTransactionScheduler.estimate(
                    data: nil,
                    timestamp: getCurrentBlock().timestamp + 1000.0,
                    priority: FlowTransactionScheduler.Priority.Medium,
                    executionEffort: 1000
                )
                // assert the estimation is successful
                assert(
                    est.timestamp != nil || FlowTransactionScheduler.Priority.Medium == FlowTransactionScheduler.Priority.Low,
                    message: est.error ?? "estimation failed"
                )
                // withdraw the fees from the new vault
                let fees <- newVault.withdraw(amount: est.flowFee!) as! @FlowToken.Vault
                // create a new handler
                let handler <- BetOnYourself.createHandler(betVault: <- newVault, participants: self.participants)
                // save the handler to storage
                let storagePath = StoragePath(identifier: "BetOnYourself_Bet_\(self.participants[0])_SchedulerHandler")!
                BetOnYourself.account.storage.save(<- handler, to: storagePath)
                // Start loop with a cap to the handler
                let handlerCap = BetOnYourself.account.capabilities.storage.issue<auth(FlowTransactionScheduler.Execute) &{FlowTransactionScheduler.TransactionHandler}>(storagePath)
                // Schedule the transaction
                let receipt <- FlowTransactionScheduler.schedule(
                    handlerCap: handlerCap,
                    data: nil,
                    timestamp: getCurrentBlock().timestamp + 1000.0,
                    priority: FlowTransactionScheduler.Priority.Medium,
                    executionEffort: 1000,
                    fees: <- fees
                )
                // save the receipt to storage
                let storagepath = StoragePath(identifier: "BetOnYourself_Bet_\(self.participants[0])_Receipt")!
                BetOnYourself.account.storage.save(<- receipt, to: storagepath)
            }
        }

        // Update completed list
        access(contract) fun updateCompleted(participant: Address) {
            self.completed.append(participant)
        }
    }

    // The resource that will be called by the scheduler
    access(all) resource BetHandler: FlowTransactionScheduler.TransactionHandler {

        access(all) let betVault: @FlowToken.Vault
        access(all) let participants: [Address]


        access(all) init(betVault: @FlowToken.Vault, participants: [Address]) {

            self.betVault <- betVault
            self.participants = participants
           // emit BetHandlerCreated(amount: bet.amount, bet: bet, path: /storage/BetOnYourself_SchedulerHandler)
        }

        // Called by scheduler with Execute entitlement
        access(FlowTransactionScheduler.Execute) fun executeTransaction(
            id: UInt64,
            data: AnyStruct?,
        ) {
            // get the bet from storage
            let storagePath = StoragePath(identifier: "BetOnYourself_Bet_\(self.participants[0])")!
            let bet = BetOnYourself.account.storage.borrow<&Bet>(from: storagePath)!
            // fetch the list of completed participants
            let completed = bet.completed
            // Divide the bet vault by the number of participants
            let amountPerParticipant = self.betVault.balance / UFix64(self.participants.length)
            // Distribute the bet vault to the participants
            for participant in self.participants {
                let participantVault <- self.betVault.withdraw(amount: amountPerParticipant) as! @FlowToken.Vault
                // get the user's account and deposit the Flow tokens
                let userAccount = getAccount(participant)   
                let userVault = userAccount.capabilities.borrow<&{FungibleToken.Receiver}>(/public/flowTokenReceiver)!
                userVault.deposit(from: <- participantVault)
            }

            // At MVP: only emit events so we can verify end-to-end scheduling
            emit ScheduledExecutionReceived(
                id: id,
                notes: "Bet completed"
            ) 


        }
        
        access(all) view fun getViews(): [Type] {
            return [Type<StoragePath>(), Type<PublicPath>()]
        }

        access(all) fun resolveView(_ view: Type): AnyStruct? {
            switch view {
                case Type<StoragePath>():
                    return /storage/BetOnYourself_SchedulerHandler
                case Type<PublicPath>():
                    return /public/BetOnYourself_SchedulerHandler
                default:
                    return nil
            }
        }
    }

    //
    ///// PUBLIC FUNCTIONS /////
    ///

    access(all) fun createBet(participants: [Address], initialBetVault: @FlowToken.Vault) {
        let initiator = participants[0]
        let storagePath = StoragePath(identifier: "BetOnYourself_Bet_\(initiator)")!
        let newBet <- create Bet(participants: participants, initialBetVault: <- initialBetVault)
        self.account.storage.save(<- newBet, to: storagePath)
    }

    access(all) fun joinBet(initiator: Address, participant: Address, betVault: @FlowToken.Vault) {
        let storagePath = StoragePath(identifier: "BetOnYourself_Bet_\(initiator)")!
        let bet = self.account.storage.borrow<&Bet> (from: storagePath)!
        bet.joinBet(participant: participant, betVault: <- betVault)
    }

    // 

    // Create a fresh handler instance for an account to save and issue a capability from
    access(contract) fun createHandler(betVault: @FlowToken.Vault, participants: [Address]): @BetHandler {
        return <- create BetHandler(betVault: <- betVault, participants: participants)
    }

    init() {
        self.handlerStoragePath = /storage/BetOnYourself_SchedulerHandler
        self.handlerPublicPath = /public/BetOnYourself_SchedulerHandler
        emit ContractInitialized()
    }
}