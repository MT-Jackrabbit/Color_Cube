			COLOR CUBE - User Story

The game will have two user modes.
1. SOLO MODE - Scramble the cube and try to put all the colors back together.  This round can be timed to see how long it takes to complete the cube.
2. DUEL MODE - There will be two players.  The rounds will be timed (there will be difficulty settings). In the time frame given the player will try to get as many like colors adjacent to one another as possible.  A point will be awarded for each adjacent color. If all colors are adjacent before time expires, then the number of seconds remaining will be added to the score.  The max points allowed, before time bonus, is 54.

The game will allow for the user(s) to input their names.

The game shall keep best score for each player during the session.

The game shall have a difficulty settings of:
	slow: 6 minutes
	medium: 4 minutes
	fast: 2 minutes

The game shall have a RULES page that explains how to play the game selected.

The game shall have a tutorial that will take the user to an external website that walks the user through how to solve the Color Cube.

======================== Game Controls ===================

Each of the corner squares will have two buttons that allow for the row or column of squares to move left, right, up or down.
- These buttons will expand by 30% when hovered over.
- These buttons will be the same color as the square until hovered over.  Then opacity will change to .5
- There will be a total of 8 buttons.

The center square will not change color, unless another face is loaded.

There will be 6 different faces represented, but only one face will be displayed on the board area.
- A small expanded representation (map) of the six faces will be displayed to the user.
- This map will be comprised of 54 individual squares that will change colors as the faces, columns and rows are manipulated on the main board.
- There will be no user interaction on this map. It will be used just so the user can keep track of all six sides.

Right below the PAGE TITLE there shall be two buttons:
- Button one will allow for the user to start the time and depending on the type of game being played it will either start the timer counting up or counting down.
- Button two will allow for the user to scramble the cube.  This might only be displayed during solo play. (NEEDS TO BE DECIDED)

There shall be a banner the displays:
- Player Ones name. (If playing Duel mode - might keep if in Solo mode)
- Player Ones score. (If playing Duel mode)
- Time remaining 0r time passed depending on mode.
- Player Twos name. (If playing Duel mode)
- Player Twos score. (If playing Duel mode)

There shall be a smaller title above the main board that tells what game mode is currently enabled. Default on page load will be SOLO mode.

There shall be a Menu button (represented by 'gear' icon) that will expand a menu when hovered over (or clicked on).  The menu shall contain the following:
- The ability to set the game type (a checkbox menu should popup giving the user the ability to select the game).
- The ability to change the users name (a prompt shall appear allowing for the players names to be typed in).
- The ability to change the difficulty level ( a checkbox menu should popup giving the user the ability to select the difficulty level).
- The ability to display the rules for each game. This will be a separate window that will open and explain the game mode that is currently selected.
- The ability for the user to select a tutorial.  This will direct the user to an outside website that should open in a separate tab. https://www.speedcube.com.au/pages/how-to-solve-a-rubiks-cube

=========================== MVP ===========================

Minimum viable product specification:

All cube functionality shall work:

- Main board square shall change with the corner square buttons be presses.

- Main board will change faces when the arrow buttons are pressed.

- Mini map shall update with the correct colors as the buttons above are pressed.

The difficulty level will be set to slow.

The menu should function and show the options available.
- The rules section of the menu should display the rules.
- The tutorial will redirect the user to an external website.
https://www.speedcube.com.au/pages/how-to-solve-a-rubiks-cube

The scramble cube button should work.

The game mode should default to SOLO mode and all appropriate elements will reflect this mode.

=========================== NICE TO HAVE ===================

All other functionality that will allow for different game modes.

The ability to use the timer functionality and update the banner with the appropriate values.

The ability to calculate the score in DUEL mode and update the score on the banner.

The ability to change the player names and update the names of the banner.

The ability to change the difficulty level.

The Start Time (Start Game) will function properly.
	