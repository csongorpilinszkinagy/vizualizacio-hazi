var Scene = function(gl) {
  this.vsQuad = new Shader(gl, gl.VERTEX_SHADER, "quad_vs.essl");
  this.fsTrace = new Shader(gl, gl.FRAGMENT_SHADER, "trace_fs.essl");
  this.program = new Program(gl, this.vsQuad, this.fsTrace);
  this.quadGeometry = new QuadGeometry(gl);

  this.timeAtLastFrame = new Date().getTime();

  this.camera = new PerspectiveCamera();

  this.volume = new Texture2D(gl, "assets/ufotiledvolumes/brain-at_4096.jpg");
  this.program.volume.set(this.volume);

  //this.texture = new Texture2D(gl, "assets/materials/matcap6.png");
  //this.program.volume.set(this.texture);
};

Scene.prototype.update = function(gl, keysPressed) {
  //jshint bitwise:false
  //jshint unused:false
  var timeAtThisFrame = new Date().getTime();
  var dt = (timeAtThisFrame - this.timeAtLastFrame) / 1000.0;
  this.timeAtLastFrame = timeAtThisFrame;

  this.camera.move(dt, keysPressed);

  // clear the screen
  gl.clearColor(0.6, 0.0, 0.3, 1.0);
  gl.clearDepth(1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  this.program.rayDirMatrix.set(this.camera.rayDirMatrix);
  this.program.eye.set(this.camera.position);
  this.program.commit();
  this.quadGeometry.draw();
};


