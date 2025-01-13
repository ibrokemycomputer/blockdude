import { Environment } from './Environment.js';
import { Brick } from '../elements/Brick.js';
import { Block } from '../elements/Block.js';
import { Door } from '../elements/Door.js';
import { Dude } from '../elements/Dude.js';

export class Levels {
  static #LEVELS = [
`
#                  #
#                  #
#                  #
#   #       #      #
#D  #   # B # B U  #
####################`,

`
 #    ##        ##    
 #                #   
##                 #  
#D                  # 
##                   #
 #           #  B    #
 #           #B BBU  #
 #####   #############
     #  B#            
     #####            `,

`
#                 
 #   ############# 
# # #             #
#  #              #
#                B#
#               BB#
# ###    U   #B ## 
# # #    #  #####  
# # #BB ##  #      
#D# ###### ##      
### ##   ###       `,

`
                  #     
                 # #    
       #        #   #   
      # #      #     #  
   ###   #    #       # 
  #       #  #         #
 #         ##          #
 #                    B#
 #                   BB#
 #               U   ###
##    #          #   #  
#D    # B        #####  
##### # B   B  ###      
    # # B # #B #        
    # ##########        
    ###                 `,

`
     ###    ######### 
 ####   ####         #
#                    #
#                    #
#                    #
#     #              #
#     #              #
#     #BBBB          #
#D   #######U        #
## ###     ## #     B#
 # #        # ##   BB#
 # #        # ##  BBB#
 ###        # ########
            ###       `,

`
 ###             ####
 #  #############   #
##                  #
#D                  #
##                  #
 #                BB#
 #BB        #  B  ###
 #BBB       #UBBB #  
 #BBBB      ##### #  
 #####    ###   ###  
     #   B#          
     ## ###          
      ###            `,

`
  #   #####   ##   ###  
 # # #     # #  # #   # 
 #  ##      ##   ##    #
 #   #       #    #    #
 #                    B#
 #                    B#
##                   BB#
#D   B               ###
##   # B     #    ## #  
 #   # B    ## B U####  
 ##  # BBB  ## BBB#     
  #  ###### #######     
  ## #    ###           
   ###                  `,

`
 ###       ####   #######  
#   #     #    # #       # 
#    #   #     ##         #
#B    ###    # #     ###  #
#BB         ##      ## #  #
####       ##          #D #
   ##            ##    ## #
  #    B #      #  #      #
  #    B# #    #   #      #
 #   ###   #    #  #     B#
 #      # #      ##     BB#
#        #           ######
#            B            #
#    B      ###          B#
#   ###                 BB#
#        B       B  U  BBB#
###########################`,

`
        ###         
       #   #        
      #     #  #####
     #       ##    #
    #     B        #
   #      BB      B#
  #       ###    BB#
 #            U ####
#             B    #
#D           ###   #
##    ##   #      B#
 #    ##B  ##   ####
 #    #######  ##   
 ###  #     # ##    
   # ##     ###     
   ###              `,

`
   #####################   
 ##           #         #  
####B       BB#B   BBB B## 
#  ##  #   #####  B### ## #
#   #  ##        ### ###  #
#   ##  ##BBBB            #
#D       #######          #
##        #   ###        ##
 #     B   # #  ##        #
 #     #    #    ##       #
 ####  ##             #####
   #####      U           #
   #          #           #
   #         ##    ########
   #        ##           # 
   #          B         B# 
   #B    ###########   BB# 
   #BB  ##         ## BBB# 
   ######           ###### `,

`
#############################
#  #   #                    #
#     B#BB            ##### #
#B   ### B##     B  ##  D # #
#BB    ###   U  B       # # #
###  BB#     # B          # #
#   ####      #  ###   ###  #
#B            # #      #  B #
#BB       ### # #B    #  ####
#### B   ###  # ##B  # B #  #
#           B ###  B#   #   #
#   B     BB #   ####       #
#    #########        ##### #
#              B   B##    # #
####           B   #    BB# #
#B##   #    #          #### #
##B### #    #   BBB B       #
#B#B#B##    #        BBB    #
#############################`
];

  static #HASHES = [
    '%74%63%70',
    '%41%52%6f',
    '%43%4b%73',
    '%64%61%4e',
    '%42%41%48',
    '%49%6f%6e',
    '%54%77%65',
    '%6e%54%79',
    '%69%52%43',
    '%4a%6d%4b',
    '%77%54%46'
  ];

  static #RHASHES = Levels.#HASHES.reduce((acc, hash, i) => {
    acc[decodeURI(hash)] = i;
    return acc;
  }, {});

  static getLevel(index) {
    return this.#LEVELS[index];
  }

  static getLevelCount() {
    return this.#LEVELS.length;
  }

  static validateHash(hash) {
    return this.#RHASHES[decodeURI(hash)] !== undefined;
  }

  static getLevelByHash(hash) {
    return this.#RHASHES[decodeURI(hash)];
  }

  static makeLevel(str) {
    let elems = new Array();
    let rows = str.split("\n");
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
    if (!levelIndex) levelIndex = 0;
    const levelStr = Levels.getLevel(levelIndex);
    let lvl = Levels.makeLevel(levelStr);
    state.level = levelIndex;
    state.dude = lvl.dude;
    state.env = lvl.env;
    lvl.env.state = state;
    state.iface.setEnvironment(state.env);
    state.iface.setCenter(state.dude);
    state.iface.update();
    let lvlhash = Levels.#HASHES[levelIndex];
    if (levelIndex != 0 && lvlhash) {
      if (window.location.hash != lvlhash) window.location.hash = lvlhash;
    } else {
      if (window.location.hash != '#' && window.location.hash != '') window.location.hash = '';
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

    // Convert the level data into a string format
    const mapStr = levelData.map.map(row =>
      row.map(cell => {
        switch (cell) {
          case 'wall': return '#';
          case 'block': return 'B';
          case 'door': return 'D';
          default: return ' ';
        }
      }).join('')
    ).join('\n');

    // Add the dude and door at their positions
    let rows = mapStr.split('\n');
    const dudeY = levelData.start.y;
    const doorY = levelData.door.y;

    rows[dudeY] = rows[dudeY].substring(0, levelData.start.x) + 'U' +
      rows[dudeY].substring(levelData.start.x + 1);

    rows[doorY] = rows[doorY].substring(0, levelData.door.x) + 'D' +
      rows[doorY].substring(levelData.door.x + 1);

    const finalLevelStr = rows.join('\n');
    const lvl = Levels.makeLevel(finalLevelStr);

    state.level = -1; // Custom level indicator
    state.dude = lvl.dude;
    state.env = lvl.env;
    lvl.env.state = state;

    // Ensure the interface is properly connected
    state.iface.setEnvironment(state.env);
    state.iface.setCenter(state.dude);
    state.env.update(); // Make sure environment is initialized
    state.iface.update();
  }
}
