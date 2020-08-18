import Sprite from "./sprite";
import Panel from "./ui/Panel";

class Game {
  constructor(id, blur) {
    this.id = id;
    this.blur = blur;
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.time = Date.now();
    this.stage = new Sprite(this.canvas.offsetWidth, this.canvas.offsetHeight);
    this.stage.parent = this;
    this.stage.add(new Panel("hello world", 20, 20));
    this.stage.add(new Panel("hello world", 90, 200));
    this.tick();
  }
  tick() {
    const time = Date.now();
    const dtx = time - this.time;
    this.time = time;
    this.update(dtx);
    this.draw();
    const turb = document.querySelectorAll("#noise feTurbulence")[0];
    turb.setAttribute(
      "baseFrequency",
      Math.random() * 0.0004 + 0.002 + " " + (Math.random() * 0.0004 + 0.002)
    );
    requestAnimationFrame(this.tick.bind(this));
  }
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);
    this.stage.draw();
    const blur = document.getElementById(this.blur);
    const ctx = blur.getContext("2d");
    ctx.drawImage(this.canvas, 0, 0);
  }
  update(dtx) {
    this.stage.update(dtx);
    // console.log(dtx);
  }
}

export default Game;
