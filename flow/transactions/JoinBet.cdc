import "BetOnYourself"
import "FlowToken"
import "FungibleToken"

/// Transaction to join an existing bet
/// The participant must provide the same bet amount as the initial bet
transaction(
    initiator: Address,
    betAmount: UFix64
) {
    prepare(signer: auth(Storage) &Account) {
        // Validate that the signer is not the initiator (they already created the bet)
        assert(
            signer.address != initiator,
            message: "Initiator cannot join their own bet"
        )
        
        // Get the signer's FlowToken vault
        let vaultRef = signer.storage.borrow<auth(FungibleToken.Withdraw) &FlowToken.Vault>(
            from: /storage/flowTokenVault
        ) ?? panic("Could not borrow FlowToken vault")
        
        // Withdraw the bet amount
        let betVault <- vaultRef.withdraw(amount: betAmount) as! @FlowToken.Vault
        
        // Join the bet
        BetOnYourself.joinBet(
            initiator: initiator,
            participant: signer.address,
            betVault: <-betVault
        )
        
        log("Participant ".concat(signer.address.toString()).concat(" joined bet initiated by ").concat(initiator.toString()))
        log("Bet amount: ".concat(betAmount.toString()))
    }
}

