## BINGO

This is a small project built with react, typescript and bootstrap. 

When opening the project, you have two choices, bingo board and bingo card.

When you view the bingo board, this view is supposed to be put on a large screen for everyone to see. This is the facilitator's (bingo master's) screen. Here the bingo master has the opportunity to draw a random number between 1 and 90, simulating a "normal" bingo game. Furthermore the bingo master's screen has the opportunity to check a bingo plate given a serial number.

Everyone besides the bingo master (the players) choose the bingo card option. This generates a random bingo card with 3 rows each containing 5 numbers and a random serial number. This random serial number is used as the seed value to generate the bingo card, and thus when a player yells bingo, they can give the bingo master the serial number for the card, and the card can be checked. 