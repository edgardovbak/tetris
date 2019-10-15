import Game from './Game/game.js'
import View from './Game/view.js'
import Controller from './Game/controller.js'

const root = document.getElementById("root")

const game = new Game()
const view = new View(root, 480, 640, 20, 10)
const controller = new Controller(game, view)

window.game = game
window.view = view
window.controller = controller

