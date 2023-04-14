class CameraMover extends Component {
    start() {
    }
    update(ctx) {
      let camera = Camera.main;
      if (Input.mouseDown) {
        let offsetX = Input.lastMouseX - Input.mouseX;
        let offsetY = Input.lastMouseY - Input.mouseY;
        let scale = Camera.getLogicalScale(ctx);
        camera.transform.x += offsetX / scale;
        camera.transform.y += offsetY / scale;
      }
  
      if (Input.lastWheel) {
        console.log(Input.lastWheel);
        if (Input.lastWheel > 0) {
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

  window.CameraMover = CameraMover;
  export default CameraMover;