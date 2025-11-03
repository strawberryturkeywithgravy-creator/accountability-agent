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

        access(all) let participantNotes: [{Address: String}]
        access(all) let betVault: @FlowToken.Vault
        access(all) let completed: [Address]

        init(participantNotes: [{Address: String}], initialBetVault: @FlowToken.Vault) {
            self.participantNotes = participantNotes
            self.betVault <- initialBetVault
            self.completed = []
        }

        // Join bet
        access(contract) fun joinBet(participant: Address, note: String) {
            self.participantNotes.append({participant: note})
        }

        // Update completed list
        access(contract) fun updateCompleted(participant: Address) {
            self.completed.append(participant)
        }
    }

    // The resource that will be called by the scheduler
    access(all) resource BetHandler: FlowTransactionScheduler.TransactionHandler {

        access(all) var betters: {Address: Bool}
        access(all) let betVault: @FlowToken.Vault?

        access(all) init( roundID: UInt64, inittialBetVault: @FlowToken.Vault) {

            self.betVault <- inittialBetVault
 
            self.betters = {}

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

    access(all) fun createBet(participantNotes: [{Address: String}], initialBetVault: @FlowToken.Vault) {
        let initiator = participantNotes[0].keys[0]
        let storagePath = StoragePath(identifier: "BetOnYourself_Bet_\(initiator)")!
        let newBet <- create Bet(participantNotes: participantNotes, initialBetVault: <- initialBetVault)
        self.account.storage.save(<- newBet, to: storagePath)
    }

    access(all) fun joinBet(initiator: Address, participant: Address, note: String) {
        let storagePath = StoragePath(identifier: "BetOnYourself_Bet_\(initiator)")!
        let bet = self.account.storage.borrow<&Bet> (from: storagePath)!
        bet.joinBet(participant: participant, note: note)
    }

    // 

    // Create a fresh handler instance for an account to save and issue a capability from
/*     access(all) fun createHandler(amount: UFix64, bet: Bet): @BetHandler {
        return <- create BetHandler(amount: amount, bet: bet)
    } */

    init() {
        self.handlerStoragePath = /storage/BetOnYourself_SchedulerHandler
        self.handlerPublicPath = /public/BetOnYourself_SchedulerHandler
        emit ContractInitialized()
    }
}