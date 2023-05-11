//The code for our example game
/**
 * Create all the static and dynamic colliders in the scene
 */
class ControllerComponent extends Component {
  //The colliders that won't move
  staticColliders = [
    {
      type: new Circle("transparent", "black", .1),
      size: new Vector2(3, 3)
    },
    {
      type: new Circle("transparent", "black", .1),
      size: new Vector2(3, 3),
      offset: 5
    },
    {
      type: new Circle("transparent", "black", .1),
      size: new Vector2(3, 3),
      offset: -5
    },
    {
      type: new Circle("transparent", "red", .1),
      size: new Vector2(5, 5)
    },
    {
      type: new Circle("transparent", "red", .1),
      size: new Vector2(5, 5),
      offset:5
    },
    {
      type: new Circle("transparent", "red", .1),
      size: new Vector2(5, 5),
      offset:-5
    },
    {
      type: new Rectangle("transparent", "green", .1),
      size: new Vector2(3, 3)
    },
    {
      type: new Rectangle("transparent", "green", .1),
      size: new Vector2(3, 3),
      offset:5
    },
    {
      type: new Rectangle("transparent", "green", .1),
      size: new Vector2(3, 3),
      offset:-5
    },
    {
      type: new Rectangle("transparent", "blue", .1),
      size: new Vector2(5, 5)
    },
    {
      type: new Rectangle("transparent", "blue", .1),
      size: new Vector2(5, 5),
      offset: 5
    },
    {
      type: new Rectangle("transparent", "blue", .1),
      size: new Vector2(5, 5),
      offset: -5
    },
  ]

  //The colliders that move
  dynamicColliders = [
    {
      type: new Point("black"),
      size: new Vector2(.1, .1)
    },
    {
      type: new Circle("black"),
      size: new Vector2(2, 2)
    },
    {
      type: new Circle("red"),
      size: new Vector2(4, 4)
    },
    {
      type: new Circle("green"),
      size: new Vector2(6, 6)
    },
    {
      type: new Rectangle("blue"),
      size: new Vector2(2, 2)
    },
    {
      type: new Rectangle("Cyan"),
      size: new Vector2(4, 4)
    },
    {
      type: new Rectangle("magenta"),
      size: new Vector2(6, 6)
    },
  ]
  start() {

    let count = 0;

    count = 0;
    //Create all the dynamic colliders
    for (let dynamic of this.dynamicColliders) {
      //How far out they should be
      let radius = 25;
      
      //Choose an angle based on the number of dynamic objects
      let angle = count / this.dynamicColliders.length * Math.PI * 2

      //Create the game object
      let gameObject = GameObject.instantiate(new GameObject("DynamicGameObject" + count))
      
      //Add components
      gameObject.addComponent(dynamic.type)

      let rotatorComponent = new RotatorComponent();
      rotatorComponent.radius = radius;
      rotatorComponent.angle = angle
      rotatorComponent.collider = dynamic.type
      gameObject.addComponent(rotatorComponent);
      gameObject.transform.sx = dynamic.size.x;
      gameObject.transform.sy = dynamic.size.y;

      //Place the game object
      gameObject.transform.x = Math.cos(angle) * radius;
      gameObject.transform.y = Math.sin(angle) * radius;

      //Move to the next object
      count++
    }

    //Handle the static colliders
    count = 0;
    for (let collider of this.staticColliders) {
      //How far out they should be
      let radius = 25;

      //Create a new game object
      let gameObject = GameObject.instantiate(new GameObject("StaticGameObject" + count))

      //Add the components
      gameObject.addComponent(collider.type);
      gameObject.transform.sx = collider.size.x;
      gameObject.transform.sy = collider.size.y;

      //Offset the objects from the center if requested
      if (collider.offset) {
        radius += collider.offset
      }

      gameObject.transform.x = Math.cos(count / this.staticColliders.length * Math.PI * 2) * radius;
      gameObject.transform.y = Math.sin(count / this.staticColliders.length * Math.PI * 2) * radius;

      count++;
    }

  }
}

