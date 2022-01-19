class GameScene extends Phaser.Scene {
  constructor() {
    var hulagu;
    var cursors;
    var platforms;
    var grades;
    var goodgrades;
    var badgrades;
    var gameStats;
    var scoreText;
    var gradesText;
    var goodgradesText;
    var badgradesTexT;
    var gameOver;
    var timer;
		super({ key: 'GameScene' });
	}

  preload() {
    this.load.image('grade', 'assets/grade.png');
    this.load.image('goodgrade', 'assets/goodgrade.png');
    this.load.image('badgrade', 'assets/badgrade.png');
    this.load.image('hulagu', 'assets/hulagu.png');
    this.load.image('ground', 'assets/platform.png');
  }

  create() {
    this.timer = 20;
    this.gameStats =  {
      grade: 0,
      goodgrade: 0,
      badgrade: 0,
      point: 50,

    };
    this.gameOver = false;
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    this.hulagu = this.physics.add.sprite(100, 450, 'hulagu');
    this.hulagu.setScale(0.3);
    this.hulagu.setBounce(0.2);
    this.hulagu.setCollideWorldBounds(true);

    this.grades = this.physics.add.group();
    this.goodgrades = this.physics.add.group();
    this.badgrades = this.physics.add.group();

    const gradeGen = () => {
      var xCoord = (Math.random() * 450) + 25;
      var gradeList = ['grade', 'grade', 'grade', 'goodgrade', 'badgrade', 'badgrade', 'badgrade', 'badgrade', 'badgrade', 'badgrade'];
      var ngrade = gradeList[Math.floor(Math.random() * gradeList.length)];
      if (ngrade == 'grade') {
        this.grades.create(xCoord, 10, ngrade);
      }else if (ngrade == 'goodgrade') {
        this.goodgrades.create(xCoord, 10, ngrade);
      }else if (ngrade == 'badgrade') {
        this.badgrades.create(xCoord, 10, ngrade);
      }
    }
    const gradeGenLoop = this.time.addEvent({
      delay: 200,
      callback: gradeGen,
      callbackScope: this,
      loop: true
    })
  
    var timerText = this.add.text(20, 20, 'zaman:'+this.timer,  {fontSize: '25px', fill: '#000'});
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.timer--;
        timerText.setText('zaman:'+this.timer);
        if (this.timer <= 0) {
          this.gameOver = true;
        }
      },
      callbackScope: this,
      loop: true
    })      

    this.cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(this.hulagu, this.platforms);
    this.physics.add.collider(this.grades, this.platforms, (grade) => {
      grade.destroy();
    });
    this.physics.add.collider(this.goodgrades, this.platforms, (grade) => {
      grade.destroy();
    });
    this.physics.add.collider(this.badgrades, this.platforms, (grade) => {
      grade.destroy();
    });
    this.physics.add.overlap(this.hulagu, this.grades, this.collectGrade, null, this);
    this.physics.add.overlap(this.hulagu, this.goodgrades, this.collectGoodGrade, null, this);
    this.physics.add.overlap(this.hulagu, this.badgrades, this.collectBadGrade, null, this);
  
    this.scoreText = this.add.text(10, 550, `Not: ${this.gameStats.point}`, {fontSize: '25px', fill: '#fff', stroke: '#000', strokeThickness: 2});
    this.add.image(170, 565, 'goodgrade')
    this.goodgradesText = this.add.text(190, 550, this.gameStats.grade, {fontSize: '25px', fill: '#fff', stroke: '#000', strokeThickness: 2})
    this.add.image(260, 565, 'grade')
    this.gradesText = this.add.text(280, 550, this.gameStats.grade, {fontSize: '25px', fill: '#fff', stroke: '#000', strokeThickness: 2})
    this.add.image(350, 565, 'badgrade')
    this.badgradesText = this.add.text(370, 550, this.gameStats.grade, {fontSize: '25px', fill: '#fff', stroke: '#000', strokeThickness: 2})
  }

  update() {
    if (this.gameOver) {
      this.scene.stop('GameScene');
      this.scene.start('GameOverScene', { stats: this.gameStats });
      this.gameOver = false;
    }
    if (this.cursors.left.isDown) {
      this.hulagu.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
      this.hulagu.setVelocityX(160);
    }else {
      this.hulagu.setVelocityX(0);
    }

    if (this.cursors.up.isDown && this.hulagu.body.touching.down)
    {
        this.hulagu.setVelocityY(-200);
    }
    if (this.gameStats.point <= 0) {
      this.gameOver = true;
    }
  }

  collectGrade(hulagu, grade) {
    grade.disableBody(true, true);
    if (this.gameStats.point < 100) {
      this.gameStats.grade++;
      this.gameStats.point+=1;
    }
    this.scoreText.setText(`Not: ${this.gameStats.point}`);
    this.gradesText.setText(this.gameStats.grade);
  }
  collectGoodGrade(hulagu, grade) {
    grade.disableBody(true, true);
    if (this.gameStats.point < 100) {
      this.gameStats.goodgrade++;
      if (this.gameStats.point < 95) {
        this.gameStats.point+=5;
      }else {
        this.gameStats.point = 100;
      }
    }
    this.scoreText.setText(`Not: ${this.gameStats.point}`);
    this.goodgradesText.setText(this.gameStats.goodgrade);
  }
  collectBadGrade(hulagu, grade) {
    grade.disableBody(true, true);
    if (this.gameStats.point > 0) {
      this.gameStats.badgrade++;
      if (this.gameStats.point > 10) {
        this.gameStats.point-=10;
      }else {
        this.gameStats.point = 0;
      }
    }
    this.scoreText.setText(`Not: ${this.gameStats.point}`);
    this.badgradesText.setText(this.gameStats.badgrade);
  }
}