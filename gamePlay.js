const gameState = {};
const enemies = [];

class gamePlay extends Phaser.Scene {
  constructor() {
    super("gamePlay");
  }

  handlePlayerEnemyOverlap(player, enemy) {
    enemy.x = Phaser.Math.Between(0, defaultResolution.width);
    enemy.y = -300;

    gameState.sfx.enemyHit.play();
    player.setTint(0xff0000);
    this.lives -= 1;
    this.livesText.setText("Lives left: " + this.lives);
  }

  handlePlayerSandwichOverlap(player, sandwich) {
    sandwich.x = Phaser.Math.Between(0, defaultResolution.width);
    sandwich.y = -300;
    sandwich.setGravityY(0);

    this.score += 1;
    this.scoreText.setText("Sandwiches eaten: " + this.score);
    gameState.sfx.nice.play();
    player.setTint(0x00ff00);
  }

  handleLowerBoundSandwichOverlap(bound, sandwich) {
    sandwich.x = Phaser.Math.Between(0, defaultResolution.width);
    sandwich.y = -300;
    sandwich.setGravityY(0);
  }

  handleLowerBoundEnemyOverlap(bound, enemy) {
    enemy.x = Phaser.Math.Between(0, defaultResolution.width);
    enemy.y = -300;
    enemy.setGravityY(0);
  }

  hitDeluxe() {
    this.sandwich1.x = Phaser.Math.Between(0, defaultResolution.width);
    this.sandwich1.y = Phaser.Math.Between(100, defaultResolution.height);

    this.score += 5;
    this.scoreText.setText("Sandwiches eaten: " + this.score);
    gameState.sfx.nice.play();
  }

  enemyHit() {
    this.enemy.x = Phaser.Math.Between(0, defaultResolution.width);
    this.enemy.y = -300;

    gameState.sfx.enemyHit.play();
  }

  enemyHitBetter(enemy) {
    enemy.x = Phaser.Math.Between(0, defaultResolution.width);
    enemy.enemy.y = -300;

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
    this.load.image("sandwichDeluxe", "assets/images/sandwichDeluxe.png");

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

    this.player = this.physics.add.sprite(512, 768, "player");
    this.player.body.setSize(180, 340);
    this.player.setScale(0.35);
    this.player.setCollideWorldBounds(true);

    this.sandwich1 = this.physics.add.sprite(500, 500, "sandwichDeluxe");
    this.sandwich1.body.setSize(60, 80);
    this.sandwich1.setScale(0.17);

    this.fallingSandwiches = this.add.group();
    for (let i = 0; i < 4; i++) {
      let sandwich = this.physics.add.sprite(100 + i * 100, -300, "sandwich");
      sandwich.body.setSize(30, 40);
      sandwich.setScale(0.25);
      sandwich.setGravityY(100);
      sandwich.name = "sandwich" + String(i);

      this.fallingSandwiches.add(sandwich);
    }

    this.physics.add.overlap(
      this.player,
      this.fallingSandwiches,
      this.handlePlayerSandwichOverlap,
      null,
      this,
    );

    this.enemies = this.add.group();
    for (let i = 0; i < 5; i++) {
      let enemy = this.physics.add.sprite(100 + i * 100, 100, "enemy");
      enemy.body.setSize(140, 340);
      enemy.setScale(0.2);
      enemy.setGravityY(90);
      enemy.name = "enemy" + String(i);

      this.enemies.add(enemy);
    }

    this.physics.add.overlap(
      this.player,
      this.enemies,
      this.handlePlayerEnemyOverlap,
      null,
      this,
    );

    this.score = 0;
    this.lives = 3;
    this.timerCount = 0;

    let style = { font: "20px Arial", fill: "#fff" };

    this.livesText = this.add.text(20, 20, "Lives left: " + this.lives, style);

    this.scoreText = this.add.text(
      20,
      45,
      "Sandwiches eaten: " + this.score,
      style,
    );

    this.timerText = this.add.text(20, 70, "Time: 0", style);

    this.arrow = this.input.keyboard.createCursorKeys();

    const backgroundMusic = this.sound.add("theme");

    backgroundMusic.loop = true;
    backgroundMusic.setVolume(0.5);
    backgroundMusic.play();

    this.lowerBound = this.physics.add.staticImage(0, 1000, "invisibleBox");
    this.lowerBound.setSize(4000, 100);
    this.lowerBound.setVisible(false);

    this.physics.add.overlap(
      this.lowerBound,
      this.enemies,
      this.handleLowerBoundEnemyOverlap,
      null,
      this,
    );

    this.physics.add.overlap(
      this.lowerBound,
      this.fallingSandwiches,
      this.handleLowerBoundSandwichOverlap,
      null,
      this,
    );
  }
  update(time, delta) {
    this.timerCount += delta / 1000;

    this.timerText.setText("Time: " + Math.floor(this.timerCount));

    let minutes = Math.floor(this.timerCount / 60);
    let seconds = Math.floor(this.timerCount % 60);

    // Pad the seconds so it shows 01:05 instead of 1:5
    let displaySeconds = seconds.toString().padStart(2, "0");
    this.timerText.setText(`Time: ${minutes}:${displaySeconds}`);

    if (this.physics.overlap(this.player, this.sandwich1)) {
      this.hitDeluxe();
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
