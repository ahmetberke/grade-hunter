class GameScreen extends Phaser.Scene {
  constructor() {
    var clickText;
    var noteIcon;
    var iconAnPlus = true;
		super({ key: 'GameScreen' });
	}

  preload() {
    this.load.image('note', 'assets/note.png');
  }

  create() {
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    this.noteIcon = this.add.sprite(100, screenCenterY, 'note');
    this.noteIcon.setScale(0.2, 0.2);
    this.clickText = this.add.text(screenCenterX, screenCenterY, 'oyuna başlamak için tıkla 2', {fill: '#000000', fontSize: '16px', boundsAlignH: "center", boundsAlignV: "middle"}).setOrigin(0.5);
  }

  update() {
  }

}