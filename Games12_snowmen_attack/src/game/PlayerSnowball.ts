import Sprite = Phaser.Physics.Arcade.Sprite;
import {MainGame} from "./MainGame.ts";

export class PlayerSnowball extends Sprite {

    constructor(scene: MainGame, x: number, y: number, key: string, frame: string) {
        super(scene, x, y, key, frame);

        this.setScale(0.5);
    }

    fire(x: number, y: number) {
        this.body!.enable = true;
        this.body!.reset(x + 10, y - 44);

        this.setActive(true);
        this.setVisible(true);

        this.setVelocityX(-600);
        this.setAccelerationX(-1400);
    }

    stop() {
        this.setActive(false);
        this.setVisible(false);

        this.setVelocityX(0);

        this.body!.enable = false;
        return this;
    }

    preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta);

        if (this.x <= -64) {
            this.stop();
        }
    }
}
