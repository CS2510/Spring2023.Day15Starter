//The code for our example game
class CameraMoverComponent extends Component {
  start() {
  }
  update() {
  }
  draw(ctx) {
    ctx.fillStyle = `rgb(0, 0,255)`
    ctx.fillRect(0, 0, 100, 100)
  }
}

class CameraMoverScene extends Scene {
  start() {
    this.addGameObject(
      new GameObject("CameraMoverGameObject")
        .addComponent(new CameraMoverComponent())
    )
  }
}

//export the main scene so the .html file can run the game.
export default new CameraMoverScene();