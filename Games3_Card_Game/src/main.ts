import {Preloader} from './Preloader.ts';
import {Play} from './Play';
import {AUTO, Game, Scale} from 'phaser';

const config = {
    title: 'Card Memory Game',
    type: AUTO,
    width: 549,
    height: 480,
    parent: 'game-container',
    backgroundColor: '#192a56',
    pixelArt: true,
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH
    },
    scene: [
        Preloader,
        Play
    ]
};

new Game(config);
