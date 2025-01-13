import { Element } from '../core/Element.js';
import { Levels } from '../core/Levels.js';

export class Door extends Element {
  constructor(env, x, y) {
    super();
    if (!env) return;
    this.env = env;

    // Initialize state if it doesn't exist
    if (!this.env.state) {
      this.env.state = {
        env: this.env,
        level: 0,
        completed: 0,
        iface: null
      };
    }

    this.x = x;
    this.y = y;
    this.type = 'door';
    this._element();
  }

  _push() {
    if (this.env && this.env.state) {
      Levels.nextLevel(this.env.state);
    }
  }
}
