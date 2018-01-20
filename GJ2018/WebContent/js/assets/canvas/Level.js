class Level extends Phaser.State {
	init() {
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.stage.backgroundColor = '#ffffff';
	}

	preload() {

	}

	create() {
		this.add.text(344, 292, 'Hello world!', { font: 'bold 20px Arial' });
	}
}

export default Level;
