import { Scene } from 'phaser';

export class GreenTurn extends Scene
{
    constructor ()
    {
        super('GreenTurn');
    }

    create ()
    {

        this.add.image(188, 333, 'background'); 
        this.add.image(190, 400, 'gameboard');
        this.add.image(190, 400, 'box');

        this.add.text(188, 100, "Player 1's Turn", { // Centered Text
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 1,
            align: 'center'
        }).setOrigin(0.5);

        this.timerCount = 5; 

        this.timerText = this.add.text(188, 200, this.timerCount, { 
            fontFamily: 'Arial Black', fontSize: 48, color: '#00ff00',
            stroke: '#000000', strokeThickness: 2
        }).setOrigin(0.5);


        this.time.addEvent({
            delay: 1000,
            callback: this.onTimerTick,
            callbackScope: this,
            loop: true
        });
    }

    onTimerTick ()
    {
        this.timerCount--;
        this.timerText.setText(this.timerCount);

        if (this.timerCount <= 0)
        {
            this.time.removeAllEvents();
            this.scene.start('RedTurn');
        }
    }
}