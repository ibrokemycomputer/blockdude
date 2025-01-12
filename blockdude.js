import { Levels } from './classes/core/Levels.js';
import { Interface } from './classes/core/Interface.js';
import { Keyboard } from './classes/inputs/Keyboard.js';
import { Touch } from './classes/inputs/Touch.js';
import { Gamepad } from './classes/inputs/Gamepad.js';

let state = {};

export function createGame(container) {
  state.panning = false;
  state.iface = new Interface(null, 18, 12);
  state.iface.render(container);

  // Check for custom level in query params first
  const params = new URLSearchParams(window.location.search);
  const customLevel = params.get('level');
  if (customLevel) {
    try {
      const levelData = JSON.parse(decodeURIComponent(customLevel));
      Levels.loadCustomLevel(state, levelData);
      return;
    } catch (e) {
      console.error('Invalid custom level data:', e);
    }
  }

  // Handle initial hash on page load
  window.location.hash ? processHash() : Levels.setLevel(state, 0);

  // Listen for hash changes
  window.addEventListener('hashchange', processHash);

  // Initialize controllers
  new Keyboard(state, (key) => move(key));
  new Touch(state, (key) => move(key));
  new Gamepad(state, (key) => move(key));
}

function processHash() {
  let pass = window.location.hash;
  if (pass.charCodeAt(0) == 35) {
    pass = pass.substring(1);
  }
  const levelIndex = Levels.getLevelByHash(pass);
  if (levelIndex !== undefined) {
    Levels.setLevel(state, levelIndex);
  }
}

function move(key) {
  if (key < 0) return;

  // Handle reset key regardless of panning
  if (key === Keyboard.KEYS.R) {
    Levels.setLevel(state, state.level || 0);
    return;
  }

  // If panning, move the interface (viewport)
  if (state.panning && state.iface) {
    switch (key) {
      case Keyboard.KEYS.LEFT:
        state.iface.left();
        break;
      case Keyboard.KEYS.RIGHT:
        state.iface.right();
        break;
      case Keyboard.KEYS.UP:
        state.iface.up();
        break;
      case Keyboard.KEYS.DOWN:
        state.iface.down();
        break;
    }
    return;
  }

  // If not panning, move the character
  if (state.dude) {
    switch (key) {
      case Keyboard.KEYS.LEFT:
        state.dude.left();
        break;
      case Keyboard.KEYS.UP:
        state.dude.up();
        break;
      case Keyboard.KEYS.RIGHT:
        state.dude.right();
        break;
      case Keyboard.KEYS.DOWN:
        state.dude.down();
        break;
    }
  }
}
