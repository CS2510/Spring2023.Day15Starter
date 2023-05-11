//The code for our persistence game

class StaticVariables {
  static ticksInSession = 0;

}

class PersistenceCompontent extends Component {
  start() {
  }
  update() {
    if (Input.keyUp[" "]) {
      console.log("Change scene")
      SceneManager.changeScene(0);
    }
  }
}

class TimeInSceneComponent extends Component {
  start() {
    this.totalTicks = 0;

  }
  update() {
    this.parent.getComponent("Text").string = "Ticks in scene (local variable restarts if you change scenes): " + this.totalTicks;
    this.totalTicks++;
  }
}

class TimeInSessionComponent extends Component {
  update() {
    this.parent.getComponent("Text").string = "Ticks in session (static variable restarts if you close the browser): " + StaticVariables.ticksInSession;
    StaticVariables.ticksInSession++;
  }
}

class TimeInGameComponent extends Component {
  start() {
    this.timeInGame = 0;
    if (document.cookie) {
      this.timeInGame = parseInt(document.cookie);
    }
  }
  update() {
    this.parent.getComponent("Text").string = "Ticks in game (cookie variable never resets): " + this.timeInGame;
    this.timeInGame++;
    document.cookie = this.timeInGame;
  }
}

class PersistenceScene extends Scene {
  start() {
    let font = "2px Arial";
    this.addGameObject(
      new GameObject("PersistenceGameObject")
        .addComponent(new PersistenceCompontent())
    )
    this.addGameObject(
      new GameObject("ScoreGameObject")
        .addComponent(new Text("Push Space to restart scene", "black", font)),
      new Vector2(-45, -10)
    )

    this.addGameObject(
      new GameObject("TimeInSceneGameObject")
        .addComponent(new TimeInSessionComponent())
        .addComponent(new Text("Bye", "Black", font)),
      new Vector2(-45, 10)
    )

    this.addGameObject(
      new GameObject("TimeInSessionGameObject")
        .addComponent(new TimeInSceneComponent())
        .addComponent(new Text("Bye", "Black", font)),
      new Vector2(-45, 0)
    )

    this.addGameObject(
      new GameObject("TimeInGameGameObject")
        .addComponent(new TimeInGameComponent())
        .addComponent(new Text("Bye", "Black", font)),
      new Vector2(-45, 20)
    )


  }
}

//export the main scene so the .html file can run the game.
export default new PersistenceScene();