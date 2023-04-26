//The code for our example game
class MoleControllerComponent extends Component {
  start() {
    this.addMole();
    
  }
  addMole(){
    let toAdd = new MoleGameObject();
    GameObject.instantiate(toAdd)
    let moleComponent = toAdd.getComponent("MoleComponent")
    moleComponent.addListener(this)
    toAdd.transform.x = (Math.random()*2-1)*10;
    toAdd.transform.y = (Math.random()*2-1)*10;
    // toAdd.transform.x = 0;
    // toAdd.transform.y = 0;
    
    
    let toAddFollower = new MoleFollowerGameObject()
    GameObject.instantiate(toAddFollower);
    let followingComponent = toAddFollower.getComponent("MoleFollowerComponent")
    followingComponent.following = toAdd;

    moleComponent.addListener(followingComponent);
  }
  update() {
  }
  handleUpdate(event){
    this.addMole();
  }
}

class MoleComponent extends Component{
  update(ctx){
    if(Input.mouseUp){
      let screenX = Input.mouseX;
      let screenY = Input.mouseY;

      let worldCoords2 = Camera.screenToWorld(ctx, screenX, screenY);
      let worldCoords = {x:screenX, y:screenY}
      worldCoords.x -= ctx.canvas.width/2;
      worldCoords.y -= ctx.canvas.height/2;
      
      worldCoords.x /= Camera.getLogicalScale(ctx);
      worldCoords.y /= Camera.getLogicalScale(ctx);

      worldCoords.x *= Camera.main.transform.sx;
      worldCoords.y *= Camera.main.transform.sy;

      worldCoords.x += Camera.main.transform.x;
      worldCoords.y += Camera.main.transform.y;

      if(!worldCoords) return;
      let deltaX = this.transform.x - worldCoords.x;
      let deltaY = this.transform.y - worldCoords.y
      let distance = Math.sqrt(deltaX**2 + deltaY**2);
      if(distance < this.transform.sx)
      {
        this.parent.destroy()
        this.updateListeners("MoleClick")
      }
    }

  }

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

class MoleFollowerComponent extends Component{
  following
  update(ctx){
    if(!this.following) return;
    let otherTransform = this.following.transform;
    let destination = Camera.worldToGUI(ctx, otherTransform.x, otherTransform.y);
    this.transform.x = destination.x;
    this.transform.y = destination.y;

  }
  handleUpdate(event){
    this.parent.destroy();
  }
}

class MoleFollowerGameObject extends GameObject{
  name = "MoleFollowerGameObject"
  start(){
    this.addComponent(new GUITextCentered("Click", "gray", "2pt Arial"))
    this.addComponent(new MoleFollowerComponent());
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