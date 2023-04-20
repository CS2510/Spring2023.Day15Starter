//The code for our Event game
/**
 * A component that moves across the screen
 * The FollowerComponent follows this component
 */
class MoverComponent extends Component {
  update(ctx) {
    this.transform.x += Time.deltaTime;
  }
}

/**
 * This class tracks the MoverComponent and centers around that
 * 
 */
class FollowerComponent extends Component {
  update(ctx) {
    let moverComponent = GameObject.getObjectByName("MovingWorldSpaceGameObject").getComponent("MoverComponent");

    let coordinates = Camera.worldToLogicalScreenSpace(moverComponent.transform.x,moverComponent.transform.y,ctx);
    this.transform.x = coordinates.x ;
    this.transform.y = coordinates.y ;
  }
}

class MouseFollowingGUIComponent extends Component {
  update(ctx) {

    let screenSpace = Camera.screenToLogical(ctx,Input.mouseX, Input.mouseY, ctx);
    this.transform.x = screenSpace.x;
    this.transform.y = screenSpace.y;

    // console.log(Input.mouseX + ", " + Input.mouseY + "-> " + this.transform.x + ", " + this.transform.y)
  }
}

class MouseFollowingWorldSpaceComponent extends Component {
  start() {
  }
  update(ctx) {
    let worldSpace = Camera.screenToWorld(ctx, Input.mouseX, Input.mouseY, ctx)
    this.transform.x = worldSpace.x ;
    this.transform.y = worldSpace.y ;
    // console.log(Input.mouseX + ", " + Input.mouseY + "-> " + x + ", " + y)
  }
}

class CameraDisplacer extends Component{
  start(){
    Camera.main.transform.x = -5;
    Camera.main.transform.sx = 1.0;
    Camera.main.transform.sy = 1.0;
  }
}

class EventScene extends Scene {
  start() {

    this.addGameObject(
      new GameObject("MouseFollowingWorldSpaceGameObject")
        .addComponent(new MouseFollowingWorldSpaceComponent())
        .addComponent(new Rectangle("blue"))
        .addComponent(new CameraMover())
    )

    this.addGameObject(
      new GameObject("MouseFollowingGUIGameObject")
        .addComponent(new MouseFollowingGUIComponent())
        .addComponent(new GUIRectangle("transparent", "blue", .5)),
      Vector2.zero,
      new Vector2(2, 2),
      0,
      0
    )

    this.addGameObject(
      new GameObject("OriginWorldSpaceGameObject")
        .addComponent(new Rectangle("magenta")),
      Vector2.zero,
      Vector2.one,
      0,
      1
    )

    this.addGameObject(
      new GameObject("OriginGUIGameObject")
        .addComponent(new Rectangle("transparent", "magenta", .5)),
      Vector2.zero,
      new Vector2(2, 2),
      0,
      0
    )

    

    this.addGameObject(
      new GameObject("MovingWorldSpaceGameObject")
        .addComponent(new MoverComponent())
        .addComponent(new Rectangle("green"))
        //.addComponent(new CameraMover())
        // .addComponent(new CameraDisplacer())
    );

    this.addGameObject(
      new GameObject("FollowerGameObject")
        .addComponent(new GUIRectangle("transparent", "green", .5))
        .addComponent(new FollowerComponent()),
      Vector2.zero,
      new Vector2(2, 2)
    )
  }
}

//export the main scene so the .html file can run the game.
export default new EventScene();