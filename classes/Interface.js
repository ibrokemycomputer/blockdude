export class Interface {
  constructor(env, w, h, cw, ch) {
    this.env = env;
    this.w = w || 0;
    this.h = h || 0;
    this.cw = cw || 24;
    this.ch = ch || 24;
    this.env = env;
    this.pan = null;
    this.centerOn = null;
    this.panning = false;
    // this.iid = 'int' + Math.random();
    this.imgroot = 'images/';
    this.images = { 'empty': 'empty', 'dudeLeft': 'dudeLeft', 'dudeRight': 'dudeRight', 'block': 'block', 'brick': 'brick', 'door': 'door' };
    this.grid = new Array();
    this.setEnvironment(this.env);
    for (let y = 0; y < this.h; y++) {
      let yy = this.h - y - 1;
      this.grid[y] = new Array();
      for (let x = 0; x < this.w; x++) {
        this.grid[y][x] = document.createElement('img');
        this.grid[y][x].src = this.getImg('empty');
        // this.grid[y][x].height = this.ch;
        // this.grid[y][x].width = this.cw;
        // this.grid[y][x].id = this.iid + '.' + y + '.' + x; //Necessary?
        this.grid[y][x].style.top = "" + (yy * this.ch) + "px";
        this.grid[y][x].style.left = "" + (x * this.cw) + "px";
        this.grid[y][x].style.width = "" + this.cw + "px";
        this.grid[y][x].style.height = "" + this.ch + "px";
      }
    }
    this.preload();
  }

  preload() {
    for (let k in this.images) {
      (new Image()).src = this.getImg(k);
    }
  }

  getImg(k) {
    return this.imgroot + this.images[k] + '.png';
  }

  render(c) {
    if (!c) c = document.body;
    for (let y = 0; y < this.h; y++) {
      for (let x = 0; x < this.w; x++) {
        c.appendChild(this.grid[y][x]);
      }
    }
    c.style.width = "" + (this.w * this.cw) + "px";
    c.style.height = "" + (this.h * this.ch) + "px";
  }

  setEnvironment(env) {
    if (!env) return;
    this.env = env;
    this.env.addInterface(this);
  }

  setCenter(o) {
    this.centerOn = o;
  }

  getCenter() {
    if (!this.centerOn) return { 'x': 0, 'y': 0 };
    return this.centerOn;
  }

  left() {
    if (!this.pan) return;
    this.panning = true;
    this.pan.x -= 1;
    this.update();
  }

  right() {
    if (!this.pan) return;
    this.panning = true;
    this.pan.x += 1;
    this.update();
  }

  up() {
    if (!this.pan) return;
    this.panning = true;
    this.pan.y += 1;
    this.update();
  }

  down() {
    if (!this.pan) return;
    this.panning = true;
    this.pan.y -= 1;
    this.update();
  }

  center() {
    this.panning = false;
    this.update();
  }

  update() {
    let c = this.getCenter();
    if (!this.pan || !this.panning) this.pan = { 'x': c.x - this.w / 2.0, 'y': c.y - this.h / 2.0 };
    if (Math.ceil(this.pan.x + this.w) > this.env.w) this.pan.x = this.env.w - this.w;
    if (Math.ceil(this.pan.y + this.h) > this.env.h) this.pan.y = this.env.h - this.h;
    if (Math.floor(this.pan.x) < 0) this.pan.x = 0;
    if (Math.floor(this.pan.y) < 0) this.pan.y = 0;
    this.pan.x = Math.floor(this.pan.x);
    this.pan.y = Math.floor(this.pan.y);
    for (let y = 0; y < this.h; y++) {
      for (let x = 0; x < this.w; x++) {
        let obj = this.env.get(x + this.pan.x, y + this.pan.y);
        if (!obj) {
          this.grid[y][x].src = this.getImg('empty');
        } else if (obj.type == 'brick') {
          this.grid[y][x].src = this.getImg('brick');
        } else if (obj.type == 'block') {
          this.grid[y][x].src = this.getImg('block');
        } else if (obj.type == 'door') {
          this.grid[y][x].src = this.getImg('door');
        } else if (obj.type == 'dude') {
          this.grid[y][x].src = this.getImg('dude' + (obj.facing ? 'Right' : 'Left'));
        } else {
          this.grid[y][x].src = this.imgroot + this.getImg('empty');
        }
      }
    }
  }
}