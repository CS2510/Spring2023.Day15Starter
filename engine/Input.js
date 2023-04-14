class Input{
  static mouseX = 0;
  static mouseY = 0;
  static start(){
    let canvas = document.querySelector("#canv")
    canvas.addEventListener("mousemove", (e) => { 
      console.log("mousemove") 
      Input.mouseX = e.clientX
      Input.mouseY = e.clientY
    });
    canvas.addEventListener("mousedown", (e) => {  });
    canvas.addEventListener("mouseup", (e) => {  });

    canvas.addEventListener("wheel", (e) => {  });

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