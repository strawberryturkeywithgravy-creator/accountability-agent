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

    // Data format you can encode into transactionData when scheduling
    access(all) resource Bet {

        access(all) let participantNotes: {Address: String}
        access(all) let betVault: @FlowToken.Vault
        access(all) let completed: [Address]

        init(participantNotes: {Address: String}, initialBetVault: @FlowToken.Vault) {
            self.participantNotes = participantNotes
            self.betVault <- initialBetVault
            self.completed = []
        }

        // Update completed list
        access(all) fun updateCompleted(participant: Address) {
            pre {
                !self.participantNotes.keys.contains(participant): "Participant not found"
            }
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
            pre {
                self.betVault?.balance == self.bet.amount * UFix64(self.bet.participants.length): "Not enough funds to start the bet"
            }
            // Decode input (defensive: tolerate nil/invalid)
            let bet = data as? Bet

            // At MVP: only emit events so we can verify end-to-end scheduling
            emit ScheduledExecutionReceived(
                id: id,
                notes: bet?.notes
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

    // Create a fresh handler instance for an account to save and issue a capability from
    access(all) fun createHandler(amount: UFix64, bet: Bet): @BetHandler {
        return <- create BetHandler(amount: amount, bet: bet)
    }

    init() {
        self.handlerStoragePath = /storage/BetOnYourself_SchedulerHandler
        self.handlerPublicPath = /public/BetOnYourself_SchedulerHandler
        emit ContractInitialized()
    }
}