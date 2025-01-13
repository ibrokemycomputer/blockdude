# Block Dude for Web

## Intro/Credits

As with all projects, **a WIP**! I'll be honest, I kinda just lazily migrated things/didn't try to optimize much. See [Issues](https://github.com/ibrokemycomputer/blockdude/issues) for known issues/upcoming feature ideas.

1. The majority of the logic/general structure/classes are all based off of [_Andrew Zich's_ pre-existing web version](https://azich.org/blockdude/). There was no way I was going to recreate this game from scratch, so I'm glad someone did and we can keep it alive and keep building off of it! **Thank you Andrew!**
2. Original developer page (includes links to solutions at the bottom): https://www.detachedsolutions.com/puzzpack/blockdude.php
3. _Texas Instruments_ page (includes link to the original game/official `.8xk` package): https://education.ti.com/en/software/details/en/6AD0564FC779423E90F3BE776F72B5FD/83puzzlepack

## Local Dev

First install... nothing extra! 😉

Just serve the folder as a simple website using your favorite IDE plugin (many people like [LiveServer](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) for VSCode), npm package (`npx serve -L .`), or depending on your OS, a simple built-in python (`python3 -m http.server`) or php (`php -S localhost:8000`) server. The world is your ~~oyster~~ [clam](https://www.youtube.com/watch?v=2lwlllR58y0)!

## Level Editor

I added a level editor! Block Dude is great, but whats an old-school port without the ability for custom maps?

You can view the editor at `/editor` (in `editor.html`).

It's still somewhat a WIP but seems to "basically" work. Im sure there's some optimization to do there. 

There's an option to import a level from its text format, and to export to text format (for dev use) but also to a URL that will dynamically load in a custom level.

After beating a custom level, you have the option to replay (OK) or go to the default first level (CANCEL). This needs better UX.

Note: The "Password Generator" is for "dev use" if they wanted to add a new level to the `#LEVELS` and `#HASHES` in `Levels.js`.

## Level Passwords

- Level 01 - `tcp`
- Level 02 - `ARo`
- Level 03 - `CKs`
- Level 04 - `daN`
- Level 05 - `BAH`
- Level 06 - `Ion`
- Level 07 - `Twe`
- Level 08 - `nTy`
- Level 09 - `iRC`
- Level 10 - `JmK`
- Level 11 - `wTF`

---

> Semi-original documentation listed below

---

Block Dude Documentation
========================

For The Puzzle Pack Version 2.0

Produced By Detached Solutions

Main Developer: Brandon Sterner

Co-Developers: Dan Englender, Jason Kovacs


What is Block Dude?
-------------------
Block Dude is a very challenging puzzle game. You are Block Dude, and your mission is to complete all of the eleven levels in the game. To beat each level you must reach the door, but this is not as easy since the door is not always in a convenient place. There are obstacles in the way such as bricks that are non-moveable and blocks that are moveable, which you can use to your advantage. Block Dude has the ability to pick up and put down one block at a time, and then can climb up and down the blocks and bricks in order to reach the door. His movement is limited to one space at a time however, and he can only climb up and to the left or right in one diagonal space. You must use the blocks to get over columns of bricks, and to build staircases to reach other sets of blocks that will be necessary in your goal of reaching the door in each level. The levels become increasingly harder and more complex to solve, and you will need to use strategy and experimentation with your placement of the blocks in order to solve a level. This fun and entertaining game will keep you addicted and playing until you have beaten all the levels!


Starting the Game
-----------------
When you first start Block Dude, you will see a title screen that shows a Demo of level 1 being played. You can see the solution to that level and the fundamental actions of Block Dude that you must use to solve all of the other levels. On the main menu at the bottom of the screen, you can choose "New" to start a new game from level 1, or "Password" to enter a password that you've already obtained from beating levels previously, in order to jump to a later level quickly. The "Help" menu item will show a screen of brief information about how to play the game, and the "Exit" menu item will return the user to the games list of PuzzPack.


Controls in Block Dude
----------------------
**LEFT/RIGHT:** The Left and Right arrow keys will move Block Dude in those directions accordingly. These keys will only turn Block Dude if he is currently trapped in a space with no open positions to the left or right.

**DOWN KEY:** The Down key will Pick Up a block that Block Dude is facing and standing adjacent to. It will also Put Down a block that he is holding into the open position currently in front of him.

**UP KEY:** The Up key will allow Block Dude to climb up a block or brick that he is current facing and standing adjacent to. This will make him move diagonally up and left or right depending on which direction he is facing.

**2ND KEY:** Hold the 2nd key while pressing the arrow keys in order to scroll the screen and view the layout of the whole level. Release 2nd to return to normal gameplay.

**CLEAR KEY:** The Clear key will quit the current level of Block Dude and bring up a message prompt asking you if you want to Restart the current level or Quit to the title screen.

**DEL KEY:** The Delete key will quit PuzzPack to the TI-OS homescreen, and it will not save the state of the current level in Block Dude. You will have to start from the beginning of a level the next time you play.


Entering A Password
-------------------
From the second item of the main menu in Block Dude, you can enter a password for a level that you've already solved up to. Knowing the password for later levels in the game will allow you to skip those you have already beaten before. A password consists of 3 characters, each having the possibility of being A-Z, a-z, or 0-9. You will select one character at a time, and cannot go back to a previous character of the 3 once you have selected one. Press the Up and Down keys to change the current character. Up will move to the next one, ascending through the uppercase alphabet, then the lowercase alphabet, then numbers, and back to uppercase. The Down key will change to the previous character in the opposite direction as Up. Press the Enter or 2nd key to select the character you are currently showing, and when 3 characters are chosen, the password will be processed. If it matches the passwords for any of the 11 levels, you will be started on that level, else you will start at level 1.

PuzzPack Information
--------------------
Be sure to read the PuzzPack v2.0 Documentation file for more information about this Flash Application that Block Dude is a part of. The background information, general controls, credits & thanks, and contact information for this application can be found in the PuzzPack.txt file.

Copyright 1999-2001 - Detached Solutions
