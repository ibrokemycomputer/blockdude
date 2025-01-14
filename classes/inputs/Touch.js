import { Keyboard } from './Keyboard.js';

export class Touch {
  constructor(gameState, stepCallback) {
    this.gameState = gameState;
    this.stepCallback = stepCallback;
    this.lastEdgeTouch = 0;

    // Bind event handlers
    this.touchStartHandler = this.touchstart.bind(this);
    this.touchMoveHandler = this.touchmove.bind(this);
    this.touchEndHandler = this.touchend.bind(this);
    this.gestureHandler = (e) => e.preventDefault();

    // Add event listeners
    document.addEventListener('touchstart', this.touchStartHandler, { passive: false });
    document.addEventListener('touchmove', this.touchMoveHandler, { passive: false });
    document.addEventListener('touchend', this.touchEndHandler, { passive: false });
    document.addEventListener('gesturestart', this.gestureHandler, { passive: false });
    document.addEventListener('gesturechange', this.gestureHandler, { passive: false });
    document.addEventListener('gestureend', this.gestureHandler, { passive: false });

    // Edge detection configuration
    this.thresholds = {
      inline: {
        start: 0.20,  // left side
        end: 0.20     // right side
      },
      block: {
        start: 0.15,  // top side
        end: 0.15     // bottom side (smaller for block dropping)
      }
    };
    this.EDGE_TOUCH_COOLDOWN = 200; // ms between edge touches

    // Store game container reference
    this.container = document.querySelector('block-dude');
  }

  cleanup() {
    document.removeEventListener('touchstart', this.touchStartHandler);
    document.removeEventListener('touchmove', this.touchMoveHandler);
    document.removeEventListener('touchend', this.touchEndHandler);
    document.removeEventListener('gesturestart', this.gestureHandler);
    document.removeEventListener('gesturechange', this.gestureHandler);
    document.removeEventListener('gestureend', this.gestureHandler);
  }

  getEdgeKey(touch) {
    if (!this.container) return '';

    const bounds = this.container.getBoundingClientRect();
    const relativeX = touch.clientX - bounds.left;
    const relativeY = touch.clientY - bounds.top;
    
    if (relativeX < 0 || relativeX > bounds.width || 
        relativeY < 0 || relativeY > bounds.height) {
      return '';
    }

    // Check edges with threshold structure
    if (relativeX < (bounds.width * this.thresholds.inline.start)) {
      return Keyboard.KEYS.LEFT;
    }
    if (relativeX > (bounds.width * (1 - this.thresholds.inline.end))) {
      return Keyboard.KEYS.RIGHT;
    }
    if (relativeY < (bounds.height * this.thresholds.block.start)) {
      return Keyboard.KEYS.UP;
    }
    if (relativeY > (bounds.height * (1 - this.thresholds.block.end))) {
      return Keyboard.KEYS.DOWN;
    }
    return '';
  }

  touchstart(e) {
    if (!e || !e.touches || e.touches.length != 1) return;
    e.preventDefault();

    const now = Date.now();
    if (now - this.lastEdgeTouch < this.EDGE_TOUCH_COOLDOWN) return;

    const edgeKey = this.getEdgeKey(e.touches[0]);
    if (edgeKey) {
      this.stepCallback(edgeKey);
      this.lastEdgeTouch = now;
    }
  }

  touchmove(e) {
    if (!e || !e.touches || e.touches.length != 1) return;
    e.preventDefault();

    const now = Date.now();
    if (now - this.lastEdgeTouch < this.EDGE_TOUCH_COOLDOWN) return;

    const edgeKey = this.getEdgeKey(e.touches[0]);
    if (edgeKey) {
      this.stepCallback(edgeKey);
      this.lastEdgeTouch = now;
    }
  }

  touchend(e) {
    e.preventDefault();
  }
}