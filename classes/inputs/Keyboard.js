export class Keyboard {
  static KEYS = {
    SHIFT: 'Shift',
    LEFT: 'ArrowLeft',
    UP: 'ArrowUp',
    RIGHT: 'ArrowRight',
    DOWN: 'ArrowDown',
    R: 'r'
  };

  #keydownHandler;
  #keyupHandler;

  constructor(gameState, stepCallback) {
    this.gameState = gameState;
    this.stepCallback = stepCallback;
    this.downkey = -1;
    this.keyInterval = null;
    this.pressedKeys = new Set();

    this.#keydownHandler = (e) => this.keydown(e);
    this.#keyupHandler = (e) => this.keyup(e);

    // Bind event handlers
    document.addEventListener('keydown', this.#keydownHandler);
    document.addEventListener('keyup', this.#keyupHandler);
  }

  keydown(e) {
    const key = e.key;

    // Track pressed keys and update global state
    this.pressedKeys.add(key);
    this.updateGameState();

    // Handle shift key for panning mode
    if (key === Keyboard.KEYS.SHIFT) {
      return;
    }

    // Don't start new interval if shift is held
    if (this.pressedKeys.has(Keyboard.KEYS.SHIFT)) {
      this.stepCallback(key);
      return;
    }

    // Normal key handling
    this.downkey = key;
    this.stepCallback(this.downkey);
    clearInterval(this.keyInterval);
    this.keyInterval = setInterval(() => this.stepCallback(this.downkey), 200);
  }

  keyup(e) {
    const key = e.key;
    this.pressedKeys.delete(key);
    this.updateGameState();

    // Only clear interval if it's the current down key and shift isn't pressed
    if (key === this.downkey && !this.pressedKeys.has(Keyboard.KEYS.SHIFT)) {
      this.downkey = -1;
      clearInterval(this.keyInterval);
    }
  }

  updateGameState() {
    const wasPanning = this.gameState.panning;
    this.gameState.panning = this.pressedKeys.has(Keyboard.KEYS.SHIFT);

    // Center the interface when panning is disabled
    if (!this.gameState.panning && this.gameState.iface) {
      this.gameState.iface.center();
    }
  }

  cleanup() {
    document.removeEventListener('keydown', this.#keydownHandler);
    document.removeEventListener('keyup', this.#keyupHandler);
  }
}