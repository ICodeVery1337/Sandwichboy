const gameState = {};

const scoreToWin = 100;

class gamePlay extends Phaser.Scene {
  constructor() {
    super("gamePlay");
  }

  createExpandingRedCircle(x, y) {
    const circle = this.add.graphics({ x: x, y: y });

    circle.fillStyle(0xff0000, 1);

    circle.fillCircle(0, 0, 10);

    this.tweens.add({
      targets: circle,
      scale: 15,
      alpha: 0,
      duration: 800,
      ease: "Expo.out",
      onComplete: () => {
        circle.destroy();
      },
    });
  }

  createExpandingGreenCircle(x, y, size) {
    const circle = this.add.graphics({ x: x, y: y });

    circle.fillStyle(0x00ff00, 1);

    circle.fillCircle(0, 0, size);

    this.tweens.add({
      targets: circle,
      scale: 15,
      alpha: 0,
      duration: 800,
      ease: "Expo.out",
      onComplete: () => {
        circle.destroy();
      },
    });
  }

  createExpandingOtherCircle(x, y, size) {
    const circle = this.add.graphics({ x: x, y: y });

    circle.fillStyle(0x00ff00, 1);

    circle.fillCircle(0, 0, size);

    this.tweens.add({
      targets: circle,
      scale: 15,
      alpha: 0,
      duration: 800,
      ease: "Expo.out",
      onComplete: () => {
        circle.destroy();
      },
    });
  }

  handlePlayerEnemyOverlap(player, enemy) {
    enemy.x = Phaser.Math.Between(0, defaultResolution.width);
    enemy.y = -300;

    gameState.sfx.enemyHit.play();

    if (this.lives == 0) {
      gameState.status = "defeat";

      gameState.lives = this.lives;
      gameState.score = this.score;
      gameState.timerCount = this.timerCount;
      gameState.backgroundMusic.stop();

      this.scene.start("gameOver");
    }

    this.lives -= 1;
    this.livesText.setText("Lives left: " + this.lives);
  }

  handlePlayerSandwichOverlap(player, sandwich) {
    sandwich.x = Phaser.Math.Between(0, defaultResolution.width);
    sandwich.y = -300;
    sandwich.setGravityY(0);

    this.score += 1;
    this.scoreText.setText("Sandwiches eaten: " + this.score);

    if (this.score >= scoreToWin) {
      gameState.status = "victory";
      gameState.lives = this.lives;
      gameState.score = this.score;
      gameState.timerCount = this.timerCount;
      gameState.backgroundMusic.stop();

      this.scene.start("gameOver");
    }

    gameState.sfx.nice.play();
  }

  handleLowerBoundSandwichOverlap(bound, sandwich) {
    sandwich.x = Phaser.Math.Between(0, defaultResolution.width);
    sandwich.y = -300;

    // let randGravitySandwich = Phaser.Math.Between(70, 110);

    sandwich.setGravityY(0);
    // sandwich.setGravityY(randGravitySandwich);
  }

  handleLowerBoundEnemyOverlap(bound, enemy) {
    enemy.x = Phaser.Math.Between(0, defaultResolution.width);
    enemy.y = -300;
    enemy.setGravityY(0);
  }

