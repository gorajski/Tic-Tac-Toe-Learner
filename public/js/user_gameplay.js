let UserGameplay = function(player) {
	this.htmlElement = htmlElement;
	this.computerPlayer = player;
	this.humanPlayer = new Player('human');
	let boardView = new BoardView($('#challenge-board'));
	let board = new Board(boardView);
	this.game = new GameController(this.board, this.humanPlayer, this.computerPlayer);
};

UserGameplay.prototype.runGame = function(game) {
	let result = this.game.gameClock();
	if (this.game.isComplete) {
		setTimeout(function() { 
			this.game.resetGame();
			timer = setTimeout(function() { this.runGame(this.game); }, 70);
			$(game.board.htmlElement).find(".cell").css('border-color','#ff8007');
		}, 700);
	} else {
		timer = setTimeout(function() { runGame(game); }, 70);
	}
};