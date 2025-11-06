package main

import (
	"fmt"

	//if you imports this with .  you do not have to repeat overflow everywhere
	. "github.com/bjartek/overflow/v2"
	"github.com/fatih/color"
)

func main() {
	o := Overflow(
		WithGlobalPrintOptions(),
		// WithNetwork("testnet"),
	)

	fmt.Println("Testing BetOnYourself Contract")

	color.Blue("BetOnYourself Contract Testing")

	// Initialize scheduler manager for account (contract deployer)
	color.Green("Initializing Scheduler Manager")
	o.Tx("InitSchedulerManager",
		WithSigner("account"),
	)

	// Test BetOnYourself functionality
	color.Green("Creating a bet with account as initiator")
	// Use account names - overflow will convert them to addresses
	o.Tx("CreateBet",
		WithSigner("account"),
		WithAddresses("participants", "account", "bob"),
		WithArg("betAmount", "1.0"),
	)

	// Get bet info after creation
	color.Green("Getting bet information")
	o.Script("GetBet",
		WithArg("initiator", "account"),
	)

	// Bob joins the bet
	color.Green("Bob joins the bet")
	o.Tx("JoinBet",
		WithSigner("bob"),
		WithArg("initiator", "account"),
		WithArg("betAmount", "1.0"),
	)

	// Get bet info after bob joins
	color.Green("Getting bet information after bob joined")
	o.Script("GetBet",
		WithArg("initiator", "account"),
	)

	color.Green("Testing complete!")
}
