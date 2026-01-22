class Menu extends Phaser.Scene {
    constructor() {
        super("Menu");
    }

    preload() {
        this.load.image('StartButton', 'assets/StartButton.png');
    }

    create(){
       this.add.text(0, 0, "Loading game...").setOrigin(0,0); 

        const playButton = this.add.sprite(350, 250, 'StartButton').setOrigin(0,0).setInteractive();
        playButton.on('pointerdown', () => {
            this.scene.start("gamePlay");
        })

    }


}

