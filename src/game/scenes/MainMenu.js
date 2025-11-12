import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.add.image(188, 333, 'background'); 

        this.add.image(290, 169, 'logo1');
        this.add.image(125, 251, 'logo2');

        this.add.text(188, 233, 'TIC-TAC-TOE', {
            fontFamily: 'Arial Black', fontSize: 76, color: '#ffffff',
            stroke: '#000000', strokeThickness: 0.5,
            align: 'center'
        }).setOrigin(0.5)
          .setScale(0.5);

         this.add.text(188, 459, 'Pick who goes first.', {
            fontFamily: ' Bold Arial Black', fontSize: 58, color: '#ffffff',
            stroke: '#000000',
            align: 'center'
        }).setOrigin(0.5)
          .setScale(0.5);

        const redButton =  this.add.image(103, 554, 'redstart');
        redButton.setInteractive();
        redButton.on('pointerdown', () => {
            this.scene.start('RedTurn'); 
        });

        const greenButton = this.add.image(272, 554, 'greenstart');
        greenButton.setInteractive();
        greenButton.on('pointerdown', () => {
            this.scene.start('GreenTurn');
        });
    }
    initGame ()
    {
        this.registry.set ('board', [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]);
    }
}