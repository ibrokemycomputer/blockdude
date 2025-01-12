import { Element } from '../core/Element.js';

export class Brick extends Element {
  constructor(env, x, y) {
    super();
    if (!env) return;
    this.env = env;
    this.x = x;
    this.y = y;
    this.type = 'brick';
    this._element();
  }
}
