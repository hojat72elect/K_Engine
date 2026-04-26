import {AUTO, Game, Scale, Types} from 'phaser';
import {Preloader} from "./Preloader";
import {UI} from "./UI";
import {Play} from "./Play";
import {Menu} from "./Menu";

const config: Types.Core.GameConfig = {
    type: AUTO,
    width: 640,
    height: 360,
    pixelArt: true,
    parent: 'game-container',
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH
    },
    scene: [Preloader, UI, Play, Menu],
    physics: {
        default: 'arcade',
        arcade: {gravity: {x : 0, y : 2_000}}
    }
};

const StartGame = (parent: string) => {
    return new Game({...config, parent});
}

export default StartGame;
