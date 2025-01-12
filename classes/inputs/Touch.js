export class Touch {
  constructor(gameState, stepCallback) {
    this.gameState = gameState;
    this.stepCallback = stepCallback;
    this.downkey = -1;
    this.keyInterval = null;

    // Bind touch handlers
    document.ontouchstart = this.touchstart.bind(this);
    document.ontouchmove = this.touchmove.bind(this);
    document.ontouchend = this.touchend.bind(this);
    document.ongesturestart = e => e.preventDefault();
    document.ongesturechange = e => e.preventDefault();
    document.ongestureend = e => e.preventDefault();
  }

  getTouch(t) {
    return { x: t.screenX, y: t.screenY };
  }

  touchstart(e) {
    if (!e || !e.touches || e.touches.length != 1) return;
    e.preventDefault();
    this.gameState.touch = this.getTouch(e.touches[0]);
  }

  touchToKey(touch) {
    touch = this.getTouch(touch);
    let stouch = this.gameState.touch;
    if (!touch || !stouch) return -1;
    let dx = touch.x - stouch.x;
    let dy = touch.y - stouch.y;
    let rot = ((Math.atan2(dy, dx) * 180.0 / Math.PI) + 360.0) % 360.0;
    let dist = Math.sqrt(dy * dy + dx * dx);
    let tolerance = 15.0;
    let ang = Math.round((rot + 45.0) % 90.0);
    let quad = Math.floor((rot + 45.0) / 90.0) % 4;
    if (dist >= 20.0 && ang > tolerance && ang < 90.0 - tolerance) {
      return [39, 40, 37, 38][quad];
    }
    return -1;
  }

  touchmove(e) {
    if (!e || !e.touches || e.touches.length != 1 || !this.gameState.touch) return;
    e.preventDefault();
    let ndownkey = this.touchToKey(e.touches[0]);
    if (ndownkey != this.downkey) {
      clearInterval(this.keyInterval);
      this.downkey = ndownkey;
      if (ndownkey >= 0) {
        this.stepCallback(ndownkey);
        this.keyInterval = setInterval(() => this.stepCallback(ndownkey), 750);
      }
    }
  }

  touchend(e) {
    e.preventDefault();
    clearInterval(this.keyInterval);
    if (this.downkey >= 0) this.stepCallback(this.downkey);
    this.gameState.touch = null;
    this.downkey = -1;
  }
}