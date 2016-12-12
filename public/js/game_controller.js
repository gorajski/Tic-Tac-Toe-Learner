var GameController = function() {

	this.player1 = new Player(1, "keyboard");
	this.player2 = new Player(2, "mouse");
 	this.board = new Board();

 	this.current_move = null;
 	this.current_player = this.player1;

 	setInterval(this.gameLoop.bind(this), 100)
}

GameController.prototype.switchPlayer = function() {
	if (this.current_player.number === 1) {
		this.current_player = this.player2;
	} else {
		this.current_player = this.player1;
	}
	console.log(this.current_player)
}

GameController.prototype.resetGame = function() {
	this.board.state = [0,0,0,0,0,0,0,0,0];
	this.current_player = this.player1;
	this.board.updateBoardView();
}

GameController.prototype.takeTurn = function(player, cell_index) {
	isFree = this.board.cellIsFree(cell_index)
	if (isFree) {
		this.board.markAsPlayer(this.current_player, cell_index);
		this.board.updateBoardView();
		this.switchPlayer();
		winner = this.board.checkForWinner();
		if (winner || this.board.checkForFullBoard()) {
			this.resetGame();
		};
	}
	return isFree;
}

GameController.prototype.fetchPlayerMove = function(event) {
	const cell = event.target;
	const cell_index = parseInt($(cell).attr("id")[1]);
	this.current_move = cell_index;
}

GameController.prototype.gameLoop = function() {

	if (this.current_player === this.player2) {
		const state = this.board.state.join('');
		let cell_index = this.current_player.genome[state];
		this.takeTurn(this.current_player, cell_index);
	}

	if (this.current_player === this.player1) {
		$(".cell").on("click", this.fetchPlayerMove.bind(this));
		if (this.current_move != null) {
			let cell_index = this.current_move;
			this.current_move = null;
			$(".cell").off("click");
			this.takeTurn(this.current_player, cell_index);
		}
	}
};

