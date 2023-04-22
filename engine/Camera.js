
/**
 * A camera engine-level component
 * 
 * The camera is in charge of:
 * - setting the background color
 * - holding the position and zoom of the virtual camera
 * 
 * The position of the camera is specified in this.transform.x and this.transform.y
 * The scale of the camera is specified in this.transform.sx
 */
class Camera extends Component {
  /** The name of the component */
  name = "Camera"

  /** The fill color of the component */
  fillStyle


  /**
   * Create a camera component. 
   * Has an optional color for the background of the game
   * @param {Color} fillStyle 
   */
  constructor(fillStyle = "white") {
    super();

    //Set the background to fillStyle
    this.fillStyle = fillStyle
  }

  /**
   * Determine how to scale the screen in order to live in a logical screen space
   * @param {CanvasDrawingContext2D} ctx 
   * @returns The scale required to get into logical space
   */
  static getLogicalScale(ctx) {
    let browserAspectRatio = ctx.canvas.width / ctx.canvas.height;
    let browserWidth = ctx.canvas.width
    if (EngineGlobals.requestedAspectRatio <= browserAspectRatio)
      browserWidth -= (ctx.canvas.width - ctx.canvas.height * EngineGlobals.requestedAspectRatio)

    return browserWidth / EngineGlobals.logicalWidth
    // return 1;

  }

  static getLogicalScaleZoomable(ctx) {
    let browserAspectRatio = ctx.canvas.width / ctx.canvas.height;
    let browserWidth = ctx.canvas.width
    if (EngineGlobals.requestedAspectRatio <= browserAspectRatio)
      browserWidth -= (ctx.canvas.width - ctx.canvas.height * EngineGlobals.requestedAspectRatio)

    return browserWidth / EngineGlobals.logicalWidth * Camera.main.transform.sx;
    // return 1;

  }

  /**
   * Figure out the offset in screen space that we need if we are going
   * to draw to the "screen" after considering the letterboxing.
   * 
   * @param {CanvasDrawingContext2D} ctx 
   * @returns The x and y in screen space that is 0,0 after letterboxing
   */
  static getZeros(ctx) {
    let browserAspectRatio = ctx.canvas.width / ctx.canvas.height;
    let zeroX = 0;
    let zeroY = 0;
    let browserWidth = ctx.canvas.width

    if (EngineGlobals.requestedAspectRatio > browserAspectRatio)
      zeroY = (ctx.canvas.height - ctx.canvas.width / EngineGlobals.requestedAspectRatio) / 2;
    else
      zeroX = (ctx.canvas.width - ctx.canvas.height * EngineGlobals.requestedAspectRatio) / 2;

    return { zeroX, zeroY };
  }


  static screenToGUI(ctx, x, y) {
   let zeroes = Camera.getZeros(ctx)
    
    let sx = Camera.getLogicalScale(ctx);
    let sy = sx;

    x -= zeroes.zeroX;
    y -= zeroes.zeroY;

    x /= sx;
    y /= sy;

    return { x,y }
  }

  static screenToWorld(ctx, x, y) {
    let sx = Camera.getLogicalScaleZoomable(ctx);
    let sy = sx;

    x -= ctx.canvas.width/2;
    y -= ctx.canvas.height/2

    x /= sx;
    y /= sy;

    x += Camera.main.transform.x;
    y += Camera.main.transform.y;

    return {x,y}

  }

  static GUIToScreen(ctx, x, y) {
    
    let logicalScale = Camera.getLogicalScale(ctx);
    let zeroes = Camera.getZeros(ctx, x, y)
    
    x *= logicalScale;
    y *= logicalScale;
    
    x += zeroes.zeroX
    y += zeroes.zeroY;

    return { x,y }
  }

  static GUIToWorld(ctx, x, y) {
    let temp1 = Camera.GUIToScreen(ctx, x, y);
    let temp2 = Camera.screenToWorld(ctx, temp1.x, temp1.y);

    return { x: temp2.x, y: temp2.y }
  }

  static worldToScreen(ctx, x, y) {
    let sx = Camera.getLogicalScaleZoomable(ctx);
    let sy = sx;

    x-= Camera.main.transform.x;
    y -= Camera.main.transform.y;

    x *= sx;
    y *= sy;

    x += ctx.canvas.width / 2;
    y += ctx.canvas.height / 2;

    return { x,y };
  }

  static worldToGUI(ctx, x, y) {
    let temp = Camera.worldToScreen(ctx, x, y);
    let toReturn = Camera.screenToGUI(ctx, temp.x, temp.y);
    return toReturn;
  }

  /**
   * Return a reference to the camera component
   * @returns A reference to the camera component
   */
  static get main() {
    let scene = SceneManager.getActiveScene();

    //The camera is the first game object's second component
    //(The first component is a transform.)
    return scene.gameObjects[0].components[1]
  }
}

//Add circle to the global namespace.
window.Camera = Camera;