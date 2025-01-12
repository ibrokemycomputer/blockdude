import { Environment } from './Environment.js';
import { Brick } from '../elements/Brick.js';
import { Block } from '../elements/Block.js';
import { Door } from '../elements/Door.js';
import { Dude } from '../elements/Dude.js';

export class Levels {
  static #LEVELS = [
    "#                  #\n" +
    "#                  #\n" +
    "#                  #\n" +
    "#   #       #      #\n" +
    "#D  #   # B # B U  #\n" +
    "####################",

    " #    ##        ##    \n" +
    " #                #   \n" +
    "##                 #  \n" +
    "#D                  # \n" +
    "##                   #\n" +
    " #           #  B    #\n" +
    " #           #B BBU  #\n" +
    " #####   #############\n" +
    "     #  B#            \n" +
    "     #####            ",

    " #                 \n" +
    " #   ############# \n" +
    "# # #             #\n" +
    "#  #              #\n" +
    "#                B#\n" +
    "#               BB#\n" +
    "# ###    U   #B ## \n" +
    "# # #    #  #####  \n" +
    "# # #BB ##  #      \n" +
    "#D# ###### ##      \n" +
    "### ##   ###       ",

    "                  #     \n" +
    "                 # #    \n" +
    "       #        #   #   \n" +
    "      # #      #     #  \n" +
    "   ###   #    #       # \n" +
    "  #       #  #         #\n" +
    " #         ##          #\n" +
    " #                    B#\n" +
    " #                   BB#\n" +
    " #               U   ###\n" +
    "##    #          #   #  \n" +
    "#D    # B        #####  \n" +
    "##### # B   B  ###      \n" +
    "    # # B # #B #        \n" +
    "    # ##########        \n" +
    "    ###                 ",

    "     ###    ######### \n" +
    " ####   ####         #\n" +
    "#                    #\n" +
    "#                    #\n" +
    "#                    #\n" +
    "#     #              #\n" +
    "#     #              #\n" +
    "#     #BBBB          #\n" +
    "#D   #######U        #\n" +
    "## ###     ## #     B#\n" +
    " # #        # ##   BB#\n" +
    " # #        # ##  BBB#\n" +
    " ###        # ########\n" +
    "            ###       ",

    " ###             ####\n" +
    " #  #############   #\n" +
    "##                  #\n" +
    "#D                  #\n" +
    "##                  #\n" +
    " #                BB#\n" +
    " #BB        #  B  ###\n" +
    " #BBB       #UBBB #  \n" +
    " #BBBB      ##### #  \n" +
    " #####    ###   ###  \n" +
    "     #   B#          \n" +
    "     ## ###          \n" +
    "      ###            ",

    "  #   #####   ##   ###  \n" +
    " # # #     # #  # #   # \n" +
    " #  ##      ##   ##    #\n" +
    " #   #       #    #    #\n" +
    " #                    B#\n" +
    " #                    B#\n" +
    "##                   BB#\n" +
    "#D   B               ###\n" +
    "##   # B     #    ## #  \n" +
    " #   # B    ## B U####  \n" +
    " ##  # BBB  ## BBB#     \n" +
    "  #  ###### #######     \n" +
    "  ## #    ###           \n" +
    "   ###                  ",

    " ###       ####   #######  \n" +
    "#   #     #    # #       # \n" +
    "#    #   #     ##         #\n" +
    "#B    ###    # #     ###  #\n" +
    "#BB         ##      ## #  #\n" +
    "####       ##          #D #\n" +
    "   ##            ##    ## #\n" +
    "  #    B #      #  #      #\n" +
    "  #    B# #    #   #      #\n" +
    " #   ###   #    #  #     B#\n" +
    " #      # #      ##     BB#\n" +
    "#        #           ######\n" +
    "#            B            #\n" +
    "#    B      ###          B#\n" +
    "#   ###                 BB#\n" +
    "#        B       B  U  BBB#\n" +
    "###########################",

    "        ###         \n" +
    "       #   #        \n" +
    "      #     #  #####\n" +
    "     #       ##    #\n" +
    "    #     B        #\n" +
    "   #      BB      B#\n" +
    "  #       ###    BB#\n" +
    " #            U ####\n" +
    "#             B    #\n" +
    "#D           ###   #\n" +
    "##    ##   #      B#\n" +
    " #    ##B  ##   ####\n" +
    " #    #######  ##   \n" +
    " ###  #     # ##    \n" +
    "   # ##     ###     \n" +
    "   ###              ",

    "   #####################   \n" +
    " ##           #         #  \n" +
    "####B       BB#B   BBB B## \n" +
    "#  ##  #   #####  B### ## #\n" +
    "#   #  ##        ### ###  #\n" +
    "#   ##  ##BBBB            #\n" +
    "#D       #######          #\n" +
    "##        #   ###        ##\n" +
    " #     B   # #  ##        #\n" +
    " #     #    #    ##       #\n" +
    " ####  ##             #####\n" +
    "   #####      U           #\n" +
    "   #          #           #\n" +
    "   #         ##    ########\n" +
    "   #        ##           # \n" +
    "   #          B         B# \n" +
    "   #B    ###########   BB# \n" +
    "   #BB  ##         ## BBB# \n" +
    "   ######           ###### ",

    "#############################\n" +
    "#  #   #                    #\n" +
    "#     B#BB            ##### #\n" +
    "#B   ### B##     B  ##  D # #\n" +
    "#BB    ###   U  B       # # #\n" +
    "###  BB#     # B          # #\n" +
    "#   ####      #  ###   ###  #\n" +
    "#B            # #      #  B #\n" +
    "#BB       ### # #B    #  ####\n" +
    "#### B   ###  # ##B  # B #  #\n" +
    "#           B ###  B#   #   #\n" +
    "#   B     BB #   ####       #\n" +
    "#    #########        ##### #\n" +
    "#              B   B##    # #\n" +
    "####           B   #    BB# #\n" +
    "#B##   #    #          #### #\n" +
    "##B### #    #   BBB B       #\n" +
    "#B#B#B##    #        BBB    #\n" +
    "#############################"
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
    if ((state.level || 0) + 1 >= Levels.getLevelCount()) {
      alert("Congratulations! You've completed all levels!");
      state.level = -1;
    }
    return Levels.setLevel(state, (state.level || 0) + 1);
  }
}
