export default class Boot extends Phaser.Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        this.load.setPath('assets/game4_avoid_the_germs/games/');
        this.load.image('background', 'germs/background.png');
        this.load.bitmapFont('slime', 'slime-font.png', 'slime-font.xml');
    }

    create() {
        this.registry.set('highscore', 0);

        this.scene.start('Preloader');
    }
}
