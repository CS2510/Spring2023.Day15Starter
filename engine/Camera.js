
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

    // return {zeroX:0, zeroY:0}
  }

  /**
   * Given a point in screen space, determine where that is in world space
   * The is known as "picking"
   * @param {Number} x 
   * @param {Number} y 
   * @param {CanvasDrawingContext2D} ctx 
   * @returns The coordinate in world space that is drawn to that screen space pixel
   */
  static screenToWorldSpace(x, y, ctx) {
    let logicalScaling = Camera.getLogicalScale(ctx);

    x -= ctx.canvas.width / 2;
    y -= ctx.canvas.height / 2;

    x /= logicalScaling;
    y /= logicalScaling;

    x += Camera.main.transform.x;
    y += Camera.main.transform.y;

    x /= Camera.main.transform.sx;
    y /= Camera.main.transform.sy;

    return { x, y };

    // return {x:0,y:0};
  }

  static worldToLogicalScreenSpace(x, y, ctx) {

    let logicalScaling = Camera.getLogicalScale(ctx);
    let zeros = Camera.getZeros(ctx);



    x += ctx.canvas.width / 2;
    y += ctx.canvas.height / 2;

    x *= logicalScaling;
    y *= logicalScaling;

    x -= Camera.main.transform.x;
    y -= Camera.main.transform.y;

    x *= Camera.main.transform.sx;
    y *= Camera.main.transform.sy;

    x /= logicalScaling;
    y /= logicalScaling

    x -= zeros.zeroX;
    y -= zeros.zeroY;

   // let logical = Camera.screenToLogicalScreenSpace(x, y, ctx);


    //return {x,y}
    return {x:x,y:50/(16/9)}
    return { x: logical.x, y: logical.y }
    // x += EngineGlobals.logicalWidth / 2 
    // y += EngineGlobals.logicalWidth / 2 

    // x /= 1;
    // y /= EngineGlobals.requestedAspectRatio

    // x -= Camera.main.transform.x
    // y -= Camera.main.transform.y
    // return {x,y}

  }

  /**
   * Given a coordinate in screen space, determine its coordinate
   * in logical space after letterboxing.
   * @param {Number} x The x coordinate in screen space
   * @param {Number} y The y coordinate in screen space
   * @param {CanvasDrawingContext2D} ctx The drawing context
   * @returns The coordinate in logical screen space after letter boxing.
   */
  static screenToLogicalScreenSpace(x, y, ctx) {
    let logicalScaling = Camera.getLogicalScale(ctx)
    let zeros = Camera.getZeros(ctx);

    x -= zeros.zeroX;
    y -= zeros.zeroY;
    x /= logicalScaling;
    y /= logicalScaling;
    return { x, y };

    // return {x:0,y:0}
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