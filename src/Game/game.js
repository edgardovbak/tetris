export default class Game {
  lines = 0;
  level = 0;
  score = 0;
  playField = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,1,0,0,0,0,0,0,0,0],
    [1,1,1,0,0,0,0,0,0,0],
  ];
  activePiece = {
    x: 0,
    y: 0,
    get blocks() {
      this.rotations[this.rotationIndex]
    },
    blocks: [
      [0,1,0],
      [1,1,1],
      [0,0,0],
    ],
  }

  movePieceLeft() {
    this.activePiece.x -= 1;
    if (this.hassCollision()) {
      this.activePiece.x += 1;
    }
  }

  movePieceRight() {
    this.activePiece.x += 1;

    if (this.hassCollision()) {
      this.activePiece.x -= 1;
    }
  }

  movePieceDown() {
    this.activePiece.y += 1;

    if (this.hassCollision()) {
      this.activePiece.y -= 1;
      this.lockPiece();
    }
  }

  rotatePiece() {
    this.rotateBlocks();

    if ( this.hassCollision() ) {
      this.rotateBlocks(false);
    }
  }

  rotateBlocks( clockwise = true ) {
    const blocks = this.activePiece.blocks;
    const length = blocks.length;

    const x = Math.floor( length / 2 );
    const y = length - 1;

    for (let i = 0; i < x; i++) {
      for (let j = i; j < y - i; j++) {
        const temp = blocks[i][j];
        
        if ( clockwise ) {
          blocks[i][j] = blocks[y - j][i];
          blocks[y - j][i] = blocks[y - i][y - j];
          blocks[y - i][y - j] = blocks[j][y - i];
          blocks[j][y - i] = temp;
        } else {
          blocks[i][j] = blocks[j][y - i];
          blocks[j][y - i] = blocks[y - i][y - j];
          blocks[y - i][y - j] = blocks[y - j][i];
          blocks[y - j][i] = temp;
        }
        
      }
    }
  }

  hassCollision() {
    const {y:piecey, x: piecex, blocks} = this.activePiece;
    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        if ( blocks[y][x] && 
            ((this.playField[piecey + y] === undefined || this.playField[piecey + y][piecex + x] === undefined) || 
            this.playField[piecey + y][piecex + x])) {
          return true;
        }
      }
    }
    return false
  }

  lockPiece() {
    const {y:piecey, x: piecex, blocks} = this.activePiece;
    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        if (blocks[y][x] ) {
          this.playField[piecey + y][piecex + x] = blocks[y][x];
        } 
      }
    }
  }
}