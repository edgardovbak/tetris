export default class Controller {
  constructor(game, view) {
    this.game = game;
    this.view = view;
    this.isPlaying = false;
    this.intervalId = null;
    // this.intervalId = setInterval(() => {
    //   this.update()
    // }, 1000)

    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    document.addEventListener('keyup', this.handleKeyUp.bind(this));
    this.view.renderStartScreen()
  }

  update() {
    this.game.movePieceDown()
    this.updaeView()
  }

  play() {
    this.isPlaying = true;
    this.startTimer()
    this.updaeView()
  }

  pause() {
    this.isPlaying = false;
    this.stopTimer()
    this.updaeView()
  }

  reset() {
    this.game.reset()
    this.play()
  }

  startTimer() {
    const speed = 1000 - this.game.getState().level * 100
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        this.update()
      }, speed > 0 ? speed : 100)
    }
  }

  stopTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }

  updaeView() {
    const state = this.game.getState();
    if (state.isGemeOver) {
      this.view.renderEndScreen(state);
    }else if (!this.isPlaying) {
      this.view.renderPauseScreen()
    } else {
      this.view.renderMainScreen(state)
    }
  }

  handleKeyDown(event) {
    switch (event.keyCode) {
      case 37:
          this.game.movePieceLeft()
          this.updaeView()
        break;
      case 38:
          this.game.rotatePiece()
          this.updaeView()
        break;
      case 39:
          this.game.movePieceRight()
          this.updaeView()
        break;
      case 40:
        this.stopTimer()
          this.game.movePieceDown()
          this.updaeView()
        break;
      case 13: // ENTER
        const state = this.game.getState()
        if (state.isGemeOver) {
          this.reset()
        }else if (this.isPlaying) {
          this.pause()
        } else {
          this.play()
        }
        break;
      default:
        break;
      }
  }

  handleKeyUp(event) {
    switch (event.keyCode) {
      case 40:
          this.startTimer()
        break;
      default:
        break;
      }
  }
}