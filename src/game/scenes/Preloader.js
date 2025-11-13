import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        this.add.image(512, 384, 'background');

        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.image('background','assets/background.png');
        this.load.image('logo1', 'assets/logo1.png');
        this.load.image('logo2', 'assets/logo2.png');
        this.load.image('redstart', 'assets/redstart.png');
        this.load.image('greenstart', 'assets/greenstart.png');
        this.load.image('gameboard', 'assets/gameboard.png')
        this.load.image('box', 'assets/box.png');
        this.load.image('timer', 'assets/timer.png');
        this.load.image('circle', 'assets/circle.png');        
        this.load.image('cross', '/assets/cross.png');
    }

    create ()
    {
        this.scene.start('MainMenu');
    }
}
