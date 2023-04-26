//The code for our example game
class MoleControllerComponent extends Component {
  start() {
    let toAdd = new MoleGameObject();
    GameObject.instantiate(toAdd)
  }
  update() {
  }
}

class MoleComponent extends Component{

}

class MoleGameObject extends GameObject{
  name = "MoleGameObject"
  start(){
    this.addComponent(new MoleComponent());
    this.addComponent(new Circle("blue"))
    this.transform.sx = 5;
    this.transform.sy = 5;
  }
}

class MoleFollowerGameObject extends GameObject{
  name = "MoleFollowerGameObject"
  start(){
    this.addComponent(new GUIText())
  }
}

class MoleScene extends Scene {
  start() {
    this.addGameObject(
      new GameObject("MoleControllerGameObject")
        .addComponent(new MoleControllerComponent())
        .addComponent(new CameraMover())
    )
  }
}

//export the main scene so the .html file can run the game.
export default new MoleScene();