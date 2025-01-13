export class Interface {
  #canvas;
  #ctx;
  #imageCache = {};
  #loadedImages = 0;
  #totalImages = 0;
  
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
    this.imgroot = 'images/';
    this.images = {
      'empty': 'empty',
      'dudeLeft': 'dudeLeft',
      'dudeRight': 'dudeRight',
      'block': 'block',
      'brick': 'brick',
      'door': 'door'
    };

    // Create canvas
    this.#canvas = document.createElement('canvas');
    this.#canvas.width = this.w * this.cw;
    this.#canvas.height = this.h * this.ch;
    this.#ctx = this.#canvas.getContext('2d');

    this.setEnvironment(this.env);
    this.preload();
  }

  preload() {
    this.#totalImages = Object.keys(this.images).length;
    for (let k in this.images) {
      const img = new Image();
      img.onload = () => {
        this.#loadedImages++;
        if (this.#loadedImages === this.#totalImages) {
          this.update(); // Initial render once all images are loaded
        }
      };
      img.src = this.getImg(k);
      this.#imageCache[k] = img;
    }
  }

  getImg(k) {
    return this.imgroot + this.images[k] + '.svg';
  }

  render(c) {
    if (!c) c = document.body;
    c.appendChild(this.#canvas);
    c.style.width = `${this.w * this.cw}px`;
    c.style.height = `${this.h * this.ch}px`;
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
    if (!this.pan || !this.panning) {
      this.pan = { 'x': c.x - this.w / 2.0, 'y': c.y - this.h / 2.0 };
    }
    
    // Boundary checks
    if (Math.ceil(this.pan.x + this.w) > this.env.w) this.pan.x = this.env.w - this.w;
    if (Math.ceil(this.pan.y + this.h) > this.env.h) this.pan.y = this.env.h - this.h;
    if (Math.floor(this.pan.x) < 0) this.pan.x = 0;
    if (Math.floor(this.pan.y) < 0) this.pan.y = 0;
    this.pan.x = Math.floor(this.pan.x);
    this.pan.y = Math.floor(this.pan.y);

    // Clear canvas
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

    // Draw game elements
    for (let y = 0; y < this.h; y++) {
      for (let x = 0; x < this.w; x++) {
        const obj = this.env.get(x + this.pan.x, y + this.pan.y);
        let imageName = 'empty';

        if (obj) {
          switch (obj.type) {
            case 'brick': imageName = 'brick'; break;
            case 'block': imageName = 'block'; break;
            case 'door': imageName = 'door'; break;
            case 'dude': imageName = 'dude' + (obj.facing ? 'Right' : 'Left'); break;
          }
        }

        if (this.#imageCache[imageName]?.complete) {
          this.#ctx.drawImage(
            this.#imageCache[imageName],
            x * this.cw,
            (this.h - y - 1) * this.ch,
            this.cw,
            this.ch
          );
        }
      }
    }
  }
}