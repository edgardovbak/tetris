export default class Game {
  static points = {
    '1': 40,
    '2': 100,
    '3': 300,
    '4': 1200
  };

  constructor() {
    this.reset()
  }

  get level() {
    return Math.floor(this.lines * 0.1);
  }

  getState() {
    const playField = this.createPlayfield();
    const {y:piecey, x: piecex, blocks} = this.activePiece;

    for (let y = 0; y < this.playField.length; y++) {
      playField[y] = []
      
      for (let x = 0; x < this.playField[y].length; x++) {
        playField[y][x] = this.playField[y][x]
      }
    }

    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        if ( blocks[y][x]) {
          playField[piecey + y][piecex + x] = blocks[y][x]
        }
      }
    }

    return {
      score: this.score,
      level: this.level,
      lines: this.lines,
      nextPiece: this.nextPiece,
      playField,
      isGemeOver: this.topOut
    }
  }

  reset() {
    this.lines = 0;
    this.score = 0;
    this.topOut = false;
    this.playField = this.createPlayfield();
    this.activePiece = this.createPiece();
    this.nextPiece = this.createPiece();
  }

  createPlayfield() {
    const playField = [];
    for (let y = 0; y < 20; y++) {
      playField[y] = []
      
      for (let x = 0; x < 10; x++) {
        playField[y][x] = 0
      }
    }

    return playField;
  }

  createPiece() {
    const index = Math.floor(Math.random () * 7)
    const type = 'IJLOSTZ'[index]
    const piece = {}
    switch (type) {
      case 'I':
        piece.blocks = [
          [0,0,0,0],
          [1,1,1,1],
          [0,0,0,0],
          [0,0,0,0],
        ];
      break;
      case 'J':
        piece.blocks = [
          [0,0,0],
          [2,2,2],
          [0,0,2],
        ]
      break;
      case 'L':
        piece.blocks = [
          [0,0,0],
          [3,3,3],
          [3,0,0],
        ]
      break;
      case 'O':
        piece.blocks = [
          [0,0,0,0],
          [0,4,4,0],
          [0,4,4,0],
          [0,0,0,0],
        ];
      break;
      case 'S':
        piece.blocks = [
          [0,0,0],
          [0,5,5],
          [5,5,0],
        ]
      break;
      case 'T':
        piece.blocks = [
          [0,0,0],
          [6,6,6],
          [0,6,0],
        ]
      break;
      case 'Z':
        piece.blocks = [
          [0,0,0],
          [7,7,0],
          [0,7,7],
        ]
      break;
  
      default:
        throw new Error("Somethig unbeliveble"); 
      break;
    }
    piece.x = Math.floor((10 - piece.blocks[0].length) / 2);
    piece.y = 0;
    return piece;
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
    if (this.topOut) return;
    this.activePiece.y += 1;

    if (this.hassCollision()) {
      this.activePiece.y -= 1;
      this.lockPiece();
      let cleredLines = this.clearLines();
      this.updateScore(cleredLines);
      this.updatePieces();
    }

    if (this.hassCollision()) {
      this.topOut = true
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

  clearLines() {
    let lines = [];
    const rows = 20;
    const columns = 10;
    for (let y = rows - 1; y > 0; y--) {
      let numberOfBlokcs = 0;

      for (let x = 0; x < columns; x ++) {
        if (this.playField[y][x] !== 0) {
            numberOfBlokcs += 1;
        }
      }

      if (numberOfBlokcs == 0) {
        break;
      } else if (numberOfBlokcs < columns) {
        continue; 
      } else if ( numberOfBlokcs == columns) {
        lines.unshift(y)
      }
    }

    for (const index of lines) {
      this.playField.splice(index, 1);
      this.playField.unshift(new Array(columns).fill(0));
    }
    return lines.length;
  }

  updateScore(clearedLines) {
    if (clearedLines > 0) {
      this.score += Game.points[clearedLines] * (this.level + 1);
      this.lines += clearedLines;
      
    }
  }

  updatePieces() {
    this.activePiece = this.nextPiece;
    this.nextPiece = this.createPiece();
  }
}