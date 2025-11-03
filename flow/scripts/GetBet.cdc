import "BetOnYourself"

/// Script to get bet information for a given initiator address
/// Uses the contract's public view function to access bet data
/// 
/// Parameters:
/// - contractAddress: The address where the BetOnYourself contract is deployed
/// - initiator: The address of the bet initiator (first participant)
/// 
/// Returns bet details including participants, initial amount, current balance, and completed participants
access(all)
fun main(initiator: Address): BetOnYourself.BetInfo? {

    let bet = BetOnYourself.getBetInfo(initiator: initiator)
    return bet
}

