//The code for our Event game

class MoverComponent extends Component{
  update(ctx){
    this.transform.x += Time.deltaTime ;
  }
}

class FollowerComponent extends Component{
  update(ctx){
    let moverComponent = GameObject.getObjectByName("MoverGameObject").getComponent("MoverComponent");
    this.transform.x = moverComponent.transform.x + EngineGlobals.logicalWidth/2 - Camera.main.transform.x;
    this.transform.y = moverComponent.transform.y +  EngineGlobals.logicalWidth/2 /EngineGlobals.requestedAspectRatio - Camera.main.transform.y; 
    
    // this.transform.x = moverComponent.transform.x + 50;
    // this.transform.y = moverComponent.transform.y + 50 /(16/9);
  }
}

class GUIMouseFollowerComponent extends Component {
  update(ctx) {

    let screenSpace = Camera.toLogicalScreenSpace(Input.mouseX, Input.mouseY, ctx);
    this.transform.x = screenSpace.x;
    this.transform.y = screenSpace.y;

    // console.log(Input.mouseX + ", " + Input.mouseY + "-> " + this.transform.x + ", " + this.transform.y)
  }
}

class EventComponent extends Component {
  start() {
  }
  update(ctx) {
    //First adjust the camera for debugging
    Camera.main.transform.x = Math.sin(Time.time) * 10;
    Camera.main.transform.y = Math.sin(Time.time) * 10;

  
    let worldSpace = Camera.toWorldSpace(Input.mouseX, Input.mouseY, ctx)
    this.transform.x = worldSpace.x;
    this.transform.y = worldSpace.y;
    // console.log(Input.mouseX + ", " + Input.mouseY + "-> " + x + ", " + y)
  }
}

class EventScene extends Scene {
  start() {
    this.addGameObject(
      new GameObject("GUIRectangle")
        .addComponent(new GUIRectangle("pink")),
      Vector2.zero,
      new Vector2(2, 2),
      0,
      1
    )
    this.addGameObject(
      new GameObject("GUIRectangle")
        .addComponent(new GUIRectangle("green")),
      Vector2.zero,
      new Vector2(4, 4),
      0,
      0
    )
    this.addGameObject(
      new GameObject("GUIRectangle")
        .addComponent(new GUIMouseFollowerComponent())
        .addComponent(new GUIRectangle("transparent", "blue", .5)),
      Vector2.zero,
      new Vector2(4, 4),
      0,
      0
    )

    this.addGameObject(
      new GameObject("StaticRectangle")
        .addComponent(new Rectangle("brown")),
      Vector2.zero,
      Vector2.one,
      0,
      1
    )

    this.addGameObject(
      new GameObject("StaticRectangle")
        .addComponent(new Rectangle("magenta")),
      Vector2.zero,
      new Vector2(2, 2),
      0,
      0
    )

    this.addGameObject(
      new GameObject("EventGameObject")
        .addComponent(new EventComponent())
        .addComponent(new Rectangle("blue"))
    )

    this.addGameObject(
      new GameObject("MoverGameObject")
      .addComponent(new MoverComponent())
      .addComponent(new Rectangle("red"))
    );

    this.addGameObject(
      new GameObject("FollowerGameObject")
      .addComponent(new GUIRectangle("transparent", "green", 1))
      .addComponent(new FollowerComponent()),
      Vector2.zero,
      new Vector2(2,2)
    )
  }
}

//export the main scene so the .html file can run the game.
export default new EventScene();