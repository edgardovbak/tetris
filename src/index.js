import Game from './Game/game.js'
import View from './Game/view.js'

const root = document.getElementById("root")

const game = new Game()
const view = new View(root, 320, 640, 20, 10)

window.game = game
window.view = view

document.addEventListener('keydown', event => {
  switch (event.keyCode) {
    case 37:
      game.movePieceLeft()
      view.renderScreen(game.getState())
      break;
    case 38:
      game.rotatePiece()
      view.renderScreen(game.getState())
      break;
    case 39:
      game.movePieceRight()
      view.renderScreen(game.getState())
      break;
    case 40:
      game.movePieceDown()
      view.renderScreen(game.getState())
      break;
    default:
      break;
  }
})


console.log(game)

console.log(view)