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

    this.load.audio("win", "assets/sounds/win.mp3");
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

      backgroundMusic.setVolume(1);
      backgroundMusic.play();

      accessBackgroundMusic.music = backgroundMusic;
    }
    const playButton = this.add
      .sprite(330, 20, "playAgainText")
      .setScale(0.5)
      .setOrigin(0, 0)
      .setInteractive();

    playButton.on("pointerdown", () => {
      accessBackgroundMusic.music.stop();
      this.scene.start("gamePlay");
    });

    let style = { font: "20px Arial", fill: "#fff" };

    this.livesText = this.add.text(
      defaultResolution.width / 2 - 150,
      defaultResolution.height - 100,
      "Lives left: " + gameState.lives,
      style,
    );

    this.scoreText = this.add.text(
      defaultResolution.width / 2 - 150,
      defaultResolution.height - 125,
      "Sandwiches eaten: " + gameState.score,
      style,
    );

    let minutes = Math.floor(gameState.timerCount / 60);
    let seconds = Math.floor(gameState.timerCount % 60);

    let displaySeconds = seconds.toString().padStart(2, "0");

    this.timerText = this.add.text(
      defaultResolution.width / 2 - 150,
      defaultResolution.height - 150,
      `Time: ${minutes}:${displaySeconds}`,
      style,
    );
  }
}
