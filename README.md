# snake.io

An attempt to make something similar to Slither.io in Js  from scratch.

## Demo
https://bibhuticoder.github.io/snake.io

## todos
- basic game components i.e menu, game-over-message etc.
- game background
- Smarter AI
- Fix map
- foods animation

---

# Behind the hood

Here I will try to explain how its made. So, its  a clone of a popular game 
Slither.io (http://slither.io/) but its made in JS entirely from scratch. All the graphics  as seen on the demo are vector drawings.

### Files
- **index.html** : Contains 3 canvases. Each for Snakes, food & background.
- **script.js** : handles mouse events and handles core game rendering.
- **Game.js** : Contains all the components of game i.e snakes, foods
- **Snake.js** : Logic for basic snake movement, food-collission etc.
- **Snakeai.js** : Child of Snake.js. Extra AI movement logic
- **Food.js** : code for animating and moving foods
- **util.js** : Contains all utility functions 

### Core concepts

- The player is constant and the rest of the things(aiSnakes, foods) are moving
  
  ![Alt text](/canvas.png)
  

- the player moves to the direction of cursor on mousemove

  ![Alt text](/snake.png)
