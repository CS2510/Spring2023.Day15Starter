//The code for our example game


class Drawer extends Component{
  draw(ctx){
    ctx.strokeStyle = "magenta"
    ctx.lineWidth = 2
    let screen = Camera.screenToWorld(ctx, 1024, 541);
    let screenEnd = Camera.screenToWorld(ctx, 1214,731)
    ctx.beginPath();
    ctx.moveTo(screen.x,screen.y)
    ctx.lineTo(screenEnd.x, screenEnd.y);
    ctx.stroke()

  }
  drawGUI(ctx){
    ctx.strokeStyle = "cyan";
    ctx.lineWidth = 1.5
    ctx.beginPath();
    ctx.moveTo(50,28);
    ctx.lineTo(50+10,28+10);
    ctx.stroke();
  }
  drawScreen(ctx){
    
    //Draw the world location
    ctx.strokeStyle = "black"
    ctx.lineWidth = 10;
    let worldScreen = Camera.worldToScreenSpace(ctx, 0,0);
    let worldScreenEnd = Camera.worldToScreenSpace(ctx, 10,10);
    ctx.beginPath();
    ctx.moveTo(worldScreen.x, worldScreen.y);
    ctx.lineTo(worldScreenEnd.x, worldScreenEnd.y);
    ctx.stroke();

    //Draw the logical location
    ctx.strokeStyle = "green"
    ctx.lineWidth = 5;
    let logicalScreen = Camera.logicalToScreenSpace(ctx, 50,50*9/16);
    let logicalScreenEnd = Camera.logicalToScreenSpace(ctx, 50+10, 50*9/16+10);
    ctx.beginPath();
    ctx.moveTo(logicalScreen.x, logicalScreen.y);
    ctx.lineTo(logicalScreenEnd.x, logicalScreenEnd.y);
    ctx.stroke();


    //Draw the screen location
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2
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
        .addComponent(new Rectangle("blue"))
        ,
      Vector2.zero,
      new Vector2(20, 20)
    )
    this.addGameObject(
      new GameObject("Drawer").addComponent(new Drawer())
    )
  }
}

//export the main scene so the .html file can run the game.
export default new CameraMoverScene();