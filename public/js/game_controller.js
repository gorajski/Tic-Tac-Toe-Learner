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

// Jasmine Tested
GameController.prototype.resetGame = function() {
	console.log('reset')
	this.board.state = [0,0,0,0,0,0,0,0,0];
	this.currentPlayer = this.player1;
	this.currentPiece = 1;
	this.isComplete = false;
	this.board.updateBoardView();
};

// Jasmine Tested
GameController.prototype.takeTurn = function(cellIndex) {
	let isFree = this.board.cellIsFree(cellIndex);

	if (isFree) {
		this.board.placePiece(this.currentPiece, cellIndex);
		this.board.updateBoardView();
	} else if (!this.board.checkForFullBoard()) {
		console.log('illegal move')
		return 'illegal move';
	}

	let winner = this.board.checkForWinner();
	if (winner) {
		this.isComplete = true;
		return this.currentPlayer;
	} else if (this.board.checkForFullBoard()) {
		this.isComplete = true;
		return 'draw';
	} else {
		this.switchPlayer();
		return 'Gameplay continues...';
	}

};

GameController.prototype.fetchPlayerMove = function(event) {
	const cell = event.target;
	const cellIndex = parseInt($(cell).attr("class")[1]);
	this.currentMove = cellIndex;
};

//Jasmine Tested for 'computer' only
GameController.prototype.gameClock = function() {
	if (!this.isComplete) {
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
			let cellIndex = this.currentPlayer.genome[state];
			return this.takeTurn(cellIndex);
		}
	} 
};