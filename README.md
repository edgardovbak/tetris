## Its just a first test in game development logic

## Using
  Download the repositori, extract the files. 
  In folder with game run
    ```
    npm install
    ```
  the default command is 
    ```
    gulp
    ```
  Open index.html

  In browser you see  the start screen. Press Enter to start the game.
  Use arrows to controll the pieces.
  Preass enter to pause the game.

  Enjoy!

## Classes

### Game
This is the core of the game. All functionality that control the game process. 
The basic idea is saved in 10 x 20 matrix, filled with 0 values. 
If matrix cell contains something then its filled with 1 value.
Here are 7 figures like in original teteris game.
The pieces are choosen randomly. Every piece have own matrix that contain information about piece: type, and rotation.
Two coocrdinates are minitored that describe the piece position on playfield. 

#### Functions 

#### reset
  Its used for reset data in game class

#### level 
  Return current level. The level depends on the number of lines

#### getState 
  Return data that its used in other classes

#### createPlayfield
  Create an empty playfield 

#### createPiece
  Create a random piece. Default look without rotating

#### movePieceLeft, movePieceRight, movePieceDown
  Change piece position on playfield

#### rotatePiece
  Rotate piece. The rotating point is the center of the matrix that contain the piece. This function call another function that contain the rotating logic. The rotating is posible only if the piece dont have collision

#### rotateBlocks 
  Thi function contain  the rotation logig.

#### hassCollision
  Detect if the piece have collision

#### lockPiece
  If the piece collision with another piese then save the coordinats in playfield

#### clearLines 
  Remove the filled lines

#### updateScore 
  Update the game score

#### updatePieces 
  Update the next upcomming piece in game

### View 
This calss controlls the visual part of the game. 
The game is created with canvas. 
Requred parameters: 
a html element, canvas heght and width, rows/columns count.
This class controll the game playfield, and the pannel with game information (level, speed, score, lines).
The width/height parameters its for the canwas, rows/columns its for playfield.

#### Functions

#### renderMainScreen
  Clear the canvas and call two functions that render the playfield and the panel

#### clearScreen 
  Clear the canvas

#### renderStartScreen
  Show the enter csreen before the game its started

#### renderPauseScreen
  Show screen when the game is stoped

#### renderEndScreen
  Game Over screen

#### renderPlayField
  Render the game playfield

#### renderPanel
  Render the panel with game information

#### renderBlock 
  Render a cell from the playfield.


### Controller 
This class controll all user events.
Required parameters is instance of game and view
User events: move left/right/down, play/pause game.
All movemnet calls functions from game class that update playfield matrix. 
Play/pause call functions from view class and render screen for current event.
