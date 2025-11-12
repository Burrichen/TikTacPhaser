import { Boot } from './scenes/Boot';
import { Game as MainGame } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';
import { GreenTurn } from './scenes/GreenTurn';
import { RedTurn } from './scenes/RedTurn'; // --- IMPORT THE NEW SCENE ---
import { AUTO, Game } from 'phaser';

// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
    type: AUTO,
    width: 375,
    height: 667,
    parent: 'game-container',
    backgroundColor: '#00033',
    render: {
        antialias: true
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        MainGame,
        GreenTurn,
        RedTurn, 
        GameOver
    ]
};

const StartGame = (parent) => {
    return new Game({ ...config, parent });
}

export default StartGame;