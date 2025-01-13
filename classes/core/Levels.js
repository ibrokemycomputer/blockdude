import { Environment } from './Environment.js';
import { Brick } from '../elements/Brick.js';
import { Block } from '../elements/Block.js';
import { Door } from '../elements/Door.js';
import { Dude } from '../elements/Dude.js';
import { GameLevels } from '../../levels/GameLevels.js';

export class Levels {
  static getLevel(index) {
    return GameLevels.getLevel(index);
  }

  static getLevelCount() {
    return GameLevels.getLevelCount();
  }

  static validateHash(hash) {
    return GameLevels.getLevelByHash(hash) !== undefined;
  }

  static getLevelByHash(hash) {
    return GameLevels.getLevelByHash(hash);
  }

  static makeLevel(levelData) {
    if (!levelData?.data || typeof levelData.data !== 'string') {
      console.error('Invalid level data:', levelData);
      // Return a basic empty level as fallback
      return this.makeLevel({
        data: '####\n#U #\n####'
      });
    }

    let elems = new Array();
    let rows = levelData.data.trim().split("\n");
    let mcols = 0;
    for (let r = 0; r < rows.length; r++) {
      if (rows[r].length > mcols) {
        mcols = rows[r].length;
      }
    }
    let env = new Environment(mcols, rows.length);

    // Ensure state is properly initialized
    if (!env.state) {
      env.state = {
        env: env,
        level: 0,
        completed: 0,
        iface: null
      };
    }

    let dude;
    for (let r = 0; r < rows.length; r++) {
      let y = rows.length - r - 1;
      let chars = rows[r].split("");
      for (let x = 0; x < chars.length; x++) {
        let o;
        if (chars[x] == '#') {
          o = new Brick(env, x, y);
        } else if (chars[x] == 'U' || chars[x] == 'u') {
          if (!dude) {
            dude = new Dude(env, x, y, (chars[x] == 'U')); o = dude;
          }
        } else if (chars[x] == 'B') {
          o = new Block(env, x, y);
        } else if (chars[x] == 'D') {
          o = new Door(env, x, y);
        }
        if (o) elems[elems.length] = o;
      }
    }
    return { 'env': env, 'elements': elems, 'dude': dude };
  }

  static setLevel(state, levelIndex) {
    if (levelIndex === undefined || levelIndex === null) levelIndex = 0;
    const levelData = GameLevels.getLevel(levelIndex);
    if (!levelData) {
      console.error('No level data found for index:', levelIndex);
      levelIndex = 0;
      levelData = GameLevels.getLevel(0);
    }

    let lvl = this.makeLevel(levelData);
    state.level = levelIndex;
    state.dude = lvl.dude;
    state.env = lvl.env;
    lvl.env.state = state;
    
    if (state.iface) {
      state.iface.setEnvironment(state.env);
      state.iface.setCenter(state.dude);
      state.iface.update();
    }

    const hash = levelData.pass;
    if (levelIndex !== 0 && hash) {
      if (window.location.hash !== `#${hash}`) {
        window.location.hash = hash;
      }
    } else if (window.location.hash !== '#' && window.location.hash !== '') {
      window.location.hash = '';
    }
  }

  static nextLevel(state) {
    state.completed = (state.completed || 0) + 1;

    if (state.level === -1) {  // Custom level
      if (confirm('Level Complete! Would you like to play again?')) {
        return Levels.loadCustomLevel(state, state.customLevelData);
      } else {
        // Delete custom level query param
        window.history.replaceState({}, document.title, window.location.pathname);
        // Return to main game if they don't want to replay
        return Levels.setLevel(state, 0);
      }
    }

    if ((state.level || 0) + 1 >= Levels.getLevelCount()) {
      alert("Congratulations! You've completed all levels!");
      state.level = -1;
    }
    return Levels.setLevel(state, (state.level || 0) + 1);
  }

  static loadCustomLevel(state, levelData) {
    if (!levelData || !levelData.map || !levelData.start || !levelData.door) {
      throw new Error('Invalid level data format');
    }

    // Create a level object in the format makeLevel expects
    const levelObj = {
      data: levelData.map.map(row => row.join('')).join('\n')
    };

    const lvl = Levels.makeLevel(levelObj);

    state.level = -1; // Custom level indicator
    state.dude = lvl.dude;
    state.env = lvl.env;
    state.customLevelData = levelData; // Store for replay
    lvl.env.state = state;

    if (state.iface) {
      state.iface.setEnvironment(state.env);
      state.iface.setCenter(state.dude);
      state.env.update();
      state.iface.update();
    }
  }
}
