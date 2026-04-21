import {Game} from "phaser";
import {Preloader} from "./Preloader.js";
import {Play} from "./Play.js";

const config = {
    title: "Card memory game",
    type: Phaser.AUTO,
    backgroundColor: "#192a56",
    width: 549,
    height: 480,
    parent: "phaser-container",
    render: {
        pixelArt: true
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Preloader, Play]
};

new Game(config);