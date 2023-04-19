//The code for our example game


class Drawer extends Component{
  draw(ctx){
    ctx.strokeStyle = "black"
    ctx.beginPath();
    ctx.moveTo(0,0)
    ctx.lineTo(10,10);
    ctx.stroke()

  }
  drawGUI(ctx){
    ctx.strokeStyle = "cyan";
    ctx.lineWidth /= 2
    ctx.beginPath();
    ctx.moveTo(50,28);
    ctx.lineTo(50+10,28+10);
    ctx.stroke();
  }
  drawScreen(ctx){
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(1024,541)
    ctx.lineTo(1216.4,733.4);
    // ctx.lineTo(1024+19.24*10,541+19.24*10);
    ctx.stroke()
  }
}

class CameraMoverScene extends Scene {
  start() {
    this.addGameObject(
      new GameObject("CameraMoverGameObject")
        .addComponent(new CameraMover())
        .addComponent(new Rectangle("blue")),
      Vector2.zero,
      new Vector2(10, 10)
    )
    this.addGameObject(
      new GameObject("Drawer").addComponent(new Drawer())
    )
  }
}

//export the main scene so the .html file can run the game.
export default new CameraMoverScene();