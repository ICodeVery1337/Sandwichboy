const config = {
  width: defaultResolution.width,
  height: defaultResolution.height,
  backgroundColor: "#3498db",
  scene: [Menu, gamePlay],
  physics: { default: "arcade" },
};

var game = new Phaser.Game(config);
