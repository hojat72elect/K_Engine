import Phaser from 'phaser';
import Preloader from './Preloader';
import MainMenu from './MainMenu';
import MainGame from './Game';
import Boot from "./Boot";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    parent: 'phaser-example',
    scene: [Boot, Preloader, MainMenu, MainGame],
    physics: {
        default: 'arcade',
        arcade: {debug: false}
    }
};

new Phaser.Game(config);
