import "FlowTransactionScheduler"

access(all) contract BetOnYourself {

    // Storage paths for the handler (caller saves; capability is issued from storage)
    access(all) let handlerStoragePath: StoragePath
    access(all) let handlerPublicPath: PublicPath

    // Events for observability
    access(all) event ContractInitialized()
    access(all) event HandlerCreated(path: StoragePath)
    access(all) event ScheduledExecutionReceived(id: UInt64, roundID: UInt64?, notes: String?)
    access(all) event ScheduledExecutionErrored(id: UInt64, reason: String)

    // Data format you can encode into transactionData when scheduling
    access(all) struct SettlementData {
        access(all) let roundID: UInt64
        access(all) let notes: String?

        init(roundID: UInt64, notes: String?) {
            self.roundID = roundID
            self.notes = notes
        }
    }

    // The resource that will be called by the scheduler
    access(all) resource Handler: FlowTransactionScheduler.TransactionHandler {

        // Called by scheduler with Execute entitlement
        access(FlowTransactionScheduler.Execute) fun executeTransaction(
            id: UInt64,
            data: AnyStruct?
        ) {
            // Decode input (defensive: tolerate nil/invalid)
            let settlement = data as? SettlementData

            // At MVP: only emit events so we can verify end-to-end scheduling
            emit ScheduledExecutionReceived(
                id: id,
                roundID: settlement?.roundID,
                notes: settlement?.notes
            )

            // Future: invoke internal settlement logic using roundID
            // e.g. _settleRound(roundID: settlement!.roundID)
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
    access(all) fun createHandler(): @Handler {
        return <- create Handler()
    }

    init() {
        self.handlerStoragePath = /storage/BetOnYourself_SchedulerHandler
        self.handlerPublicPath = /public/BetOnYourself_SchedulerHandler
        emit ContractInitialized()
    }
}