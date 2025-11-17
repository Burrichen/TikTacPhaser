# Tic-Tac-Phaser - Tik-Tac-Toe built in Phaser 3

A classic Tic-Tac-Toe game built from the ground up using the Phaser 3 HTML5 game framework. This project demonstrates core Phaser concepts including scene management, asset loading, user input, and dynamic rendering.


## Features

-   **Classic 3x3 Gameplay**: The timeless game of Tic-Tac-Toe.
-   **Interactive Main Menu**: Players can choose who goes first (Player 1 or Player 2).
-   **Turn-Based System**: The game manages whose turn it is and displays it clearly.
-   **Dynamically Drawn Grid**: The game board is rendered with code, ensuring it is crisp and perfectly centered.
-   **Interactive Cells**: Players can click on empty cells to place their mark.

## Technology Stack

-   **Game Engine**: [Phaser 3](https://phaser.io/)
-   **Language**: JavaScript (ES6)
-   **Build Tool**: Webpack (used by the Phaser 3 project template for bundling and serving)
-   **Server**: Webpack Dev Server

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need to have [Node.js](https://nodejs.org/) and its package manager, npm, installed on your computer. You can download them from the official website.

### Installation & Running

1.  **Clone the repository to your local machine:**
    ```bash
    git clone [https://github.com/your-username/tiktacphaser.git](https://github.com/Burrichen/TikTacPhaser)
    ```

2.  **Navigate into the project directory:**
    ```bash
    cd tiktacphaser
    ```

3.  **Install the necessary dependencies:**
    This command reads the `package.json` file and installs all the required libraries, including Phaser.
    ```bash
    npm install
    ```

4.  **Start the development server:**
    This command will bundle the JavaScript files and launch a local server. Your default web browser should open automatically to the game's address.
    ```bash
    npm start
    ```
    If it doesn't open automatically, you can access the game by navigating to `http://localhost:8080` in your browser.

## Project Structure

The project code is located in the `src/` directory and is organized by scenes for clarity.

```
src/
├── game/
│   ├── main.js           # The main entry point, contains the Phaser game configuration and scene list.
│   └── scenes/
│       ├── Boot.js       # The very first scene, loads essential assets for the preloader.
│       ├── Preloader.js  # Loads all game assets and displays a progress bar.
│       ├── MainMenu.js   # The main menu scene where the player starts the game.
│       ├── Game.js       # The core gameplay scene where the Tic-Tac-Toe match happens.
│       └── GameOver.js   # A placeholder scene for the end of the game.
└── index.js              # Imports and starts the main game logic.
```

## The Development Process

This game was built incrementally, focusing on one piece of functionality at a time.

#### 1. Foundation and Scene Management
The project began by setting up the basic Phaser 3 structure with Webpack. A scene-based architecture was established to separate concerns:
-   `Boot` loads the assets needed for the loading screen.
-   `Preloader` loads all the main game assets (`circle`, `cross`, backgrounds, etc.).
-   `MainMenu` provides the initial user interaction to start the game.
-   `Game` contains the primary game logic.

This creates a clean flow from starting the application to playing the game.

#### 2. Building an Interactive Grid
The most crucial part of the game is the 3x3 grid. The development for this went through a key iteration:
-   **Initial Idea (Incorrect)**: The first attempt involved using a single `'box.png'` image for each of the nine cells. This proved difficult for alignment and was inefficient.
-   **Final Implementation (Correct)**: The better solution was to draw the grid dynamically using a `Phaser.GameObjects.Graphics` object. This allowed for precise control over the line thickness, color, and positioning. On top of this visual grid, a grid of invisible `Phaser.GameObjects.Zone` objects was created. These zones are responsible for detecting player clicks without interfering with the visuals.

#### 3. Implementing Gameplay Logic
With the board in place, the core game logic was added to `Game.js`:
-   A 2D array, `this.grid`, was created to represent the state of the game board.
-   A `currentPlayer` variable tracks whose turn it is.
-   An `on('pointerdown')` event listener is attached to each interactive zone. When a player clicks a zone, the code checks if the cell is empty.
-   If it is, the `this.grid` array is updated, the player's mark ('circle' or 'cross') is drawn on the screen, and the turn is passed to the next player.

#### 4. Polishing and Refinement
The final steps involved fine-tuning the user experience:
-   **Scaling**: The `.setScale()` method was used to ensure the circle and cross images were a suitable size for the grid cells.
-   **Positioning**: To perfect the layout, small offsets were added to the grid's position to move it from the exact center of the screen, achieving a more visually appealing layout. Further offsets were used on the player marks to centralize them within their cells.
