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
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
  ];
  activePiece = {
    x: 0,
    y: 0,
    blocks: [
      [0,1,0],
      [1,1,1],
      [0,0,0],
    ]
  }

  movePieceLeft() {
    this.activePiece.x -= 1;
    if (this.isPieceOutOfBounce()) {
      this.activePiece.x += 1;
    }
  }

  movePieceRight() {
    this.activePiece.x += 1;

    if (this.isPieceOutOfBounce()) {
      this.activePiece.x -= 1;
    }
  }

  movePieceDown() {
    this.activePiece.y += 1;

    if (this.isPieceOutOfBounce()) {
      this.activePiece.y -= 1;
      this.lockPiece();
    }
  }

  isPieceOutOfBounce() {
    const {y:piecey, x: piecex, blocks} = this.activePiece;
    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        if ( this.playField[piecey + y] === undefined || this.playField[piecey + y][piecex + x] === undefined) {
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
        this.playField[piecey + y][piecex + x] = blocks[y][x];
      }
    }
  }
}