class StartScreen extends Phaser.Scene {
  constructor() {
    var clickText;
    var noteIcon;
    var iconAnPlus = true;
    var started = false;
		super({ key: 'StartScreen' });
	}

  preload() {
    this.load.image('note', 'assets/note.png');
  }

  create() {
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    this.noteIcon = this.add.sprite(100, screenCenterY, 'note');
    this.noteIcon.setScale(0.2, 0.2);
    this.clickText = this.add.text(screenCenterX, screenCenterY, 'oyuna başlamak için tıkla', {fill: '#000000', fontSize: '16px', boundsAlignH: "center", boundsAlignV: "middle"}).setOrigin(0.5);
    this.input.on('pointerdown', () => {
      this.started = true;
    });
    
  }

  update() {
    if (this.noteIcon.scaleX >= 0.4) {
      this.iconAnPlus = false;
    }else if (this.noteIcon.scaleX <= 0.2) {
      this.iconAnPlus = true
    }

    if (this.iconAnPlus) {
      this.noteIcon.scaleX += 0.0005;
      this.noteIcon.scaleY += 0.0005;
    }else {
      this.noteIcon.scaleX -= 0.0005;
      this.noteIcon.scaleY -= 0.0005;
    }
    if (this.started) {
      this.clickText.x += 2;
      this.noteIcon.x -= 2;
      if (this.clickText.x >= (this.cameras.main.worldView.x + this.cameras.main.width) * 3 / 2) {
        console.log(this.clickText.x, this.cameras.main.worldView.x * 3 / 2);
        this.scene.stop("StartScreen");
        this.scene.start("GameScreen");
      }
    }
  }

}