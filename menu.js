// Defined here because I'm not planning to mess around with the load order of files in index.html
const defaultResolution = {
  width: 1024,
  height: 768,
  widthHalf: 512,
  heightHalf: 382,
};

class Menu extends Phaser.Scene {
  constructor() {
    super("Menu");
  }

  preload() {
    this.load.image("start", "assets/images/start.png");
    this.load.image("menuBackground", "assets/images/menuBackground.png");

    this.load.image("sandwichText", "assets/images/Sandwich.png");
    this.load.image("sandwichDeluxeText", "assets/images/sandwichDeluxe.png");

    this.load.image("enemyText", "assets/images/board.png");
  }

  create() {
    this.add.image(0, -50, "menuBackground").setOrigin(0, 0);
    this.MusicText1 = this.add
      .text(defaultResolution.widthHalf, 670, "Music & Meme Sounds:")
      .setOrigin(0.5);
    this.MusicText1.setStroke("#000000", 6);

    this.MusicText2 = this.add
      .text(
        defaultResolution.widthHalf,
        690,
        "Tateyuki Shigaraki - Joking Motive",
      )
      .setOrigin(0.5);
    this.MusicText2.setStroke("#000000", 6);

    this.MusicText3 = this.add
      .text(defaultResolution.widthHalf, 710, "Bag Raiders - Shooting Stars")
      .setOrigin(0.5);
    this.MusicText3.setStroke("#000000", 6);

    this.MusicText4 = this.add
      .text(
        defaultResolution.widthHalf,
        730,
        "My Longest Yeah Boy Ever, Fahh, Anime 'Wow' Sound Effect",
      )
      .setOrigin(0.5);
    this.MusicText4.setStroke("#000000", 6);

    this.MusicText4 = this.add
      .text(
        defaultResolution.widthHalf,
        750,
        "You Just Have to Say That You're Fine, Michael Rosen - Nice",
      )
      .setOrigin(0.5);
    this.MusicText4.setStroke("#000000", 6);

    this.instructionsText1 = this.add
      .text(defaultResolution.widthHalf, 20, "Instructions:")
      .setOrigin(0.5);
    this.instructionsText1.setStroke("#000000", 6);
    this.instructionsText2 = this.add
      .text(defaultResolution.widthHalf, 45, "Use arrow keys to move")
      .setOrigin(0.5);
    this.instructionsText2.setStroke("#000000", 6);
    this.instructionsText3 = this.add
      .text(defaultResolution.widthHalf, 70, "Click to start below")
      .setOrigin(0.5);
    this.instructionsText3.setStroke("#000000", 6);

    this.collectText = this.add
      .text(defaultResolution.widthHalf + 350, 50, "Collect:")
      .setOrigin(0.5);
    this.collectText.setStroke("#000000", 6);

    this.add
      .image(defaultResolution.widthHalf + 350, 120, "sandwichText")
      .setOrigin(0.5)
      .setScale(0.3);
    this.add
      .image(defaultResolution.widthHalf + 350, 250, "sandwichDeluxeText")
      .setOrigin(0.5)
      .setScale(0.15);

    this.score1Text = this.add
      .text(defaultResolution.widthHalf + 350, 175, "+1 score")
      .setOrigin(0.5);
    this.score1Text.setStroke("#000000", 6);

    this.score5Text = this.add
      .text(defaultResolution.widthHalf + 350, 325, "+5 score")
      .setOrigin(0.5);
    this.score5Text.setStroke("#000000", 6);

    this.avoidText = this.add
      .text(defaultResolution.widthHalf - 350, 50, "Avoid:")
      .setOrigin(0.5);
    this.avoidText.setStroke("#000000", 6);

    this.add
      .image(defaultResolution.widthHalf - 350, 160, "enemyText")
      .setOrigin(0.5)
      .setScale(0.2);

    this.lifeLostText = this.add
      .text(defaultResolution.widthHalf - 350, 275, "-1 life ")
      .setOrigin(0.5);
    this.lifeLostText.setStroke("#000000", 6);

    const playButton = this.add
      .sprite(defaultResolution.widthHalf, 180, "start")
      .setScale(0.5)
      .setInteractive();

    playButton.on("pointerdown", () => {
      this.scene.start("gamePlay");
    });

    this.tweens.add({
      targets: playButton,
      scaleX: 0.7,
      scaleY: 0.7,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
  }
}
