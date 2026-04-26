import Sprite = Phaser.Physics.Arcade.Sprite;
import Key = Phaser.Input.Keyboard.Key;
import {MainGame} from "./MainGame";
import {Track} from "./Track";

export class Player extends Sprite {

    isAlive = true;
    isThrowing = false;
    currentTrack: Track;
    sound: Phaser.Sound.NoAudioSoundManager | Phaser.Sound.HTML5AudioSoundManager | Phaser.Sound.WebAudioSoundManager;
    spacebar: Key;
    up: Key;
    down: Key;

    constructor(scene: MainGame, track: Track) {

        super(scene, 900, track.y, 'sprites', 'idle000');

        this.setOrigin(0.5, 1);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.sound = scene.sound;
        this.currentTrack = track;

        this.spacebar = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.up = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.down = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        this.play('idle');
    }

    start() {
        this.isAlive = true;
        this.isThrowing = false;

        this.currentTrack = (this.scene as MainGame).tracks[0]!;
        this.y = this.currentTrack.y;

        this.on('animationcomplete-throwStart', this.releaseSnowball, this);
        this.on('animationcomplete-throwEnd', this.throwComplete, this);

        this.play('idle', true);
    }

    moveUp() {
        if (this.currentTrack.id === 0) {
            this.currentTrack = (this.scene as MainGame).tracks[3]!;
        } else {
            this.currentTrack = (this.scene as MainGame).tracks[this.currentTrack.id - 1]!;
        }

        this.y = this.currentTrack.y;

        this.sound.play('move');
    }

    moveDown() {
        if (this.currentTrack.id === 3) {
            this.currentTrack = (this.scene as MainGame).tracks[0]!;
        } else {
            this.currentTrack = (this.scene as MainGame).tracks[this.currentTrack.id + 1]!;
        }

        this.y = this.currentTrack.y;

        this.sound.play('move');
    }

    throw() {
        this.isThrowing = true;

        this.play('throwStart');

        this.sound.play('throw');
    }

    releaseSnowball() {
        this.play('throwEnd');

        this.currentTrack.throwPlayerSnowball(this.x);
    }

    throwComplete() {
        this.isThrowing = false;

        this.play('idle');
    }

    stop() {
        this.isAlive = false;

        this.body!.stop();

        this.play('die');
        return this;
    }

    preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta);

        if (!this.isAlive) {
            return;
        }

        if (Phaser.Input.Keyboard.JustDown(this.up)) {
            this.moveUp();
        } else if (Phaser.Input.Keyboard.JustDown(this.down)) {
            this.moveDown();
        } else if (Phaser.Input.Keyboard.JustDown(this.spacebar) && !this.isThrowing) {
            this.throw();
        }
    }
}
