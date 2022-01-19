const gameState = {
  score: 0
};

const config = {
  type: Phaser.AUTO,
  width: 500,
  height: 600,
  backgroundColor: "b9eaff",
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 400 },
        debug: false
    }
  },
  scene: [StartScene, GameScene, GameOverScene]
};

const game = new Phaser.Game(config);
