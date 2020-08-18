const createCanvas = (width, height) => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  return { canvas, ctx };
};

export default class Sprite {
  parent = false;
  x = 0;
  y = 0;
  width = 0;
  height = 0;
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.invalid = true;
    this.children = [];
  }
  add(child) {
    child.onAdd(this);
    this.children.push(child);
  }
  onAdd(parent) {
    this.parent = parent;
  }
  remove(child) {
    child.onRemove();
    this.children = this.children.filter((c) => c !== child);
  }
  update(dtx) {
    this.children.forEach((c) => c.update(dtx));
    if (this.invalid) {
      const { ctx, canvas } = createCanvas(this.width, this.height);
      this.ctx = ctx;
      this.canvas = canvas;
      this.revalidate();
    }
  }
  revalidate() {
    this.invalid = false;
  }
  draw() {
    this.children.forEach((c) => c.draw());
    this.parent.ctx.drawImage(this.canvas, this.x, this.y);
  }
  destroy() {
    this.children.forEach((c) => c.destroy());
    this.children = [];
  }
  get width() {
    return this._width;
  }
  set width(w) {
    if (this._width !== w) {
      this._width = w;
      this.invalid = true;
    }
  }
  get height() {
    return this._height;
  }
  set height(h) {
    if (this._height !== h) {
      this._height = h;
      this.invalid = true;
    }
  }
}
