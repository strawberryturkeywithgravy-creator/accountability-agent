# accountability-agent
Building on the Accountability Agent idea from #goWTF podcast https://www.youtube.com/watch?v=TLNGDgmoyx4 

# Accountability Agent 
## Purpose
People stake their own funds on their goals. 
Encourages accountability and monetary motivation for folks, if they want.

## The Game 
Each _r_ round of the game you commit _s_ stake (any amount, set by you, of your own funds) to a _g_ goal you set for yourself. 

Goal Examples: 
- fitness (Strava kms/weight/etc...) 
- learning (Duolingo levels/leagues/etc...) 
- this is a non-exhaustive list, this game could be applied to any trackable goal 

It could look something like: 
"I stake 15 FLOW that I'm going to advance to the next league in Duolingo by next week." 

If the **goal is completed** by the end of the round, you receive (1) the funds you staked + (2) your portion of the weekly rewards distributed among successful participants. 

If the **goal is NOT completed** by the end of the round, you lose the funds staked. 

Funds from unsuccessful goals that round are collected in the "i'll do it tomorrow" pool to be shared among successful "i did it" participants. 

The "i'll do it tomorrow" pool could be split among successful participants a number of ways, including: 
1. Equal among all participants (={sum of all lost stake that round}/{number of participants in that round})
2. Randomly among all participants in that round (this is more technically complex but may be worthwhile to encourage participation and ensure participants don't _feel_ they are "worse off" as more participants join as payouts wouldn't be as direct a reflection of number of round participants)
OR, in the FUTURE 
3. It may alternatively be directed to a registered charity, if the participant chooses. 

## The Rules
You can only win funds if you complete your goal. 
You can only lose funds if you don't complete your goal. 
You set your own goals. 
You stake your own funds. 

### Technical Summary 
This game uses a couple important on-chain features including:
1. *Escrow* of staked funds during rounds 
2. *Scheduled transactions* to facilitate escrow exchange over rounds
3. *Goal verification* should in integrated on-chain in the future but, this would likely rely on app integration. 
MVP of goal verification could be to upload timestamped screenshot of 3rd party app where the goal has been set. Uploads should be subject to Community members and moderator review. Photos may be marked `re-used` or `non-original` etc if there was concern about legitimacy of uploads. 

**Could be cool:** an option to participate in your own "private party". Rounds are made up only of your friends - not inclusive of app wide users - and payouts are settled only among that "party" - i.e. excluded from larger app reward pool. 
