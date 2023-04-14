//The code for our example game
class CameraMoverComponent extends Component {
  start() {
  }
  update(ctx) {
    let camera = Camera.main;
    if (Input.mouseDown) {
      let offsetX = Input.lastMouseX - Input.mouseX;
      let offsetY = Input.lastMouseY - Input.mouseY;
      let scale = Camera.getLogicalScale(ctx);
      camera.transform.x += offsetX / scale;
      camera.transform.y += offsetY / scale;
    }

    if (Input.lastWheel) {
      console.log(Input.lastWheel);
      if (Input.lastWheel > 0) {
        camera.transform.sx *= 1.1;
        camera.transform.sy *= 1.1;
      }
      else {
        camera.transform.sx /= 1.1;
        camera.transform.sy /= 1.1;
      }
    }

  }
}

class CameraMoverScene extends Scene {
  start() {
    this.addGameObject(
      new GameObject("CameraMoverGameObject")
        .addComponent(new CameraMoverComponent())
        .addComponent(new Rectangle("brown")),
      Vector2.zero,
      new Vector2(10, 10)
    )
  }
}

//export the main scene so the .html file can run the game.
export default new CameraMoverScene();