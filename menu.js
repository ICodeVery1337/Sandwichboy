// Defined here because I'm not planning to mess around with the load order of files in index.html
const defaultResolution = { width: 1024, height: 768 };

class Menu extends Phaser.Scene {
  constructor() {
    super("Menu");
  }

  preload() {
    this.load.image("start", "assets/images/start.png");
    this.load.image("menuBackground", "assets/images/menuBackground.png");
  }

  create() {
    this.add.image(0, -50, "menuBackground").setOrigin(0, 0);

    let style = { font: "20px Arial", fill: "#fff" };

    this.instructionsText1 = this.add.text(350, 20, "Instructions:");
    this.instructionsText2 = this.add.text(350, 45, "Use arrow keys to move");
    this.instructionsText3 = this.add.text(350, 70, "Click start below");

    const playButton = this.add
      .sprite(300, 60, "start")
      .setScale(0.75)
      .setOrigin(0, 0)
      .setInteractive();

    playButton.on("pointerdown", () => {
      this.scene.start("gamePlay");
    });
  }
}
