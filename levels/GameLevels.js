import * as core_01 from './core/01.js';
import * as core_02 from './core/02.js';
import * as core_03 from './core/03.js';
import * as core_04 from './core/04.js';
import * as core_05 from './core/05.js';
import * as core_06 from './core/06.js';
import * as core_07 from './core/07.js';
import * as core_08 from './core/08.js';
import * as core_09 from './core/09.js';
import * as core_10 from './core/10.js';
import * as core_11 from './core/11.js';

import * as community_example from './community/example.js';

export class GameLevels {
  static CORE_LEVELS = [
    core_01.default,
    core_02.default,
    core_03.default,
    core_04.default,
    core_05.default,
    core_06.default,
    core_07.default,
    core_08.default,
    core_09.default,
    core_10.default,
    core_11.default
  ];

  static COMMUNITY_LEVELS = [
    community_example.default
  ];

  static ALL_LEVELS = [...this.CORE_LEVELS, ...this.COMMUNITY_LEVELS];
  
  static LEVEL_HASHES = {};

  static {
    // Initialize level hashes for all levels
    this.ALL_LEVELS.forEach((level, index) => {
      if (level.pass) {
        this.LEVEL_HASHES[level.pass] = index;
      }
    });
  }

  static getLevel(index) {
    return this.ALL_LEVELS[index];
  }

  static getLevelByHash(hash) {
    return this.LEVEL_HASHES[hash];
  }

  static getLevelCount() {
    return this.ALL_LEVELS.length;
  }

  static getCommunityLevel(index) {
    return this.COMMUNITY_LEVELS[index];
  }

  static getCommunityLevelCount() {
    return this.COMMUNITY_LEVELS.length;
  }

  static getCoreLevel(index) {
    return this.CORE_LEVELS[index];
  }

  static getCoreLevelCount() {
    return this.CORE_LEVELS.length;
  }
}