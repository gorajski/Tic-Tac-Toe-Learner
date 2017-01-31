let GameController = function(board, player1, player2) {
 	this.board = board;
 	this.isComplete = false;
	
	this.player1 = player1;
	this.player2 = player2;

 	this.currentMove = null;
 	this.currentPlayer = this.player1;
 	this.currentPiece = 1;
};

// Jasmine Tested
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

GameController.prototype.takeTurn = function(cellIndex) {
	let isFree = this.board.cellIsFree(cellIndex);

	if (isFree) {
		this.board.placePiece(this.currentPiece, cellIndex)
		this.board.updateBoardView();
	} else {
		console.log('illegal move')
		return 'illegal move'
	}

	let result = null;
	let winner = this.board.checkForWinner();
	if (winner) {
		this.winnerLogic();
		result = this.currentPlayer;
	} else if (this.board.checkForFullBoard()) {
		this.fullBoardLogic();
		result = 'draw'
	} else {
		result = 'Gameplay continues...'
	}

	this.switchPlayer();
	return result;
};

GameController.prototype.winnerLogic = function() {
	(this.currentPlayer === this.player1) ? this.currentPlayer.fitness += 10 : this.currentPlayer.fitness += 11;
	this.isComplete = true;
};

GameController.prototype.fullBoardLogic = function() {
	if (this.player1 === this.player2) {
		this.player1.fitness += 30;
	} else {
		this.player1.fitness += 30;
		this.player2.fitness += 30;
	}
	this.isComplete = true;
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
			return this.takeTurn(cellIndex);
		}
	}

	if (this.currentPlayer.type === 'computer') {
		const state = this.board.state.join('');
		if (this.currentPlayer.genome[state] === undefined) {
			console.log(state)
		}
		let cellIndex = this.currentPlayer.genome[state];
		return this.takeTurn(cellIndex);
	}

};