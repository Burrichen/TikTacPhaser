import { Scene } from 'phaser';

export class Game extends Scene {
    constructor() {
        super('Game');
    }

    init(data) {
        this.currentPlayer = data.startingPlayer === 'green' ? 'circle' : 'cross';
        this.playerImages = { 'circle': 'circle', 'cross': 'cross' };
    }

    create() {
        this.add.image(188, 333, 'background');
        // This is the visual background for your grid. It's just for looks.
        this.add.image(190, 400, 'gameboard');
        this.add.image(190, 400, 'box').setDisplaySize(300,300);

        this.grid = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];

        const boxSize = 120; // The size of a single cell
        const gridWidth = boxSize * 3; // The total width of the 3x3 grid

        // --- FIX 1: Correctly calculate the starting position to center the grid ---
        const startX = this.cameras.main.width / 2 - gridWidth / 2 + boxSize / 2;
        const startY = this.cameras.main.height / 2 - gridWidth / 2 + boxSize / 2 + 60; // Added a slight offset to better match your gameboard image position

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const cellX = startX + col * boxSize;
                const cellY = startY + row * boxSize;

                // --- FIX 2: Use an invisible Zone for interaction instead of a visible 'box' sprite ---
                const zone = this.add.zone(cellX, cellY, boxSize, boxSize).setInteractive();



                zone.on('pointerdown', () => {
                    if (this.grid[row][col] === null) {
                        this.grid[row][col] = this.currentPlayer;

                        const yOffset = 15;
                        const xOffset = 0;
                        const playerImage = this.add.image(zone.x + xOffset, zone.y + yOffset, this.playerImages[this.currentPlayer]);
                        // --- FIX 3: Place the image directly at the zone's center ---
                        // this.add.image(zone.x, zone.y, this.playerImages[this.currentPlayer]);
                        zone.disableInteractive(); 

                        // Switch Turns
                        this.currentPlayer = this.currentPlayer === 'circle' ? 'cross' : 'circle';
                        this.playerTurnText.setText(`Player's Turn: ${this.currentPlayer}`);
                    }
                });
            }
        }

        // --- Display whose turn it is ---
        this.playerTurnText = this.add.text(188, 100, `Player's Turn: ${this.currentPlayer}`, {
            fontFamily: 'Arial Black',
            fontSize: 28,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 1,
            align: 'center'
        }).setOrigin(0.5);

        // --- Example of how to go to the GameOver scene ---
        this.input.keyboard.on('keydown-G', () => {
            this.scene.start('GameOver');
        });
    }
}