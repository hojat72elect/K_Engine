import {Math} from 'phaser';
import StaticGroup = Phaser.Physics.Arcade.StaticGroup;

export class TomatoItem extends StaticGroup {

    constructor(config: any) {
        super(config.physicsWorld, config.scene);
        this.addTomatoItem();
    }

    addTomatoItem() {
        this.create(
            Math.Between(50, this.scene.scale.width - 50),
            Math.Between(150, this.scene.scale.height - 70),
            'tomato_item'
        );
    }

    destroyItem() {
        this.children.entries[0]!.destroy();
        this.addTomatoItem();
    }

}