  hitDeluxe() {
    this.sandwich1.x = Phaser.Math.Between(0, defaultResolution.width);
    this.sandwich1.y = Phaser.Math.Between(0, defaultResolution.heightHalf);

    this.createExpandingOtherCircle(this.sandwich1.x, this.sandwich1.y, 10);

    this.score += 3;
    this.scoreText.setText("Sandwiches eaten: " + this.score);

    if (this.score >= scoreToWin) {
      gameState.status = "victory";
      gameState.lives = this.lives;
      gameState.score = this.score;
      gameState.timerCount = this.timerCount;

      gameState.backgroundMusic.stop();

      this.scene.start("gameOver");
    }

    gameState.sfx.enemyHitDeluxe.play();
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
    this.load.audio("enemyDeluxeHit", "assets/sounds/wow.mp3");
  }
  create() {
    this.cameras.main.fadeIn(2000, 0, 0, 0);

    gameState.sfx = {};
    gameState.sfx.nice = this.sound.add("nice");
    gameState.sfx.enemyHit = this.sound.add("enemyHit").setVolume(0.5);
    gameState.sfx.enemyHitDeluxe = this.sound
      .add("enemyDeluxeHit")
      .setVolume(0.15);

    this.physics.world.setBounds(
      0,
      0,
      defaultResolution.width,
      defaultResolution.height,
    );
    // this.physics.world.createDebugGraphic();

    this.add.image(0, 0, "tesco").setOrigin(0, 0);

    this.player = this.physics.add.sprite(512, 768, "player");
    this.player.body.setSize(180, 340);
    this.player.setScale(0.35);
    this.player.setCollideWorldBounds(true);
    this.player.postFX.addGlow(0x0000ff, 2, 0);

    let sandwich1X = Phaser.Math.Between(0, defaultResolution.width);
    let sandwich1Y = Phaser.Math.Between(0, defaultResolution.heightHalf);

    this.sandwich1 = this.physics.add.sprite(
      sandwich1X,
      sandwich1Y,
      "sandwichDeluxe",
    );
    this.sandwich1.body.setSize(220, 300);
    this.sandwich1.setScale(0.17);
    this.sandwich1.postFX.addGlow(0x00ff00, 2, 0);

    this.fallingSandwiches = this.add.group();
    let randomXPosSandwich = Phaser.Math.Between(0, defaultResolution.width);
    let randGravitySandwich = Phaser.Math.Between(-30, 30);

    for (let i = 0; i < 4; i++) {
      // let sandwich = this.physics.add.sprite(100 + i * 100, -300, "sandwich");
      let sandwich = this.physics.add.sprite(
        randomXPosSandwich,
        -300,
        "sandwich",
      );

      sandwich.body.setSize(30, 40);
      sandwich.setScale(0.25);
      sandwich.setGravityY(100 + randGravitySandwich);
      sandwich.postFX.addGlow(0xffff00, 2, 0);

      sandwich.name = "sandwich" + String(i);

      this.fallingSandwiches.add(sandwich);

      randomXPosSandwich = Phaser.Math.Between(0, defaultResolution.width);
      randGravitySandwich = Phaser.Math.Between(-30, 30);
    }

    this.physics.add.overlap(
      this.player,
      this.fallingSandwiches,
      this.handlePlayerSandwichOverlap,
      null,
      this,
    );

    this.enemies = this.add.group();
    let randomXPosEnemy = Phaser.Math.Between(0, defaultResolution.width);

    let randGravityEnemy = Phaser.Math.Between(-30, 30);

    for (let i = 0; i < 5; i++) {
      // let enemy = this.physics.add.sprite(100 + i * 100, 100, "enemy");
      let enemy = this.physics.add.sprite(randomXPosEnemy, -300, "enemy");

      enemy.body.setSize(140, 340);
      enemy.setScale(0.2);
      // enemy.setGravityY(90);

      enemy.setGravityY(90 + randGravityEnemy);

      enemy.name = "enemy" + String(i);
      enemy.postFX.addGlow(0xff0000, 2, 0);

      this.enemies.add(enemy);
      randomXPosEnemy = Phaser.Math.Between(0, defaultResolution.width);
      randGravityEnemy = Phaser.Math.Between(-30, 30);
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

    this.livesText = this.add.text(20, 70, "Lives left: " + this.lives, style);
    this.livesText.setStroke("#000000", 6);

    this.scoreText = this.add.text(
      20,
      45,
      "Sandwiches eaten: " + this.score,
      style,
    );
    this.scoreText.setStroke("#000000", 6);

    this.timerText = this.add.text(20, 20, "Time: 0", style);
    this.timerText.setStroke("#000000", 6);

    this.arrow = this.input.keyboard.createCursorKeys();

    const backgroundMusic = this.sound.add("theme");

    backgroundMusic.loop = true;
    backgroundMusic.setVolume(0.7);
    backgroundMusic.play();

    gameState.backgroundMusic = backgroundMusic;

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

    this.physics.add.overlap(
      this.player,
      this.enemies,
      (player, enemy) => {
        this.createExpandingRedCircle(player.x, player.y);
      },
      null,
      this,
    );

    this.physics.add.overlap(
      this.player,
      this.fallingSandwiches,
      (player, sandwich) => {
        this.createExpandingGreenCircle(player.x, player.y, 5);
      },
      null,
      this,
    );

    // this.physics.add.overlap(
    //   this.player,
    //   this.sandwich1,
    //   (player, sandwich) => {
    //     this.createExpandingGreenCircle(player.x, player.y, 10);
    //   },
    //   null,
    //   this,
    // );
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
