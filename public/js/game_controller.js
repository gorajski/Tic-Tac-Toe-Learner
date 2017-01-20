let GameController = function(board, player1, player2) {
 	this.board = board;
 	this.isComplete = false;
	
	this.player1 = player1;		//Do I need to clone here?
	this.player2 = player2;

 	this.current_move = null;
 	this.current_player = this.player1;
 	this.currentPiece = 1;

}

// Jasmine Tested
GameController.prototype.switchPlayer = function() {
	if (this.current_player === this.player1) {
		this.current_player = this.player2;
		this.currentPiece = 2;
	} else {
		this.current_player = this.player1;
		this.currentPiece = 1;
		console.log('here')
	}
	// console.log(this.current_player)
}

// Jasmine Tested
GameController.prototype.resetGame = function() {
	this.board.state = [0,0,0,0,0,0,0,0,0];
	this.current_player = this.player1;
	this.currentPiece = 1;
	this.isComplete = false;
	this.board.updateBoardView();
}

GameController.prototype.takeTurn = function(player, cell_index) {
	let isFree = this.board.cellIsFree(cell_index);
	if (isFree) {

		this.board.placePiece(this.currentPiece, cell_index);
		this.board.updateBoardView();
		this.switchPlayer();
		let winner = this.board.checkForWinner();		//null     For debugging
		if (winner) {
			// console.log("Player " + winner + " won Game " + this.board.html_element.toString());
			// setTimeout(this.resetGame.bind(this), 40);
			// this.resetGame();	//use this if no delay is required between wins
			// console.log("before:" + this.current_player.fitness.toString());
			(this.current_player === this.player1) ? this.current_player.fitness += 1 : this.current_player.fitness += 1.1;
			// console.log("after:" + this.current_player.fitness.toString());
			this.isComplete = true;
			return this.current_player;
		} else if (this.board.checkForFullBoard()) { //null     For debugging
			this.player1.fitness += 3;
			this.player2.fitness += 3;
			return 'draw'
		} else {
			return 'Gameplay continues...'
		}
	} else {
			console.log('here')
		this.current_player.fitness -= 1;
		this.isComplete = true;
		return 'illegal move'
	}
}

GameController.prototype.fetchPlayerMove = function(event) {
	const cell = event.target;
	const cell_index = parseInt($(cell).attr("class")[1]);
	this.current_move = cell_index;
}

GameController.prototype.gameClock = function() {
	if (this.current_player.type === 'human') {
		this.board.html_element.on("click", this.fetchPlayerMove.bind(this));
		if (this.current_move != null) {
			let cell_index = this.current_move;
			this.current_move = null;
			this.board.html_element.off("click");
			return this.takeTurn(this.current_player, cell_index);
		}
	}

	if (this.current_player.type === 'computer') {
		const state = this.board.state.join('');
		let cell_index = this.current_player.genome[state];
		return this.takeTurn(this.current_player, cell_index);
	}

};

