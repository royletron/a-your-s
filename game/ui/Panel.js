import Sprite from "../sprite";
import { ui_primary } from "../tools/colors";
import { default_ui } from "../tools/fonts";
import { server } from "../tools/shapes";

export default class Panel extends Sprite {
  padding = 10;
  constructor(label, x, y) {
    super(200, 100);
    this.label = label;
    this.width = 500;
    this.height = 200;
    this.x = x;
    this.y = y;
  }
  revalidate() {
    const { ctx } = this;
    // draw frame
    ctx.save();
    ctx.beginPath();
    ctx.setLineDash([6, 6]);
    ctx.rect(1, 1, this.width - 2, this.height - 50);
    ctx.strokeStyle = ui_primary;
    ctx.stroke();
    // draw label bg
    ctx.beginPath();
    ctx.font = default_ui;
    const txtWidth = ctx.measureText(this.label).width + 20;
    ctx.rect(this.width - txtWidth - 20, this.height - 68, txtWidth, 48);
    ctx.fillStyle = "black";
    ctx.fill();
    // draw label
    ctx.fillStyle = ui_primary;
    ctx.textAlign = "left";
    ctx.fillText(this.label, this.width - txtWidth - 10, this.height - 45);
    ctx.restore();

    server(ctx, 10, 10);
    super.revalidate();
  }
}
