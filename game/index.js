import Sprite from "./sprite";
import Panel from "./ui/Panel";
import RequestManager from "./requestman";

class Game {
  constructor(id, blur) {
    this.id = id;
    this.blur = blur;
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.time = Date.now();
    this.stage = new Sprite(this.canvas.offsetWidth, this.canvas.offsetHeight);
    this.reqman = new RequestManager();
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
    if (Math.random() > 0.8) {
      const turb = document.querySelectorAll("#noise feTurbulence")[0];
      turb.setAttribute(
        "baseFrequency",
        Math.random() * 0.001 + " " + Math.random() * 0.001
      );
      const blur = document.querySelector("#overlay");
      blur.style.filter = `url("#blur") brightness(${Math.random() * 80 + 120}%)`;
    }
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
    this.reqman.update(dtx);
  }
}

export default Game;
