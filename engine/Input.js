class Input{
  static mouseX = 0;
  static mouseY = 0;
  static lastMouseX = 0;
  static lastMouseY = 0;
  
  static lastWheel = 0;

  static mouseDown = false;

  static finishFrame(){
    Input.lastWheel = 0;
  }

  static start(){
    let canvas = document.querySelector("#canv")
    canvas.addEventListener("mousemove", (e) => { 
      console.log("mousemove") 

      Input.lastMouseX = Input.mouseX;
      Input.lastMouseY = Input.mouseY;

      Input.mouseX = e.clientX
      Input.mouseY = e.clientY
    });
    canvas.addEventListener("mousedown", (e) => {
      Input.mouseDown = true;
      });
    canvas.addEventListener("mouseup", (e) => { 
      Input.mouseDown = false;
     });

    canvas.addEventListener("wheel", (e) => { 
      Input.lastWheel = e.deltaY;
      // console.log("wheel" + e.deltaY)
     });

    document.addEventListener("keyup", (e) => {  });
    document.addEventListener("keydown", (e) => {  });
    document.addEventListener("keypress", (e) => { });

    canvas.addEventListener("touchstart", (e) => {  })
    canvas.addEventListener("touchend", (e) => {  })
    canvas.addEventListener("touchmove", (e) => { 
      for(let touchEvent of e.touches){
        console.log(touchEvent.clientX + ", " + touchEvent.clientX);
        // console.log(touchEvent);
      }
      e.preventDefault(); 
    })

  }
}

window.Input = Input;
export default Input;