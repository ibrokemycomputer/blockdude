export class Element {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.type = 'element';
  }

  _element() {
    this.x = this.x || 0;
    this.y = this.y || 0;
    this.type = this.type || 'element';
    this.ref = this.env.addElement(this);
  }

  _redraw() {
    this.env.update();
  }

  _push() {
    return false;
  }

  _fall() {
    while (this.env.valid(this.x, this.y - 1) && !this.env.get(this.x, this.y - 1)) {
      this._moveTo(this.x, this.y - 1);
    }
    if (this.env.get(this.x, this.y - 1)) {
      this.env.get(this.x, this.y - 1)._push();
    }
  }

  _moveTo(x, y) {
    this.x = x;
    this.y = y;
    this.env.moveElement(this.ref, this);
  }
}