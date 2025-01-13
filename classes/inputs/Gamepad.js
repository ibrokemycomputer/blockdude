export class Gamepad {
  static BUTTON_MAPPING = {
    12: 'ArrowUp',    // D-pad Up
    13: 'ArrowDown',  // D-pad Down
    14: 'ArrowLeft',  // D-pad Left
    15: 'ArrowRight', // D-pad Right
    0: 'r',           // A button for reset
    1: 'Shift'        // B button for panning
  };

  constructor(gameState, stepCallback) {
    this.gameState = gameState;
    this.stepCallback = stepCallback;
    this.lastButtonState = new Set();
    this.pollInterval = null;

    // Start polling for gamepad input
    this.startPolling();

    // Handle gamepad connections/disconnections
    window.addEventListener('gamepadconnected', this.onGamepadConnected.bind(this));
    window.addEventListener('gamepaddisconnected', this.onGamepadDisconnected.bind(this));
  }

  startPolling() {
    this.pollInterval = setInterval(() => this.pollGamepad(), 50);
  }

  stopPolling() {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
      this.pollInterval = null;
    }
  }

  onGamepadConnected(e) {
    if (!this.pollInterval) {
      this.startPolling();
    }
  }

  onGamepadDisconnected(e) {
    if (navigator.getGamepads().every(gp => !gp)) {
      this.stopPolling();
    }
  }

  pollGamepad() {
    const gamepads = navigator.getGamepads();
    if (!gamepads) return;

    const gamepad = gamepads[0]; // Use first connected gamepad
    if (!gamepad) return;

    const currentButtons = new Set();

    // Check each button
    gamepad.buttons.forEach((button, index) => {
      if (button.pressed && Gamepad.BUTTON_MAPPING[index]) {
        currentButtons.add(Gamepad.BUTTON_MAPPING[index]);
      }
    });

    // Handle newly pressed buttons
    currentButtons.forEach(key => {
      if (!this.lastButtonState.has(key)) {
        this.stepCallback(key);
      }
    });

    this.lastButtonState = currentButtons;
  }
}
