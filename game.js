const config = {
  width: defaultResolution.width,
  height: defaultResolution.height,
  backgroundColor: "#222",
  scene: [Menu, gamePlay, gameOver],
  physics: { default: "arcade" },
};

var game = new Phaser.Game(config);
