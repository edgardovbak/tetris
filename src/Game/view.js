export default class View {
  static colors = {
    '1': 'red',
    "2": "green", 
    "3": "blue",
    "4": "yellow",
    "5": "orange",
    "6": "cyan",
    "7": "purple"
  }
  constructor(element, width, height, rows, columns) {
    this.element = element;
    this.width = width;
    this.height = height;

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext('2d');

    this.playFieldBorderWidth = 4;
    this.playFieldX = this.playFieldBorderWidth;
    this.playFieldY = this.playFieldBorderWidth;
    this.playFieldWidth = this.width * 2 / 3;
    this.playFieldHeight = this.height;
    this.playFieldInnerWidth = this.playFieldWidth - this.playFieldBorderWidth * 2;
    this.playFieldInnerHeight = this.playFieldHeight - this.playFieldBorderWidth * 2;

    this.blockWidth = this.playFieldInnerWidth / columns;
    this.blockHeight = this.playFieldInnerHeight / rows;

    this.panelX = this.playFieldWidth + 10;
    this.panelY = 0;
    this.panelWidth = this.width / 3;
    this.panelHeight = this.height;

    this.element.appendChild(this.canvas);
  }

  renderMainScreen (state) {
    this.clearScreen();
    this.renderPlayField(state);
    this.renderPanel(state);
  }

  clearScreen () {
    this.context.clearRect(0,0, this.width, this.height)
  }

  renderStartScreen() {
    this.context.fillStyle = "white";
    this.context.font = "18px 'Arial'";
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.fillText("Press Enter to start", this.width / 2, this.height / 2);
  }

  renderPauseScreen() {
    this.context.fillStyle = 'rgba(0,0,0,.75)'
    this.context.fillRect(0,0, this.width, this.height)

    this.context.fillStyle = "white";
    this.context.font = "18px 'Arial'";
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.fillText("Press Enter to resume", this.width / 2, this.height / 2);
  }

  renderEndScreen({ score }) {
    this.clearScreen()

    this.context.fillStyle = "white";
    this.context.font = "18px 'Arial'";
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.fillText("GAME OVER", this.width / 2, this.height / 2 - 48);
    this.context.fillText(`Score: ${score}`, this.width / 2, this.height / 2);
    this.context.fillText("Press ENTER to restart", this.width / 2, this.height / 2 + 48);
  }

  renderPlayField ({playField}) {
    for (let y = 0; y < playField.length; y++) {
      const line = playField[y];
      
      for (let x = 0; x < line.length; x++) {
        const block = line[x];
        
        if (block) {
          this.renderBlock(
            this.playFieldX + (x * this.blockWidth), 
            this.playFieldY + (y * this.blockHeight), 
            this.blockWidth, 
            this.blockHeight, 
            View.colors[block]
          )
        }
      }
    }

    this.context.strokeStyle = "white";
    this.context.lineWidth = this.playFieldBorderWidth;
    this.context.strokeRect(0,0, this.playFieldWidth, this.playFieldHeight)
  }

  renderPanel({level, score, lines, nextPiece}) {
    this.context.textAlign = 'start';
    this.context.textBaseline = 'top';
    this.context.fillStyle = 'white';
    this.context.font = '14px "Arial"';

    this.context.fillText(`Level: ${level}`, this.panelX, this.panelY + 0)
    this.context.fillText(`Score: ${score}`, this.panelX, this.panelY + 24)
    this.context.fillText(`Lines: ${lines}`, this.panelX, this.panelY + 48)
    this.context.fillText("Next:", this.panelX, this.panelY + 96)

    for (let y = 0; y < nextPiece.blocks.length; y++) {
      for (let x = 0; x < nextPiece.blocks[y].length; x++) {
         const block = nextPiece.blocks[y][x];

         if (block) {
           this.renderBlock(
             this.panelX + (x * this.blockWidth * 0.5),
             this.panelY + 100 + (y * this.blockHeight * 0.5),
             this.blockWidth * 0.5,
             this.blockHeight * 0.5,
             View.colors[block]
           )
         } 
      }
      
    }
  }

  renderBlock (x, y, width, height, color) {
    this.context.fillStyle = color;
    this.context.strokeStyle = "#040404";
    this.context.lineWidth = 2;

    this.context.fillRect(x, y, width, height);
    this.context.strokeRect(x, y, width, height);
  }
}