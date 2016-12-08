var Board = function(player1, player2) {
	this.board = [
							  0,0,0,
								0,0,0,
								0,0,0 
											];
	this.player1 = player1;
	this.player2 = player2;
	
	this.current_player = player1;

	this.current_move = null;
};

Board.prototype.play = function() {

	let gameLoop = setInterval( () => {

		if (this.current_player === this.player2) {
			const state = this.board.join('');
			var p2 = this.current_player.genome;
			this.takeTurn(this.current_player.genome[state]);
		}

		if (this.current_player === this.player1) {
			$(".cell").on("click", this.fetchPlayerMove.bind(this));
			if (this.current_move != null) {
				cell_index = this.current_move;
				this.current_move = null;
				this.takeTurn(cell_index);
				$(".cell").off("click");
			}
		}
	}, 100);

};


Board.prototype.fetchPlayerMove = function(event) {
	const cell = event.target;
	const cell_index = parseInt($(cell).attr("id")[1]);
	this.current_move = cell_index;

}


Board.prototype.takeTurn = function(cell_index) {
	isFree = this.cellIsFree(cell_index)
	if (isFree) {
		this.markAsPlayer(cell_index);
		this.switchPlayer();
		this.updateBoardView();
		this.checkForWinner();
		this.checkForFullBoard();
	}
	return isFree;
}

// Jasmine Tested
Board.prototype.winChecker = function() {		
	if ((this.board[0] === 1 || this.board[0] === 2) && this.board[0] === this.board[4] && this.board[0] === this.board[8]) {
			return this.board[0]; }  // downward diagonal
	if ((this.board[2] === 1 || this.board[2] === 2) && this.board[2] === this.board[4] && this.board[2] === this.board[6]) {
			return this.board[2]; }  // upward diagonal
	for (let i = 0; i < 3; i++) {
		if ((this.board[3*i] === 1 || this.board[3*i] === 2) && this.board[3*i] === this.board[3*i+1] && this.board[3*i] === this.board[3*i+2]) {
			return this.board[3*i]; }  // matching row
		if ((this.board[i] === 1 || this.board[i] === 2) && this.board[i] === this.board[i+3] && this.board[i] === this.board[i+6]) {
			return this.board[i]; }  // matching column
	}

	return "NO match"
	
};

// Jasmine Tested
Board.prototype.cellIsFree = function(cell) {
	return this.board[cell] === 0;
};

// Jasmine Tested
Board.prototype.markAsPlayer = function(cell) {
	this.board[cell] = this.current_player.number;
}

// Jasmine Tested
Board.prototype.switchPlayer = function() {
	if (this.current_player.number === 1) {
		this.current_player = this.player2;
	} else {
		this.current_player = this.player1;
	}
}


Board.prototype.updateBoardView = function() {
	const $cells = $(".cell");
	for (let i = 0; i < $cells.length; i++) {
		let mark = "";
		if (this.board[i] === 1) {
			mark = "X";
		}
		if (this.board[i] === 2) {
			mark = "O";
		}
		$($cells[i]).html(mark);
	}
}

// Jasmine Tested
Board.prototype.resetGame = function() {
	this.board = [0,0,0,0,0,0,0,0,0];
	this.current_player = this.player1;
	this.updateBoardView();
}

// Jasmine Tested
Board.prototype.checkForWinner = function() {
	const winner = this.winChecker();
	if (winner != "NO match") {
		console.log(winner);
		this.resetGame();
		return winner;
	}
	return null;
}

// Jasmine Tested
Board.prototype.checkForFullBoard = function() {
	var isFull = true;
	for (var i = 0; i < this.board.length; i++) {
		isFull = isFull && (this.board[i] != 0);
	}
	if (isFull) {
		console.log("No winner!")
		this.resetGame();
		return true;
	}
	return false;
}
