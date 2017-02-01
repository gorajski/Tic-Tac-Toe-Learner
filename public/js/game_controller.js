let GameController = function(board, player1, player2) {
 	this.rewardProfile = { "1" : 10, "2" : 11, "draw" : 30 };
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
		this.winnerLogic();
		return this.currentPlayer;
	} else if (this.board.checkForFullBoard()) {
		this.fullBoardLogic();
		return 'draw'
	} else {
		this.switchPlayer();
		return 'Gameplay continues...'
	}

};

// Not tested yet 
GameController.prototype.winnerLogic = function() {
	this.currentPlayer.fitness += this.rewardProfile[this.currentPiece];
	this.isComplete = true;
};

// Not tested yet 
GameController.prototype.fullBoardLogic = function() {
	if (this.player1 === this.player2) {
		this.player1.fitness += this.rewardProfile["draw"];
	console.log('hi')
	} else {
		this.player1.fitness += this.rewardProfile["draw"];
		this.player2.fitness += this.rewardProfile["draw"];
		console.log('bye')
	}
	this.isComplete = true;
};

GameController.prototype.fetchPlayerMove = function(event) {
	const cell = event.target;
	const cellIndex = parseInt($(cell).attr("class")[1]);
	this.currentMove = cellIndex;
};

//Jasmine Tested for 'computer' only
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
		let cellIndex = this.currentPlayer.genome[state];
		return this.takeTurn(cellIndex);
	}

};