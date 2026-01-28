const accessBackgroundMusic = {};

class gameOver extends Phaser.Scene {
  constructor() {
    super("gameOver");
  }

  preload() {
    this.load.image("playAgainText", "assets/images/playAgainText.png");

    this.load.image("defeatText", "assets/images/defeatText.png");
    this.load.image("defeat", "assets/images/defeat.png");

    this.load.image("victoryText", "assets/images/victoryText.png");
    this.load.image("victory", "assets/images/victory.png");

    this.load.audio("win", "assets/sounds/yeah.mp3");
    this.load.audio("fine", "assets/sounds/fine.mp3");
  }

  create() {
    this.cameras.main.fadeIn(5000, 0, 0, 0);

    if (gameState.status == "defeat") {
      this.add.image(0, -200, "defeat").setOrigin(0, 0);
      const backgroundMusic = this.sound.add("fine");

      backgroundMusic.setVolume(1);
      backgroundMusic.play();

      accessBackgroundMusic.music = backgroundMusic;
    } else {
      this.add.image(40, 0, "victory").setOrigin(0, 0);

      const backgroundMusic = this.sound.add("win");

      backgroundMusic.setVolume(0.8);
      backgroundMusic.play();

      accessBackgroundMusic.music = backgroundMusic;
    }
    const playButton = this.add
      .sprite(defaultResolution.widthHalf, 80, "playAgainText")
      .setScale(0.3)
      .setOrigin(0.5)
      .setInteractive();

    playButton.on("pointerdown", () => {
      accessBackgroundMusic.music.stop();
      this.scene.start("gamePlay");
    });

    let style = { font: "20px Arial", fill: "#fff" };

    this.livesText = this.add
      .text(
        defaultResolution.widthHalf,
        defaultResolution.height - 100,
        "Lives left: " + gameState.lives,
        style,
      )
      .setOrigin(0.5);
    this.livesText.setStroke("#000000", 6);

    this.scoreText = this.add
      .text(
        defaultResolution.widthHalf,
        defaultResolution.height - 125,
        "Sandwiches eaten: " + gameState.score,
        style,
      )
      .setOrigin(0.5);
    this.scoreText.setStroke("#000000", 6);

    let minutes = Math.floor(gameState.timerCount / 60);
    let seconds = Math.floor(gameState.timerCount % 60);

    let displaySeconds = seconds.toString().padStart(2, "0");

    this.timerText = this.add
      .text(
        defaultResolution.widthHalf,
        defaultResolution.height - 150,
        `Time: ${minutes}:${displaySeconds}`,
        style,
      )
      .setOrigin(0.5);
    this.timerText.setStroke("#000000", 6);

    this.tweens.add({
      targets: playButton,
      scaleX: 0.5,
      scaleY: 0.5,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
  }
}
