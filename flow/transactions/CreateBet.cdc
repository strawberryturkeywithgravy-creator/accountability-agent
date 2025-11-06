import "BetOnYourself"
import "FlowToken"
import "FungibleToken"

/// Transaction to create a new bet
/// The first participant in the participants array is the initiator
/// The initialBetAmount is the amount each participant must contribute
/// durationSeconds is the time in seconds until the scheduled transaction executes
transaction(
    participants: [Address],
    betAmount: UFix64,
    durationSeconds: UFix64
) {
    prepare(signer: auth(Storage) &Account) {
        // Validate that the signer is the first participant (initiator)
        assert(
            participants.length > 0,
            message: "At least one participant (initiator) is required"
        )
        assert(
            signer.address == participants[0],
            message: "Signer must be the initiator (first participant)"
        )
        
        // Get the signer's FlowToken vault
        let vaultRef = signer.storage.borrow<auth(FungibleToken.Withdraw) &FlowToken.Vault>(
            from: /storage/flowTokenVault
        ) ?? panic("Could not borrow FlowToken vault")
        
        // Withdraw the initial bet amount
        let initialBetVault <- vaultRef.withdraw(amount: betAmount) as! @FlowToken.Vault
        
        // Create the bet
        BetOnYourself.createBet(
            participants: participants,
            initialBetVault: <-initialBetVault,
            durationSeconds: durationSeconds
        )
    }
}

