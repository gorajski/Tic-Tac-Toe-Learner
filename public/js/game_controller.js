let GameController = function(board, player1, player2) {

 	this.board = board;
	this.player1 = Object.assign({}, player1);
	this.player1.number = 1;
	this.player2 = Object.assign({}, player2);
	this.player2.number = 2;

 	this.current_move = null;
 	this.current_player = this.player1;

 	// setInterval(this.gameClock.bind(this), 100)
}

// Jasmine Tested
GameController.prototype.switchPlayer = function() {
	if (this.current_player === this.player1) {
		this.current_player = this.player2;
	} else {
		this.current_player = this.player1;
	}
	// console.log(this.current_player)
}

// Jasmine Tested
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
	console.log
	const cell_index = parseInt($(cell).attr("class")[1]);
	this.current_move = cell_index;
}

GameController.prototype.gameClock = function() {

	if (this.current_player.type === 'human') {
		// console.log(this.board.html_element)
		// console.log($("#board"))
		this.board.html_element.on("click", this.fetchPlayerMove.bind(this));
		if (this.current_move != null) {
			let cell_index = this.current_move;
			this.current_move = null;
			this.board.html_element.off("click");
			this.takeTurn(this.current_player, cell_index);
		}
	}


	if (this.current_player.type === 'computer') {
		const state = this.board.state.join('');
		let cell_index = this.current_player.genome[state];
		this.takeTurn(this.current_player, cell_index);
	}

};

