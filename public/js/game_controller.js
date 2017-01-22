let GameController = function(board, player1, player2) {
 	this.board = board;
 	this.isComplete = false;
	
	this.player1 = player1;
	this.player2 = player2;

 	this.currentMove = null;
 	this.currentPlayer = this.player1;
 	this.currentPiece = 1;
};

// Jasmine Tested *****Needs update
GameController.prototype.switchPlayer = function() {
	(this.currentPlayer === this.player1) ? this.currentPlayer = this.player2 : this.currentPlayer = this.player1;
	(this.currentPiece === 1) ? this.currentPiece = 2 : this.currentPiece = 1;
};

// Jasmine Tested *****Needs update
GameController.prototype.resetGame = function() {
	this.board.state = [0,0,0,0,0,0,0,0,0];
	this.currentPlayer = this.player1;
	this.currentPiece = 1;
	this.isComplete = false;
	this.board.updateBoardView();
};

GameController.prototype.takeTurn = function(player, cellIndex) {
	let isFree = this.board.cellIsFree(cellIndex);
	if (isFree) {

		this.board.placePiece(this.currentPiece, cellIndex);
		this.board.updateBoardView();
		this.switchPlayer();
		let winner = this.board.checkForWinner();
		if (winner) {
			// console.log("Player " + winner + " won Game " + this.board.htmlElement.toString());
			// setTimeout(this.resetGame.bind(this), 40);
			// this.resetGame();	//use this if no delay is required between wins
			(this.currentPlayer === this.player1) ? this.currentPlayer.fitness += 10 : this.currentPlayer.fitness += 11;
			this.isComplete = true;
			return this.currentPlayer;
		} else if (this.board.checkForFullBoard()) {
			if (this.player1 === this.player2) {
				this.player1.fitness += 30;
			} else {
				this.player1.fitness += 30;
				this.player2.fitness += 30;
			}
			return 'draw'
		} else {
			return 'Gameplay continues...'
		}
	} else {
		this.currentPlayer.fitness -= 2;
		this.isComplete = true;
		return 'illegal move'
	}
};

GameController.prototype.fetchPlayerMove = function(event) {
	const cell = event.target;
	const cellIndex = parseInt($(cell).attr("class")[1]);
	this.currentMove = cellIndex;
};

GameController.prototype.gameClock = function() {
	if (this.currentPlayer.type === 'human') {
		this.board.htmlElement.on("click", this.fetchPlayerMove.bind(this));
		if (this.currentMove != null) {
			let cellIndex = this.currentMove;
			this.currentMove = null;
			this.board.htmlElement.off("click");
			return this.takeTurn(this.currentPlayer, cellIndex);
		}
	}

	if (this.currentPlayer.type === 'computer') {
		const state = this.board.state.join('');
		let cellIndex = this.currentPlayer.genome[state];
		return this.takeTurn(this.currentPlayer, cellIndex);
	}

};