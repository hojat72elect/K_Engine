import Snowman from './Snowman.js';
import {PlayerSnowball} from './PlayerSnowball.js';
import {EnemySnowball} from './EnemySnowball.ts';
import {MainGame} from "./MainGame.ts";
import ImageWithDynamicBody=Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
import Group = Phaser.Physics.Arcade.Group;
import Collider=Phaser.Physics.Arcade.Collider;

export class Track {

    scene: MainGame;
    id: number;
    y: number;
    nest: ImageWithDynamicBody;
    snowmanBig: Snowman;
    snowmanSmall: Snowman;
    playerSnowballs: Group;
    enemySnowballs: Group;
    snowBallCollider: Collider;
    snowmanSmallCollider: Collider;
    snowmanBigCollider: Collider;
    // releaseTimerSmall: Phaser.Time.TimerEvent;
    // releaseTimerBig: Phaser.Time.TimerEvent;

    constructor(scene: MainGame, id: number, trackY: number) {
        this.scene = scene;
        this.id = id;
        this.y = trackY;

        this.nest = scene.physics.add.image(1024, trackY - 10, 'sprites', 'nest').setOrigin(1, 1);

        this.snowmanBig = new Snowman(scene, this, 'Big');
        this.snowmanSmall = new Snowman(scene, this, 'Small');

        this.playerSnowballs = scene.physics.add.group({
            frameQuantity: 8,
            key: 'sprites',
            frame: 'snowball2',
            active: false,
            visible: false,
            classType: PlayerSnowball
        });

        this.enemySnowballs = scene.physics.add.group({
            frameQuantity: 8,
            key: 'sprites',
            frame: 'snowball3',
            active: false,
            visible: false,
            classType: EnemySnowball
        });

        this.snowBallCollider = scene.physics.add.overlap(this.playerSnowballs, this.enemySnowballs, this.hitSnowball, undefined, this);
        this.snowmanSmallCollider = scene.physics.add.overlap(this.snowmanSmall, this.playerSnowballs, this.hitSnowman, undefined, this);
        this.snowmanBigCollider = scene.physics.add.overlap(this.snowmanBig, this.playerSnowballs, this.hitSnowman, undefined, this);

        this.releaseTimerSmall;
        this.releaseTimerBig;
    }

    start(minDelay, maxDelay) {
        const delay = Phaser.Math.Between(minDelay, maxDelay);

        this.releaseTimerSmall = this.scene.time.addEvent({

            delay: delay,

            callback: () => {
                this.snowmanSmall.start();
            }
        });

        this.releaseTimerBig = this.scene.time.addEvent({

            delay: delay * 3,

            callback: () => {
                this.snowmanBig.start();
            }
        });
    }

    stop() {
        this.snowmanSmall.stop();
        this.snowmanBig.stop();

        for (let snowball of this.playerSnowballs.getChildren()) {
            snowball.stop();
        }

        for (let snowball of this.enemySnowballs.getChildren()) {
            snowball.stop();
        }

        this.releaseTimerSmall.remove();
        this.releaseTimerBig.remove();
    }

    hitSnowball(ball1, ball2) {
        ball1.stop();
        ball2.stop();
    }

    hitSnowman(snowman, ball) {
        if (snowman.isAlive && snowman.x > 0) {
            ball.stop();
            snowman.hit();
        }
    }

    throwPlayerSnowball(x) {
        let snowball = this.playerSnowballs.getFirstDead(false);

        if (snowball) {
            snowball.fire(x, this.y);
        }
    }

    throwEnemySnowball(x) {
        let snowball = this.enemySnowballs.getFirstDead(false);

        if (snowball) {
            snowball.fire(x, this.y);
        }
    }
}
