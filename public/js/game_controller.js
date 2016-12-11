var GameController = function() {

	var player1 = new Player(1, "keyboard");
	var player2 = new Player(2, "mouse");
 	this.board = new Board(player1, player2);
 	setInterval(this.gameLoop.bind(this), 100)
}

GameController.prototype.fetchPlayerMove = function(event) {
	const cell = event.target;
	const cell_index = parseInt($(cell).attr("id")[1]);
	this.board.current_move = cell_index;		// CHANGE CURRENT MOVE TO CONTROLLER VARIABLE

}

GameController.prototype.switchPlayer = function() {
	if (this.board.current_player.number === 1) {
		this.board.current_player = this.board.player2;
	} else {
		this.board.current_player = this.board.player1;
	}
	console.log(this.board.current_player)
}

GameController.prototype.resetGame = function() {
	this.board.state = [0,0,0,0,0,0,0,0,0];
	this.board.current_player = this.board.player1;
	this.board.updateBoardView();
}

GameController.prototype.takeTurn = function(player, cell_index) {
	isFree = this.board.cellIsFree(cell_index)
	if (isFree) {
		this.board.markAsPlayer(this.board.current_player, cell_index);
		this.switchPlayer();
		this.board.updateBoardView();
		winner = this.board.checkForWinner();
		if (winner || this.board.checkForFullBoard()) {
			this.resetGame();
		};
	}
	return isFree;
}

GameController.prototype.gameLoop = function() {

	if (this.board.current_player === this.board.player2) {
 	console.log(this.board.current_player.genome[this.board.state])
		const state = this.board.state.join('');
		var p2 = this.board.current_player.genome;
		this.takeTurn(this.board.current_player, this.board.current_player.genome[state]);
	}

	if (this.board.current_player === this.board.player1) {
		$(".cell").on("click", this.fetchPlayerMove.bind(this));
		if (this.board.current_move != null) {
			cell_index = this.board.current_move;
			this.board.current_move = null;
			this.takeTurn(this.board.current_player, cell_index);
			$(".cell").off("click");
		}
	}
};

