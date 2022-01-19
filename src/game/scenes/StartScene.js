class StartScene extends Phaser.Scene {
  constructor() {
    var clickText;
    var gradeIcon;
    var hulagu;
    var iconAnPlus = true;
    var started = false;
		super({ key: 'StartScene' });
	}

  preload() {
    this.load.image('grade', 'assets/grade.png');
    this.load.image('hulagu', 'assets/hulagu.png');
  }

  create() {
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    this.gradeIcon = this.add.sprite(100, screenCenterY, 'grade');
    this.gradeIcon.setScale(1, 1);
    this.hulagu = this.add.image(250, 600, 'hulagu')
    this.clickText = this.add.text(screenCenterX, screenCenterY, 'oyuna başlamak için tıkla', {fill: '#000000', fontSize: '16px', boundsAlignH: "center", boundsAlignV: "middle"}).setOrigin(0.5);
    this.input.on('pointerdown', () => {
      this.started = true;
    });
  }

  update() {
    if (this.gradeIcon.scaleX >= 1.6) {
      this.iconAnPlus = false;
    }else if (this.gradeIcon.scaleX <= 1) {
      this.iconAnPlus = true
    }

    if (this.iconAnPlus) {
      this.gradeIcon.scaleX += 0.002;
      this.gradeIcon.scaleY += 0.002;
    }else {
      this.gradeIcon.scaleX -= 0.002;
      this.gradeIcon.scaleY -= 0.002;
    }
    if (this.started) {
      this.clickText.x += 3;
      this.gradeIcon.x -= 2;
      this.hulagu.y += 2;
      if (this.clickText.x >= (this.cameras.main.worldView.x + this.cameras.main.width) * 3 / 2) {
        console.log(this.clickText.x, this.cameras.main.worldView.x * 3 / 2);
        this.scene.stop("StartScene");
        this.scene.start("GameScene");
        this.started = false;
      }
    }
  }

}