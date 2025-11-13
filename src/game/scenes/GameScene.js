class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene'});
    }

    preload() {
        this.load.image('background','assets/background.png');
        this.load.image('gameboard', 'assets/gameboard.png')
        this.load.image('box', 'assets/box.png');
        this.load.image('timer', 'assets/timer.png');
        this.load.image('circle', 'assets/circle.png');        
        this.load.image('cross', 'assets/cross.png');
    }
    create () {
        this.currentPlayer = 0;
        this.gridState = [
            [null, null, null]
            [null, null, null]
            [null, null, null]
        ];
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;      
        this.add.image(190, 400, 'gameboard');

        const boxSize = 120;
        const startX = centreX - boxSize
        const startY = centerY - boxSize

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const x = startX + col * boxSize;
                const y = startY + row * boxSize;
                const zone = this.add.zone (x,y, boxSize, boxSize).setInteractive();
                zone.on('pointerdown', () => this.handlePlayerMove(zone, row, col));
            }
        }
        this.playerTurnText = this.add.text(centerX, 80, '', { fontSize: '48px', color: '#ffffff', fontStyle: 'bold' }).setOrigin(0.5);
        this.timerText = this.add.text(centerX, 150, '', { fontSize: '64px', color: '#ff0000', fontStyle: 'bold' }).setOrigin(0.5);  
               this.turnTimer = this.time.addEvent({
            delay: 5000, // 5 seconds
            callback: this.switchTurn,
            callbackScope: this,
            loop: true
        });

        // Initialize the UI text for the first turn
        this.updatePlayerFocus();
    }

    update() {
        // Continuously update the countdown timer text
        const remainingTime = Math.ceil(5 - this.turnTimer.getElapsedSeconds());
        this.timerText.setText(remainingTime);
    }

    handlePlayerMove(zone, row, col) {
        // Check if the selected cell is already taken
        if (this.gridState[row][col] !== null) {
            console.log('This cell is already taken!');
            return;
        }

        // Determine the texture ('circle' or 'cross') based on the current player
        const texture = this.currentPlayer === 0 ? 'circle' : 'cross';

        // Update the data grid (the model)
        this.gridState[row][col] = this.currentPlayer;

        // Add the visual symbol to the screen (the view)
        this.add.image(zone.x, zone.y, texture);

        // Disable the zone so it can't be clicked again
        zone.disableInteractive();

        // Immediately switch to the next player's turn
        this.switchTurn();
    }

    switchTurn() {
        // Toggle the player (0 becomes 1, 1 becomes 0)
        this.currentPlayer = 1 - this.currentPlayer;

        // Reset the timer for the new player
        this.turnTimer.reset({
            delay: 5000,
            callback: this.switchTurn,
            callbackScope: this,
            loop: true
        });

        // Update the UI to show whose turn it is
        this.updatePlayerFocus();
    }

    updatePlayerFocus() {
        const playerText = `Player ${this.currentPlayer + 1}'s Turn`;
        this.playerTurnText.setText(playerText);
    }
}      