export class Environment {
  constructor(w, h) {
    this.w = w || 0;
    this.h = h || 0;
    this.ifaces = new Array();
    this.grid = new Array();
    for (let y = 0; y < this.w; y++) {
      this.grid[y] = new Array();
      for (let x = 0; x < this.h; x++) {
        this.grid[y][x] = null;
      }
    }
    this.state = {
      env: this,
      level: 0,
      completed: 0,
      iface: null
    };
  }

  addInterface(o) {
    this.ifaces[this.ifaces.length] = o;
  }

  valid(x, y) {
    if (x < 0 || y < 0 || x >= this.w || y >= this.h) return false;
    return true;
  }

  get(x, y) {
    if (!this.valid(x, y)) return null;
    return this.grid[y][x];
  }

  addElement(e) {
    let x = e.x || 0;
    let y = e.y || 0;
    if (!this.valid(x, y)) return null;
    this.grid[y][x] = e;
    return { 'x': x, 'y': y };
  }

  moveElement(r, e) {
    let ox = r.x || 0;
    let oy = r.y || 0;
    let x = e.x || 0;
    let y = e.y || 0;
    this.grid[oy][ox] = null;
    this.grid[y][x] = e;
    r.x = x;
    r.y = y;
  }

  update() {
    for (let i = 0; i < this.ifaces.length; i++) {
      if (this.ifaces[i] && this.ifaces[i].update) {
        this.ifaces[i].update();
      }
    }
  }
}