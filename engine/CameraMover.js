/**
 * Move the camera with the left mouse button and scroll wheel.
 * 
 * <p>
 * If the author wants the camera to be moved with the left mouse button and the 
 * scroll wheel, the the author needs to attach this to one game object in the scene 
 * in which this is desired.
 * </p>
 */
class CameraMover extends Component {
  /**
   * Update the location and scale of the camera based on the state of the input.
   * 
   * @param {CanvasRenderingContext2D} ctx The drawing context.
   */
  first = true;
  second = false;
  third = false;
  x = 0;
  y = 0;
  dx = 0;
  dy = 0;

  start(){
    // this.fakeMouse(0,0,100);
  }

  fakeMouse( x, y, dx, dy){
    this.first = true;
    this.second = false;
    this.third = false;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
  }

  updateFakeMouse(ctx){
    if (this.first) {
      let evt = new MouseEvent("mousemove", {
        clientX: this.x,
        clientY: this.y,
        bubbles: true,
      });
      ctx.canvas.dispatchEvent(evt)
      this.first = false;
      this.third = false;
      this.second = true;
    }
    else if(this.second){
      let evt = new MouseEvent("mousedown",{
        clientX:this.dx,
        clientY:this.dy
      });
      ctx.canvas.dispatchEvent(evt);
      this.second = false;
      this.first = false;
      this.third = true;
    }else if(this.third){
      let evt = new MouseEvent("mouseup",{
        clientX:this.dx,
        clientY:this.dy,
      })
      ctx.canvas.dispatchEvent(evt);
      this.first = false;
      this.second = false;
      this.third = false;
    }
  }
  update(ctx) {

    this.updateFakeMouse(ctx);
    

    
    //Get a reference to the main camera component
    let camera = Camera.main;
    // console.log(camera.transform.x + ", " + camera.transform.y)

    //Update based on whether the mouse button is down
    if (Input.mouseDown) {
      let offsetX = Input.lastMouseX - Input.mouseX;
      let offsetY = Input.lastMouseY - Input.mouseY;
      if(Math.abs(offsetX) > 1 || Math.abs(offsetY) > 1)
      
      if (offsetX || offsetY) {
        console.log(`${offsetX}, ${offsetY}`)
        let scale = Camera.getLogicalScale(ctx);
        camera.transform.x += offsetX / scale;
        camera.transform.y += offsetY / scale;
      }

      // console.log(Input.lastMouseX + ", " + Input.lastMouseY + " " + Input.mouseX + ", " + Input.mouseY + " " + offsetX + ", " + offsetY)
    }

    //Update based on whether the wheel has been rolled.
    if (Input.lastWheel) {
      // console.log(Input.lastWheel);
      //If the author wants the effect reversed, 
      //simple reverse this if conditional
      if (Input.lastWheel > 0 /* Input.lastWheel <= 0 */) {
        camera.transform.sx *= 1.1;
        camera.transform.sy *= 1.1;
      }
      else {
        camera.transform.sx /= 1.1;
        camera.transform.sy /= 1.1;
      }
    }

  }
}

//Attach this class to the global window object.
window.CameraMover = CameraMover;
export default CameraMover;