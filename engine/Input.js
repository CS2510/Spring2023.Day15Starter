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
    canvas.addEventListener("mousedown", (e) => { console.log("mousedown") });
    canvas.addEventListener("mouseup", (e) => { console.log("mouseup") });

    canvas.addEventListener("wheel", (e) => { console.log("wheel") });

    document.addEventListener("keyup", (e) => { console.log("keyup"); e.preventDefault(); });
    document.addEventListener("keydown", (e) => { console.log("keydown"); e.preventDefault(); });
    document.addEventListener("keypress", (e) => { console.log("keypress"); e.preventDefault(); });

    canvas.addEventListener("touchstart", (e) => { console.log("touchstart") })
    canvas.addEventListener("touchend", (e) => { console.log("touchend") })
    canvas.addEventListener("touchmove", (e) => { 
      console.log("touchmove: "); 
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