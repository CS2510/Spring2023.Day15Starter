//The code for our Event game

class ScreenMovingComponent extends Component {
  update(ctx) {
    this.transform.x = Input.mouseX;
    this.transform.y = Input.mouseY;
  }
}

class ScreenFollowingGUIComponent extends Component {
  update(ctx) {
    let moverComponent = GameObject.getObjectByName("ScreenMovingGameObject").getComponent("ScreenMovingComponent");

    let coordinates = Camera.screenToGUI(ctx, moverComponent.transform.x, moverComponent.transform.y);

    this.transform.x = coordinates.x;
    this.transform.y = coordinates.y;
  }
}

class ScreenFollowingWorldComponent extends Component {
  update(ctx) {
    let moverComponent = GameObject.getObjectByName("ScreenMovingGameObject").getComponent("ScreenMovingComponent");

    let coordinates = Camera.screenToWorld(ctx, moverComponent.transform.x, moverComponent.transform.y);

    this.transform.x = coordinates.x;
    this.transform.y = coordinates.y;
  }
}
/**
 * A component that moves across the screen
 * The FollowerComponent follows this component
 */
class GUIFollowingScreenComponent extends Component {
  update(ctx) {
    let moverComponent = GameObject.getObjectByName("MovingComponentGUIGameObject").getComponent("GUIMovingComponent");

    let coordinates = Camera.GUIToScreen(ctx, moverComponent.transform.x, moverComponent.transform.y);
    this.transform.x = coordinates.x;
    this.transform.y = coordinates.y;
  }
}

/**
 * This class tracks the MoverComponent and centers around that
 * 
 */
class GUIMovingComponent extends Component {
  update(ctx) {
    this.transform.x += Time.deltaTime;
  }
}

class GUIFollowingWorldComponent extends Component {
  update(ctx) {
    let moverComponent = GameObject.getObjectByName("MovingComponentGUIGameObject").getComponent("GUIMovingComponent");

    let coordinates = Camera.GUIToWorld(ctx, moverComponent.transform.x, moverComponent.transform.y);
    this.transform.x = coordinates.x;
    this.transform.y = coordinates.y;
  }
}

class WorldFollowingScreenComponent extends Component {
  update(ctx) {
    let worldSpace = GameObject.getObjectByName("OriginWorldSpaceGameObject").getComponent("WorldMovingComponent")

    let screenSpace = Camera.worldToScreen(ctx, worldSpace.transform.x, worldSpace.transform.y);
    this.transform.x = screenSpace.x;
    this.transform.y = screenSpace.y;
  }
}

class WorldFollowingGUIComponent extends Component {
  update(ctx) {
    let worldSpace = GameObject.getObjectByName("OriginWorldSpaceGameObject").getComponent("WorldMovingComponent")

    let guiSpace = Camera.worldToGUI(ctx, worldSpace.transform.x, worldSpace.transform.y);
    this.transform.x = guiSpace.x;
    this.transform.y = guiSpace.y;
  }
}

class WorldMovingComponent extends Component {
  update(ctx) {
    this.transform.x += Time.deltaTime;
  }
}

class EventScene extends Scene {
  start() {
    this.addGameObject(
      new GameObject("EventController")
        .addComponent(new CameraMover())
    )

    this.addGameObject(
      new GameObject("ScreenMovingGameObject")
        .addComponent(new ScreenMovingComponent())
        .addComponent(new ScreenRectangle("transparent", "blue", 5)),
      Vector2.zero,
      new Vector2(40, 40)
    )

    this.addGameObject(
      new GameObject("ScreenFollowingGUIGameObject")
        .addComponent(new ScreenFollowingGUIComponent())
        .addComponent(new GUIRectangle("transparent", "blue", .5)),
      Vector2.zero,
      new Vector2(2, 2)
    )

    this.addGameObject(
      new GameObject("ScreenFollowingWorldGameObject")
        .addComponent(new ScreenFollowingWorldComponent())
        .addComponent(new Rectangle("blue"))
    )
    
    this.addGameObject(
      new GameObject("MovingComponentScreenGameObject")
        .addComponent(new GUIFollowingScreenComponent())
        .addComponent(new ScreenRectangle("transparent", "green", 20)),
      new Vector2(100, 200),
      new Vector2(2, 2)
    );

    this.addGameObject(
      new GameObject("MovingComponentGUIGameObject")
        .addComponent(new GUIRectangle("transparent", "green", 2))
        .addComponent(new GUIMovingComponent()),
      Vector2.zero,
      new Vector2(10, 10)
    )

    this.addGameObject(
      new GameObject("WorldFollowerGameObject")
        .addComponent(new Rectangle("transparent", "green", 2))
        .addComponent(new GUIFollowingWorldComponent()),
      Vector2.zero,
      new Vector2(20, 20)
    )

    this.addGameObject(
      new GameObject("OriginScreenGameObject")
        .addComponent(new ScreenRectangle("transparent", "magenta", 4))
        .addComponent(new WorldFollowingScreenComponent("transparent", "magenta", 5)),
      new Vector2(200, 200),
      new Vector2(40, 40)
    )

    this.addGameObject(
      new GameObject("OriginGUIGameObject")
        .addComponent(new GUIRectangle("transparent", "magenta", .5))
        .addComponent(new WorldFollowingGUIComponent()),
      Vector2.zero,
      new Vector2(2, 2)
    )

    this.addGameObject(
      new GameObject("OriginWorldSpaceGameObject")
        .addComponent(new Rectangle("magenta"))
        .addComponent(new WorldMovingComponent()),
      Vector2.zero,
      Vector2.one,
      0,
      1
    )
  }
}

//export the main scene so the .html file can run the game.
export default new EventScene();