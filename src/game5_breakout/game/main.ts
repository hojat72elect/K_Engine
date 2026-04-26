import { WEBGL, Game, Scale} from 'phaser';
import {Breakout} from "./scenes/breakout";

const config = {
    type: WEBGL,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH
    },
    scene: [
        Breakout
    ],
    physics:{
        default: 'arcade'
    }
};

const StartGame = (parent: string) => {
    return new Game({ ...config, parent });
}

export default StartGame;
