//The code to move our player. 
//See "../layers" for details.
class PlayerComponent extends Component {
  name = "PlayerComponent"
  speed = 20
  start() {
  }
  update() {
    if (keysDown["ArrowRight"]) {
      this.transform.x += this.speed * Time.deltaTime
    }
    if (keysDown["ArrowLeft"]) {
      this.transform.x -= this.speed * Time.deltaTime
    }
  }

}

class ControllerComponent extends Component {
  //0 - No tracking
  //1 - Fixed tracking
  //2 - Boundary tracking
  //3 - Momentum tracking
  //4 - Momentum bondary tracking
  method = 0
  start() {
    Camera.main.fillStyle = "gray"
  }
  update() {

    if (keysDown["0"]) {
      this.method = 0; //None
    }
    if (keysDown["1"]) {
      this.method = 1; //Fixed
    }
    if (keysDown["2"]) {
      this.method = 2; //Boundary
    }
    if (keysDown["3"]) {
      this.method = 3; //Momentum
    }
    if (keysDown["4"]) {
      this.method = 4; //Boundary+Momentum
    }


    let tracker;
    if (this.method == 0) return;//Stop if we are not doing tracking

    //Otherwise, update the camera location
    let x = 0;
    if (this.method == 1) {
      tracker = GameObject.getObjectByName("FixedTrackerGameObject")
    }
    if (this.method == 2) {
      tracker = GameObject.getObjectByName("BoundaryTrackerGameObject")
    }
    if (this.method == 3) {
      tracker = GameObject.getObjectByName("MomentumTrackerGameObject")
    }
    if (this.method == 4) {
      tracker = GameObject.getObjectByName("MomentumBoundaryTrackerGameObject")
    }

    Camera.main.transform.x = tracker.transform.x;

  }
}

//A component that follows the player exactly
class FixedTrackerComponent extends Component {
  name = "FixedTrackerComponent"
  update() {
    let playerGameObject = GameObject
      .getObjectByName("PlayerGameObject")
      .getComponent("PlayerComponent")
    //The uncommented code is identical to this.
    //I'm using this more complex math so we can compare it 
    //to the other tracking options
    //this.transform.x = playerGameObject.transform.x
    let difference = playerGameObject.transform.x - this.transform.x;
    this.transform.x += difference
  }
}

//A component that follows the player within a tolerance
//We reference to this tolerance the a boundary.
class BoundaryTrackerComponent extends Component {
  update() {
    let playerGameObject = GameObject
      .getObjectByName("PlayerGameObject")

    //The boundary size
    let maxDifference = 10;
    //The difference between where we are and where the camera is
    let difference = playerGameObject.transform.x - this.transform.x;

    //Check if the difference has exceeded our tolerance
    if (difference > maxDifference) {
      //The player is to the right
      this.transform.x += difference - maxDifference
    }
    else if (difference < -maxDifference) {
      //The player is to the left
      this.transform.x += difference + maxDifference
    }
  }
}

//A component that tracks the player, but with some
//momentum. If the player moves fast, it will move off 
//of center until we catch up
class MomentumTrackerComponent extends Component {
  update() {
    let playerGameObject = GameObject
      .getObjectByName("PlayerGameObject")

    let difference = playerGameObject.transform.x - this.transform.x;
    //Move in the direction indicated by the difference
    //but scale it down (.1) so if fells more natural
    //Feel free to change .1 to other values to see what happens
    //Setting .1 to 1 will make this identical to the Fixed option
    this.transform.x += .1 * difference
  }
}

//A component that tracks the player with momentum, but
//only after the players has exceeded our tolerance
//Effectively, this is a combination of Fixed and Boundary
class MomentumBoundaryTrackerComponent extends Component {
  update() {
    let playerGameObject = GameObject
      .getObjectByName("PlayerGameObject")

    let maxDifference = 10;
    let difference = playerGameObject.transform.x - this.transform.x;

    if (difference > maxDifference) {
      //The player is to the right
      this.transform.x += .1 * (difference - maxDifference)
    }
    else if (difference < -maxDifference) {
      //The player is to the left
      this.transform.x += .1 * (difference + maxDifference)
    }
  }
}

//The objects in our scene
//See "../layers/" for details about the box, player, and controller
class CameraTrackingScene extends Scene {
  start() {
    this.addGameObject(
      new GameObject("BoxGameObject")
        .addComponent(new Rectangle("brown")),
      new Vector2(0, 0),
      new Vector2(20, 20)
    )
    this.addGameObject(
      new GameObject("PlayerGameObject")
        .addComponent(new PlayerComponent())
        .addComponent(new Rectangle("blue")),
      new Vector2(0, 0),
      new Vector2(10, 10)
    )
    this.addGameObject(
      new GameObject("ControllerGameobject")
        .addComponent(new ControllerComponent())
    )

    //Our four different tracking methods
    //The fixed tracking
    this.addGameObject(
      new GameObject("FixedTrackerGameObject")
        .addComponent(new FixedTrackerComponent())
        .addComponent(new Rectangle("Green")),
      new Vector2(0, 0),
      //Make this larger so it is always visible.
      //Otherwise the black square will usually obscure it.
      new Vector2(2, 2)
    )
    //The boundary tracking
    this.addGameObject(
      new GameObject("BoundaryTrackerGameObject")
        .addComponent(new BoundaryTrackerComponent())
        .addComponent(new Rectangle("Red")),
      new Vector2(0, 0),
      //Make this larger so it is always visible.
      //Otherwise the white square will usually obscure it.
      new Vector2(2, 2)
    )
    //The momentum tracking
    this.addGameObject(
      new GameObject("MomentumTrackerGameObject")
        .addComponent(new MomentumTrackerComponent())
        .addComponent(new Rectangle("Black"))
    )
    //The momentum boundary tracking
    this.addGameObject(
      new GameObject("MomentumBoundaryTrackerGameObject")
        .addComponent(new MomentumBoundaryTrackerComponent())
        .addComponent(new Rectangle("White"))
    )
    //Add the helper text game objects
    //The font to use
    let font = "5px Arial"
    //The location for the highest text
    let y = -75
    //The margin between text
    let margin = 7;

    //Helper text 0
    this.addGameObject(
      new GameObject("HelperText0")
        .addComponent(new Text("0 - Disable Tracking", "white", font)),
      new Vector2(-50, y)
    )
    //Helper text 1
    this.addGameObject(
      new GameObject("HelperText1")
        .addComponent(new Text("1 - Fixed Tracking (green)", "white", font)),
      new Vector2(-50, y + margin * 1)
    )
    //Helper text 2
    this.addGameObject(
      new GameObject("HelperText2")
        .addComponent(new Text("2 - Boundary Tracking (red)", "white", font)),
      new Vector2(-50, y + margin * 2)
    )
    //Helper text 3
    this.addGameObject(
      new GameObject("HelperText3")
        .addComponent(new Text("3 - Momentum Tracking (black)", "white", font)),
      new Vector2(-50, y + margin * 3)
    )
    //Helper text 4
    this.addGameObject(
      new GameObject("HelperText4")
        .addComponent(new Text("4 - Boundary+Momentum Tracking (white)", "white", font)),
      new Vector2(-50, y + margin * 4)
    )

  }
}

//export the main scene so the .html file can run the game.
export default new CameraTrackingScene();