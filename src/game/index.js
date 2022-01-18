const gameState = {
  score: 0
};

const config = {
  type: Phaser.AUTO,
  width: 500,
  height: 600,
  backgroundColor: "b9eaff",
  scene: [StartScene, GameScene]
};

const game = new Phaser.Game(config);
