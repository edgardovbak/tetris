## Its just a first test in game development logic

## Using
  Download the repository, extract the files. 
  Open command line, go to the folder with the game and run
  
    ```
    npm install
    ```
    
  the default command is 
  
    ```
    gulp
    ```
    
  Open index.html
  

  In the browser you see the start screen. Press Enter to start the game.
  Use arrows to control the pieces.
  Press enter to pause the game.

  Enjoy!

## Classes

### Game
This is the core of the game. All functionality that controls the game process. 
The basic idea is saved in a 10 x 20 matrix, filled with 0 values. 
If the matrix cell contains something then its filled with 1 value.
Here are 7 figures like in the original tetris game.
The pieces are chosen randomly. Every piece have own matrix that contains information about piece: type, and rotation.
Two coordinates are monitored that describe the piece position on the playfield. 

#### Functions 

#### reset
  It's used for reset data in game class

#### level 
  Return the current level. The level depends on the number of lines

#### getState 
  Return data that is used in other classes

#### createPlayfield
  Create an empty playfield 

#### createPiece
  Create a random piece. Default look without rotating

#### movePieceLeft, movePieceRight, movePieceDown
  Change piece position on the playfield

#### rotatePiece
  Rotate piece. The rotating point is the center of the matrix that contains the piece. The rotation is possible only if the piece don't have collision

#### rotateBlocks 
  This function contains the rotation logic.

#### hassCollision
  Detect if the piece has collision

#### lockPiece
  If the piece collision with another piece then save the coordinates in the playfield

#### clearLines 
  Remove the filled lines

#### updateScore 
  Update the game score

#### updatePieces 
  Update the next upcomming piece in the game

### View 
This class controls the visual part of the game. 
The game is created with canvas. 
Required parameters: 
a HTML element, canvas height, and width, rows/columns count.
This class control the game playfield, and the panel with game information (level, speed, score, lines).
The width/height parameters it's for the canvas, rows/columns its for playfield.

#### Functions

#### renderMainScreen
  Clear the canvas and call two functions that render the playfield and the panel

#### clearScreen 
  Clear the canvas

#### renderStartScreen
  Show the enter screen before the game its start

#### renderPauseScreen
  Show screen when the game is stopped

#### renderEndScreen
  Game Over screen

#### renderPlayField
  Render the game playfield

#### renderPanel
  Render the panel with game information

#### renderBlock 
  Render a cell from the playfield.


### Controller 
This class control all user events.
Required parameters are an instance of game and view
User events: move left/right/down, play/pause game.
All movement calls functions from the game class that update the playfield matrix. 
Play/pause call functions from view class and renders screen for the current event.
