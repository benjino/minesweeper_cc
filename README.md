# minesweeper_cc
Minesweeper game played in Terminal.

To play in Terminal:

Navigate to your src file and in Terminal enter:

$ node .load minesweeper.js

Ignore all of the code it loaded; at the bottom of Terminal make a game.

Create new game board:
let game = new Game(3, 3, 3); ~> (3 rows, 3 columns, 3 bombs).

Make your move:
game.playMove(1, 1); ~> Move 1 row, 1 column.

To start a new game after that:
game = new Game(1, 2); ~> for example.
