import { Scene } from 'phaser';

export class RedTurn extends Scene
{
    constructor ()
    {
        super('RedTurn');
    }

    create ()
    {
        this.add.image(188, 333, 'background'); 
        this.add.image(190, 400, 'gameboard');
        this.add.image(190, 400, 'box');
        this.add.image(190, 400, 'cross');
        this.add.text(188, 100, "Player 2's Turn", { 
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 1,
            align: 'center'
        }).setOrigin(0.5);

        this.timerCount = 5; 

        this.timerText = this.add.text(188, 200, this.timerCount, { 
            fontFamily: 'Arial Black', fontSize: 48, color: '#ff0000',
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
            this.scene.start('GreenTurn');
        }
    }
}