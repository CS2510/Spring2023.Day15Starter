//The code for our example game


class CameraMoverScene extends Scene {
  start() {
    this.addGameObject(
      new GameObject("CameraMoverGameObject")
        .addComponent(new CameraMover())
        .addComponent(new Rectangle("brown")),
      Vector2.zero,
      new Vector2(10, 10)
    )
  }
}

//export the main scene so the .html file can run the game.
export default new CameraMoverScene();