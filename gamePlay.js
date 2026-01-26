const gameState = {};

class gamePlay extends Phaser.Scene {
  constructor() {
    super("gamePlay");
  }

  hit() {
    this.sandwich1.x = Phaser.Math.Between(0, defaultResolution.width);
    this.sandwich1.y = Phaser.Math.Between(100, defaultResolution.height);

    this.score += 1;
    this.scoreText.setText("Sandwiches eaten: " + this.score);
    gameState.sfx.nice.play();
  }

  enemyHit() {
    this.enemy.x = Phaser.Math.Between(0, defaultResolution.width);
    this.enemy.y = Phaser.Math.Between(-50, -200);

    gameState.sfx.enemyHit.play();
  }

  enemyMiss() {
    this.enemy.x = Phaser.Math.Between(0, defaultResolution.width);
    this.enemy.y = Phaser.Math.Between(100, 100);
    this.enemy.setGravityY(0);
  }

  hit2() {
    this.sandwich2.x = Phaser.Math.Between(0, defaultResolution.width);
    this.sandwich2.y = Phaser.Math.Between(100, 100);
    this.sandwich2.setGravityY(0);

    this.score += 1;
    this.scoreText.setText("Sandwiches eaten: " + this.score);
    gameState.sfx.nice.play();
  }

  miss2() {
    this.sandwich2.x = Phaser.Math.Between(0, defaultResolution.width);
    this.sandwich2.y = Phaser.Math.Between(100, 100);
    this.sandwich2.setGravityY(0);
  }

  preload() {
    this.load.image("player", "assets/images/Shades.png");
    this.load.image("sandwich", "assets/images/Sandwich.png");
    this.load.image("tesco", "assets/images/tesco.png");
    this.load.image("enemy", "assets/images/board.png");

    this.load.audio("theme", "assets/sounds/JokingMotive.mp3");
    this.load.audio("nice", "assets/sounds/Nice.mp3");
    this.load.audio("enemyHit", "assets/sounds/EnemyHit.mp3");
  }
  create() {
    gameState.sfx = {};
    gameState.sfx.nice = this.sound.add("nice");
    gameState.sfx.enemyHit = this.sound.add("enemyHit").setVolume(0.6);

    this.physics.world.setBounds(
      0,
      0,
      defaultResolution.width,
      defaultResolution.height,
    );
    this.physics.world.createDebugGraphic();

    this.add.image(0, 0, "tesco").setOrigin(0, 0);

    this.player = this.physics.add.sprite(100, 100, "player");
    this.player.body.setSize(180, 340);
    this.player.setScale(0.35);
    this.player.setCollideWorldBounds(true);

    this.sandwich1 = this.physics.add.sprite(500, 500, "sandwich");
    this.sandwich1.body.setSize(30, 40);
    this.sandwich1.setScale(0.25);

    this.sandwich2 = this.physics.add.sprite(600, 100, "sandwich");
    this.sandwich2.body.setSize(30, 40);
    this.sandwich2.setScale(0.25);
    this.sandwich2.setGravityY(100);
    // this.sandwich2.setCollideWorldBounds(true)

    this.enemy = this.physics.add.sprite(600, 100, "enemy");
    this.enemy.setScale(0.25);
    this.enemy.setGravityY(100);

    this.enemy2 = this.physics.add.sprite(600, 100, "enemy");
    this.enemy2.angle = 45;
    this.enemy2.setScale(0.25);
    this.enemy2.setGravityY(100);

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

    this.sandwichBounds = this.physics.add.staticImage(0, 850, "invisibleBox");
    this.sandwichBounds.setSize(2000, 100);
    this.sandwichBounds.setVisible(false);

    // this.physics.add.collider(this.sandwich2, this.sandwichBounds);
  }
  update() {
    if (this.physics.overlap(this.player, this.sandwich1)) {
      this.hit();
    }

    if (this.physics.overlap(this.sandwichBounds, this.sandwich2)) {
      this.miss2();
    }

    if (this.physics.overlap(this.sandwichBounds, this.enemy)) {
      this.enemyMiss();
    }

    if (this.physics.overlap(this.player, this.sandwich2)) {
      this.hit2();
    }

    if (this.physics.overlap(this.player, this.enemy)) {
      this.enemyHit();
    }

    if (this.arrow.right.isDown) {
      this.player.x += 7;
      this.player.setFlipX(true);
    } else if (this.arrow.left.isDown) {
      this.player.x -= 7;
      this.player.setFlipX(false);
    }

    if (this.arrow.down.isDown) {
      this.player.y += 7;
    } else if (this.arrow.up.isDown) {
      this.player.y -= 7;
    }
  }
}
