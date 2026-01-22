// Create our only scene called mainScene, in the game.js file
class mainScene {
    // The three methods currently empty
    hit() {
        // Change the position x and y of the coin randomly
        this.coin.x = Phaser.Math.Between(100, 1700);
        this.coin.y = Phaser.Math.Between(100, 600);
      
        // Increment the score by 10
        this.score += 10;
      
        // Display the updated score on the screen
        this.scoreText.setText('score: ' + this.score);

        // Create a new tween 
        // this.tweens.add({
        //     targets: this.player, // on the player 
        //     duration: 200, // for 200ms 
        //     scaleX: 1.2, // that scale vertically by 20% 
        //     scaleY: 1.2, // and scale horizontally by 20% 
        //     yoyo: true, // at the end, go back to original scale 
        // });
      }

    preload() {
        // this.load.image("player", "assets/player.png");
        this.load.image("player", "assets/Shades.png");

        // this.load.image('coin', 'assets/coin.png');
        this.load.image('coin', 'assets/Sandwich.png');

        this.load.image('background', 'assets/board.png');

    }
    create() {
        this.add.image(400, 600, 'background');

        this.player = this.physics.add.sprite(100, 100, 'player');
        this.player.setScale(0.45)

        this.coin = this.physics.add.sprite(300, 300, 'coin');
        this.coin.setScale(0.3)


        // Store the score in a variable, initialized at 0
        this.score = 0;

        // The style of the text 
        // A lot of options are available, these are the most important ones
        let style = { font: '20px Arial', fill: '#fff' };

        // Display the score in the top left corner
        // Parameters: x position, y position, text, style
        this.scoreText = this.add.text(20, 20, 'score: ' + this.score, style);

        this.arrow = this.input.keyboard.createCursorKeys();
    }
    update() {
        // If the player is overlapping with the coin
        if (this.physics.overlap(this.player, this.coin)) {
            // Call the new hit() method
            this.hit();
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
            this.player.y += 3;
        } else if (this.arrow.up.isDown) {
            this.player.y -= 3;
        } 
            }
  }


  
  new Phaser.Game({
    width: 1800, // Width of the game in pixels
    height: 750, // Height of the game in pixels
    backgroundColor: '#3498db', // The background color (blue)
    scene: mainScene, // The name of the scene we created
    physics: { default: 'arcade' }, // The physics engine to use
    parent: 'game', // Create the game inside the <div id="game"> 
  });