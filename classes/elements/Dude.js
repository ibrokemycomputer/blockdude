import { Element } from '../Element.js';

export class Dude extends Element {
  constructor(env, x, y, face) {
    super();
    if (!env) return;
    this.env = env;
    this.x = x;
    this.y = y;
    this.type = 'dude';
    this.facing = !(!face); //facing right
    this.carry = null;
    this._element();
  }

  right() {
    this.facing = true;
    this._walkTo(this.x + 1, this.y);
  }

  left() {
    this.facing = false;
    this._walkTo(this.x - 1, this.y);
  }

  up() {
    let dx = (this.facing ? 1 : -1);
    if (this.env.get(this.x + dx, this.y) && (!this.env.get(this.x, this.y + 1) || this.env.get(this.x, this.y + 1) == this.carry) && (!this.carry || !this.env.get(this.x + dx, this.y + 2))) {
      this._walkTo(this.x + dx, this.y + 1);
    }
  }

  down() {
    let dx = (this.facing ? 1 : -1);
    if (this.carry) {
      if (this.env.valid(this.x + dx, this.y + 1) && !this.env.get(this.x + dx, this.y + 1)) {
        this.carry._moveTo(this.x + dx, this.y + 1);
        this.carry._fall();
        this.carry = null;
      }
    } else {
      if (this.env.get(this.x + dx, this.y) && !this.env.get(this.x + dx, this.y + 1) && !this.env.get(this.x, this.y + 1)) {
        let obj = this.env.get(this.x + dx, this.y);
        if (obj.type == 'block') {
          this.carry = obj;
          this.carry._moveTo(this.x, this.y + 1);
          this.carry._fall();
        }
      }
    }
    this._redraw();
    if (this.carry) this.carry._redraw();
  }

  _walkTo(x, y) {
    if (this.env.valid(x, y)) {
      if (!this.env.get(x, y)) {
        this._moveTo(x, y);
        this._fall();
        if (this.carry) {
          if (this.env.valid(x, y + 1) && !this.env.get(x, y + 1)) {
            this.carry._moveTo(x, y + 1);
            this.carry._fall();
          } else {
            this.carry._fall();
            this.carry = null;
          }
        }
      } else {
        this.env.get(x, y)._push();
      }
    }
    this._redraw();
    if (this.carry) this.carry._redraw();
  }
}