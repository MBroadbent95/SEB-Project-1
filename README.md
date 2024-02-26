# General Assembly

Raging Tauros is a game with the space invaders template. You must stop an approaching herd of Tauros by capturing them with pokeballs.
The herd will move towards one side of the screen in unison, then when they reach the side, will take once pace forward and then move to the other side, repeating until they reach your position at the bottom of the screen. If the herd of Tauros reaches the player, it is Game Over!
Periodically, a random Tauros will shoot a concentrated blast of pure rage at you, the player will lose one life if this connects with the player.
If a player loses all of their lives, it is Game Over!

## Game's Link

 Raging Tauros (https://mbroadbent95.github.io/SEB-Project-1/)

 ## Overview and concept

 I was tasked to build my own version of Space Invaders game from scratch using HTML, CSS & JavaScript.

 ## Technologies Used

 ### HTML

- Head containing game title, links to styleSheet, favicon icon, and JavaScript link.
- Body includes grid for gameplay. Additionally, you will find the lives and score display. At the bottom of the page/ HTML you will find 3 buttons, start, reset, & mute. Control instructions follow beneath these buttons.

 ### CSS

- Flexbox to guide the structure of my JavaScript grid.
- Various styling tags disseminated via class & ID for precision styling.
- Images and colours to convey key themes, tone and and feel of the page.
- image classes to be added and removed from cells upon function. This is to display the player character, the Tauros(aliens) and their respective projectiles.

 ### JavaScript

 - new Audio to import my sounds from my relative sounds folder. new Audio inludes sound effects for various actions you can take in the game as well as background music.
 - setInterval to time specific events and functions and create a dynamic experience.
 - playerScore system to track and accumulate points, then to be stored on your browser's local starage.
 - arrayMethods to quickly draw up a herd of Tauros, then manipulate them as instructed.
 - create grid for loop, this created a dynamic grid which could be created and adjusted as necessary.
 - classList functions, adding and removing classes to cells in order to manipulate player and Tauros movement.
 - mute button function to allow players to turn off/ on the background audio respectively.
 - Keydown events to allow player control of their avatar.
 - setTimeout to alert the player of their score once the game finishes.

## The Approach Taken

- Throughout my project journey i kept a small diary of my plans, progress and blocks. We were assigned out projects on Thursday 15-02-24 to start on the following day and finish for the next Friday. This will be a brief overview.
- Day 1 Friday -
- Project planning and establishment of basic boilerplate. I had a rough roadmap of what i needed to accomplish each day and wanted to give myself as much time as possible to collide with JavaScript.
- As such Day 1 was basic, HTML and CSS, grid creation via DOM & CSS, player avatar creation, and movement.
- Weekend -
- Resource assets for my anticipated images and sounds, this always takes longer than expected a couple of hours on the weekend will go miles, even for placeholders.
- Day 2 Monday -
- Create single alien avatar & be able to shoot it with player projectile. if that goes well, we will attempt to program an alien horde.
- Day 3 Tuesday -
- Be able to randomly select an alien to drop a bomb. Program alien movement in unison and define a game over/ loss condition.
- Day 4 Wednesday -
- Program an array filter method for the horde of aliens. Define a win condition & debugging.
- Day 5 Thursday -
- Debugging & theme implementation. Sound effect and background music programming -
- Day 6 Friday -
- Last minute features, favicon & README write up.

  ### When loading the Page:



  ### When the Game starts:



  ### When the player avatar moves:



  ### Key Learnings:

- Using console log to accurately diagnose which parts of my programming were executing and which were not. I have understood how incredibly useful console log is here.
- The importance of dry coding/ planning & thinking through the problem. I managed to get so much more done when i gave myself the time to dry code and iterate through my plan, this was essential in keeping a good pace and achieving my targets sometimes even ahead of schedule.
- Do not overcomplicate the code, if it is too long is is probably wrong. My code must be ledgable and as easy to understand as possible, this will make the debugging process much easier and let me keep my hair.
- setInterval is one of the most useful functions imaginable.
- There is a limit to how much you can push to GitHub.

  ### Challenges:

- Programming removeBomb correctly. I experienced an issue that tried to execute it again after the game had finished which caused an issue with the browser.
- Tauros herd programming/ array methods. It was tricky to get my head around the best ways to programme the Tauros herd using array methods.some and calculating their relative position.


  ### Future Improvements:

- Level System: Additional levels with scaling difficulty, the Tauros would move faster, give you less points and maybe even fire faster.
- Overlay before you start the game explaining the rules and concept.
- Dyamic Alert/ Overlay pages.
- Soft coded player boundaries.


  ### Bugs:

- Background music does not restart upon pressing reset button, only continues where it left off.

  