class RotatorComponent extends Component {
  rotation = 0;
  collider
  start() {
    //Save the original fill color
    this.controller = GameObject.getObjectByName("ControllerGameObject").getComponent("ControllerComponent")
    this.originalColor = this.collider.fillStyle;
  }
  update() {
    //Update the object's position
    this.rotation += Time.deltaTime * .5
    
    //Convert into radial coordinates
    this.transform.x = Math.cos(this.angle + this.rotation) * this.radius;
    this.transform.y = Math.sin(this.angle + this.rotation) * this.radius;

    //Look for collisions

    for (let i = 0; i < this.controller.staticColliders.length; i++) {
      let gameObject = GameObject.getObjectByName("StaticGameObject" + i);

      //Color based on collisions
      if (Collision.handle(this.parent, gameObject)) {
        //If there is a collision, turn yellow and stop
        this.collider.fillStyle = "yellow";
        break;
      }
      else {
        //Otherwise, return to the normal color
        this.collider.fillStyle = this.originalColor;
      }
    }
  }
}

/**
 * Static class for calculating collisions
 */
class Collision {
  //The types of components we are expecting
  static componentNames = [
    "Rectangle",
    "Circle",
    "Point"
  ]
  /**
   * 
   * @param {GameObject} one The first game object
   * @param {GameObject} two The second game object
   * @returns True if the game objects are in collision. False otherwise
   */
  static handle(one, two) {
    //Figure out the kind of collision we are resolving
    let typeOne = "None";
    let typeTwo = "None";
    let componentOne;
    let componentTwo;

    for (let name of Collision.componentNames) {
      componentOne = one.getComponent(name);
      if (componentOne) {
        typeOne = name;
        break;
      }
    }
    if (typeOne == "None") {
      return;
    }

    for (let name of Collision.componentNames) {
      componentTwo = two.getComponent(name);
      if (componentTwo) {
        typeTwo = name;
        break;
      }
    }
    if (typeTwo == "None") {
      return;
    }

    //Based on the types, call the appropriate function
    
    if (typeOne == "Point" && typeTwo == "Point") {
      return false;
    }
    if (typeOne == "Point" && typeTwo == "Circle") {
      return Collision.handlePointCircle(componentOne, componentTwo);
    }
    if (typeOne == "Point" && typeTwo == "Rectangle") {
      return Collision.handlePointRect(componentOne, componentTwo);
    }
    if (typeOne == "Circle" && typeTwo == "Point") {
      //Flip the arguments
      return Collision.handlePointCircle(componentTwo, componentOne);
    }
    if (typeOne == "Circle" && typeTwo == "Circle") {
      return Collision.handleCircleCircle(componentOne, componentTwo);
    }
    if (typeOne == "Circle" && typeTwo == "Rectangle") {
      return Collision.handleCircleRect(componentOne, componentTwo);
    }
    if (typeOne == "Rectangle" && typeTwo == "Point") {
      //Flip the arguments
      return Collision.handlePointRect(componentTwo, componentOne);
    }
    if (typeOne == "Rectangle" && typeTwo == "Circle") {
      //Flip the arguments
      return Collision.handleCircleRect(componentTwo, componentOne);
    }
    if (typeOne == "Rectangle" && typeTwo == "Rectangle") {
      return Collision.handleRectRect(componentOne, componentTwo);
    }
  }
  static handlePointCircle(one, two) {
    let distance = Math.sqrt((one.transform.x - two.transform.x) ** 2 + (one.transform.y - two.transform.y) ** 2)
    return distance <= two.transform.sx;
  }
  static handlePointRect(one, two) {
    let x = one.transform.x;
    let y = one.transform.y;
    let left = two.transform.x - two.transform.sx / 2;
    let right = two.transform.x + two.transform.sx / 2;
    let bottom = two.transform.y - two.transform.sy / 2;
    let top = two.transform.y + two.transform.sy / 2;

    return x > left && x < right && y > bottom && y < top;
  }
  static handleCircleCircle(one, two) {
    let distance = Math.sqrt((one.transform.x - two.transform.x) ** 2 + (one.transform.y - two.transform.y) ** 2)
    return distance <= one.transform.sx + two.transform.sx;
  }
  static handleCircleRect(one, two) {

    let lineBetweenCenters = { AB: null, C: null, distance:0 };
    let centerCircle = new Vector2(one.transform.x, one.transform.y);
    let centerRectangle = new Vector2(two.transform.x, two.transform.y);
    lineBetweenCenters.AB = centerCircle.minus(centerRectangle).normalize();
    let tempA = lineBetweenCenters.AB.x;
    let tempB = lineBetweenCenters.AB.y;
    lineBetweenCenters.AB.x = tempB;
    lineBetweenCenters.AB.y = -tempA;
  
    lineBetweenCenters.C = -lineBetweenCenters.AB.dot(centerCircle)
    lineBetweenCenters.distance = centerCircle.minus(centerRectangle).length();

    let r1 = centerCircle.add(lineBetweenCenters.AB.scale(one.transform.sx))
    let r2 = centerCircle.add(lineBetweenCenters.AB.scale(-one.transform.sx))

    let corner1 = new Vector2(two.transform.sx/2, two.transform.sy/2);
    let corner2 = new Vector2(-two.transform.sx/2, two.transform.sy/2);
    let corner3 = new Vector2(-two.transform.sx/2, -two.transform.sy/2);
    let corner4 = new Vector2(two.transform.sx/2, -two.transform.sy/2);

    let dot1 = corner1.dot(lineBetweenCenters.AB)+lineBetweenCenters.distance
    let dot2 = corner2.dot(lineBetweenCenters.AB)+lineBetweenCenters.distance
    let dot3 = corner3.dot(lineBetweenCenters.AB)+lineBetweenCenters.distance
    let dot4 = corner4.dot(lineBetweenCenters.AB)+lineBetweenCenters.distance
    let dots = [dot1,dot2, dot3, dot4];
    let rs = [one.transform.sx, -one.transform.sx];
    for(let dot of dots){
      if(dot < one.transform.sx)
      return true
    }
    return false;


    // let possibleLines = [];

    // let left = two.transform.x - two.transform.sx / 2;
    // let right = two.transform.x + two.transform.sx / 2;
    // let bottom = two.transform.y - two.transform.sy / 2;
    // let top = two.transform.y + two.transform.sy / 2;

    // if (one.transform.x < left) {
    //   let one = new Vector2(left, bottom);
    //   let two = new Vector2(left, top);
    //   let AB = one.minus(two).normalize().perpendicular()
    //   let C = -AB.dot(one);
    //   possibleLines.push({ AB, C })
    // }
    // if (one.transform.x > right) {
    //   let one = new Vector2(right, bottom);
    //   let two = new Vector2(right, top);
    //   let AB = one.minus(two).normalize().perpendicular()
    //   let C = -AB.dot(one);
    //   possibleLines.push({ AB, C })

    // }
    // if (one.transform.y < bottom) {
    //   let one = new Vector2(left, bottom);
    //   let two = new Vector2(right, bottom);
    //   let AB = one.minus(two).normalize().perpendicular()
    //   let C = -AB.dot(one);
    //   possibleLines.push({ AB, C })
    // }
    // if (one.transform.y > top) {
    //   let one = new Vector2(left, top);
    //   let two = new Vector2(right, top);
    //   let AB = one.minus(two).normalize().perpendicular()
    //   let C = -AB.dot(one);
    //   possibleLines.push({ AB, C })
    // }

    // if (possibleLines.length == 0) {
    //   return true
    // }

    // if (one.transform.x < 24.7) {
    //   let noop;
    //   console.log("Hi")
    // }

    // //Go through the possible lines and respond accordingly
    // let distances = [];

    // for (let line of possibleLines) {
    //   let distance = line.AB.dot(new Vector2(one.transform.x, one.transform.y)) + line.C;
    //   distances.push(distance);
    // }

    // let maxDistance = Math.max(...distances.map(x => Math.abs(x)));
    // if (maxDistance < one.transform.sx) {
    //   return true;
    // }
    // return false;



  }
  static handleRectRect(one, two) {
    let left1 = one.transform.x - one.transform.sx / 2;
    let right1 = one.transform.x + one.transform.sx / 2;
    let bottom1 = one.transform.y - one.transform.sy / 2
    let top1 = one.transform.y + one.transform.sy / 2

    let left2 = two.transform.x - two.transform.sx / 2;
    let right2 = two.transform.x + two.transform.sx / 2;
    let bottom2 = two.transform.y - two.transform.sy / 2
    let top2 = two.transform.y + two.transform.sy / 2

    return !(left1 > right2 || left2 > right1
      || right1 < left2 || right2 < left1
      || bottom1 > top2 || bottom2 > top1
      || top1 < bottom2 || top2 < bottom1)

  }
}

class ExampleScene extends Scene {
  start() {
    //Add the controller, which procedurally adds the other objects in the scene
    this.addGameObject(
      new GameObject("ControllerGameObject")
        .addComponent(new ControllerComponent())
    )

  }
}

//export the main scene so the .html file can run the game.
export default new ExampleScene();