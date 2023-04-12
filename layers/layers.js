//The code for our example game

//The player that can move using the arrow keys
class PlayerComponent extends Component {
  name = "PlayerComponent"
  speed = 20
  update() {
    //Respond to the keys
    if (keysDown["ArrowRight"]) {
      //If the right key is down move right.
      //Note we multiply by Time.deltaTime 
      //so we are framerate independent
      this.transform.x += this.speed * Time.deltaTime
    }
    //Similar to above, but the left arrow case.
    if (keysDown["ArrowLeft"]) {
      this.transform.x -= this.speed * Time.deltaTime
    }
  }

}

//The invisible controller that spawns clouds
//Without layers, these clouds would be in 
//front of everything.
class ControllerComponent extends Component {
  //Start up the camera
  start() {
    Camera.main.fillStyle = "gray"
  }
  update() {
    //Every 100ish frames, add a cloud
    if (Math.random() > .99) {
      SceneManager.getActiveScene().addGameObject(
        //What we are instantiating
        new CloudGameObject(),
        //Where we are instantiating it
        //We use 55 since it is the half the logical width
        //of the screen (50) plus the radius of the clouds.
        //If we did 50, we would see the clouds pop in.
        new Vector2(-55, 0),
        //What the scale will be
        new Vector2(5, 5)
      )
    }
  }
}

//The cloud controller
class CloudComponent extends Component {
  update() {
    this.transform.x += 5 * Time.deltaTime;

    //If the cloud is off the screen (50+5 = half logical width + cloud radius)
    //Destroy it.
    //Without this call, we would eventually run out of memory and the 
    //game would slow to a crawl.
    if(this.transform.x > 55){
      this.parent.destroy();
    }
  }
}

//Since we are instatiating many clouds
//it's worth the effort to make a custom
//game object
class CloudGameObject extends GameObject {
  constructor(){
    super("CloudGameObject")
  }
  start() {
    //This layer call is what puts the clouds in the background
    this.layer = -1
    //Add a Circle so we are drawn. 
    //Add a CloudComponent so the clouds move and are destroyed.
    this.addComponent(new Circle())
    this.addComponent(new CloudComponent())
  }
}

//Create all the game objects in our scene
class LayersScene extends Scene {
  start() {

    //Add the brown box object
    //This is purely decorative, but it helps us see when
    //the blue player object moves
    this.addGameObject(
      new GameObject("BoxGameObject") //The object to make
        .addComponent(new Rectangle("brown")), //The object's components
      new Vector2(0, 0), //Where the object will be placed
      new Vector2(20, 20) //How large the rectangle will be
    )

    //Add the player game object
    this.addGameObject(
      new GameObject("PlayerGameObject")//The object to make
        .addComponent(new PlayerComponent()) //The controlling component
        .addComponent(new Rectangle("blue")), //The drawing component
      new Vector2(0, 0), //Where the player will start
      new Vector2(10, 10) //How large the player will be
    )

    //Add the invisible controller that spawns clouds
    this.addGameObject(
      new GameObject("ControllerGameobject") //The object to make
        .addComponent(new ControllerComponent()) //The controller to add.
    )
  }
}

//export the main scene so the .html file can run the game.
export default new LayersScene();