const gameState = {};

class gamePlay extends Phaser.Scene {
  constructor() {
    super("gamePlay");
  }

  hit() {
    this.sandwich1.x = Phaser.Math.Between(100, 1700);
    this.sandwich1.y = Phaser.Math.Between(100, 600);

    this.score += 1;
    this.scoreText.setText("Sandwiches eaten: " + this.score);
    gameState.sfx.nice.play();
    // Create a new tween
    // this.tweens.add({
    //     targets: this.player, // on the player
    //     duration: 200, // for 200ms
    //     scaleX: 1.2, // that scale vertically by 20%
    //     scaleY: 1.2, // and scale horizontally by 20%
    //     yoyo: true, // at the end, go back to original scale
    // });
  }

  hit2() {
    this.sandwich2.x = Phaser.Math.Between(100, 1700);
    this.sandwich2.y = Phaser.Math.Between(100, 100);
    this.sandwich2.setGravityY(0);
  }

  preload() {
    this.load.image("player", "assets/Shades.png");
    this.load.image("sandwich", "assets/Sandwich.png");
    this.load.image("background", "assets/board.png");

    this.load.audio("theme", "assets/sounds/JokingMotive.mp3");
    this.load.audio("nice", "assets/sounds/Nice.mp3");
  }
  create() {
    gameState.sfx = {};
    gameState.sfx.nice = this.sound.add("nice");

    this.physics.world.setBounds(0, 0, 1024, 768);

    this.add.image(400, 600, "background");

    this.player = this.physics.add.sprite(100, 100, "player");
    this.player.setScale(0.35);
    this.player.setCollideWorldBounds(true);

    this.sandwich1 = this.physics.add.sprite(500, 500, "sandwich");
    this.sandwich1.setScale(0.25);

    this.sandwich2 = this.physics.add.sprite(600, 100, "sandwich");
    this.sandwich2.setScale(0.25);
    this.sandwich2.setGravityY(100);
    // this.sandwich2.setCollideWorldBounds(true)

    this.sandwich3 = this.physics.add.sprite(700, 700, "sandwich");
    this.sandwich3.setScale(0.3);

    this.score = 0;

    let style = { font: "20px Arial", fill: "#fff" };
    this.scoreText = this.add.text(
      20,
      20,
      "Sandwiches eaten: " + this.score,
      style,
    );

    this.arrow = this.input.keyboard.createCursorKeys();

    const backgroundMusic = this.sound.add("theme");

    backgroundMusic.loop = true;
    backgroundMusic.setVolume(0.5);
    backgroundMusic.play();

    this.sandwichBounds = this.physics.add.staticImage(0, 600, "invisibleBox");
    this.sandwichBounds.setSize(2000, 100);
    this.sandwichBounds.setVisible(false);

    // Only player collides with this invisible box
    // this.physics.add.collider(this.sandwich2, this.sandwichBounds);
  }
  update() {
    // If the player is overlapping with the sandwich
    if (this.physics.overlap(this.player, this.sandwich1)) {
      // Call the new hit() method
      this.hit();
    }

    if (this.physics.overlap(this.sandwichBounds, this.sandwich2)) {
      this.hit2();
      console.log("collision");
    }

    if (this.physics.overlap(this.player, this.sandwich2)) {
      // Call the new hit() method
      this.hit2();
    }

    // Handle horizontal movements
    if (this.arrow.right.isDown) {
      // If the right arrow is pressed, move to the right
      this.player.x += 7;
      this.player.setFlipX(true);
    } else if (this.arrow.left.isDown) {
      // If the left arrow is pressed, move to the left
      this.player.x -= 7;
      this.player.setFlipX(false);
    }

    // Do the same for vertical movements
    if (this.arrow.down.isDown) {
      this.player.y += 7;
    } else if (this.arrow.up.isDown) {
      this.player.y -= 7;
    }
  }
}
