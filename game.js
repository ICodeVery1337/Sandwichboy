// Create our only scene called mainScene, in the game.js file



  
var game =  new Phaser.Game({
    width: 1800, // Width of the game in pixels
    height: 750, // Height of the game in pixels
    backgroundColor: '#3498db', // The background color (blue)
    scene: [Menu, gamePlay], // The name of the scene we created
    physics: { default: 'arcade' }, // The physics engine to use
    // parent: 'game', // Create the game inside the <div id="game"> 
  });