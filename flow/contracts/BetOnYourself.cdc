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
                let newVault <- self.betVault.withdraw(amount: self.initialBetAmount * UFix64(self.participants.length)) as! @FlowToken.Vault
                let handler <- BetOnYourself.createHandler(betVault: <- newVault)
                let storagePath = StoragePath(identifier: "BetOnYourself_Bet_\(self.participants[0])_SchedulerHandler")!
                BetOnYourself.account.storage.save(<- handler, to: storagePath)
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


        access(all) init(betVault: @FlowToken.Vault) {

            self.betVault <- betVault
           // emit BetHandlerCreated(amount: bet.amount, bet: bet, path: /storage/BetOnYourself_SchedulerHandler)
        }

        // Called by scheduler with Execute entitlement
        access(FlowTransactionScheduler.Execute) fun executeTransaction(
            id: UInt64,
            data: AnyStruct?
        ) {
/*             pre {
                self.betVault?.balance == self.bet.amount * UFix64(self.bet.participants.length): "Not enough funds to start the bet"
            }
            // Decode input (defensive: tolerate nil/invalid)
            let bet = data as? Bet

            // At MVP: only emit events so we can verify end-to-end scheduling
            emit ScheduledExecutionReceived(
                id: id,
                notes: bet?.notes
            ) */


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
    access(contract) fun createHandler(betVault: @FlowToken.Vault): @BetHandler {
        return <- create BetHandler(betVault: <- betVault)
    }

    init() {
        self.handlerStoragePath = /storage/BetOnYourself_SchedulerHandler
        self.handlerPublicPath = /public/BetOnYourself_SchedulerHandler
        emit ContractInitialized()
    }
}