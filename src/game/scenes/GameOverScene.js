
class GameOverScene extends Phaser.Scene {
  constructor() {
    var gradeIcon;
    var goodgradeIcon;
    var badgradeIcon;
    var hulagu;
    var stats;
		super({ key: 'GameOverScene' });
	}

  init(data) {
    this.stats = data.stats;
  }

  preload() {
    this.load.image('grade', 'assets/grade.png');
    this.load.image('goodgrade', 'assets/goodgrade.png');
    this.load.image('badgrade', 'assets/badgrade.png');
    this.load.image('hulagu', 'assets/hulagu.png');
  }

  create() {

    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    
    this.clickText = this.add.text(screenCenterX, screenCenterY - 120, 'tekrar oynamak için tıkla', {fill: '#000000', fontSize: '16px', boundsAlignH: "center", boundsAlignV: "middle"}).setOrigin(0.5);

    this.add.text(screenCenterX, screenCenterY - 60, `NOT: ${this.stats.point}`, {fontSize: '32px', fill: '#000', stroke: '#000', strokeThickness: 0}).setOrigin(0.5);

    this.gradeIcon = this.add.sprite(130, screenCenterY, 'grade');
    this.add.text(150, screenCenterY - 12, this.stats.grade, {fontSize: '25px', fill: '#000', stroke: '#000', strokeThickness: 0});
    this.goodgradeIcon = this.add.sprite(230, screenCenterY, 'goodgrade');
    this.add.text(250, screenCenterY - 12, this.stats.goodgrade, {fontSize: '25px', fill: '#000', stroke: '#000', strokeThickness: 0});
    this.badgradeIcon = this.add.sprite(330, screenCenterY, 'badgrade');
    this.add.text(350, screenCenterY - 12, this.stats.badgrade, {fontSize: '25px', fill: '#000', stroke: '#000', strokeThickness: 0});

    this.hulagu = this.add.image(250, 600, 'hulagu');
    this.input.on('pointerdown', () => {
      this.scene.stop('GameOverScene');
      this.scene.start('StartScene');
    });
  }

  update() {
  }

}