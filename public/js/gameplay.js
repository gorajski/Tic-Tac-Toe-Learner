var Game = function() {
	this.board = [
							  0,0,0,
								0,0,0,
								0,0,0 
											];
	
	this.current_player = 1;
}

Game.prototype.play = function() {
	var g = this;
	$(".cell").on("click", function() {
		cell_index = parseInt($(this).attr("id")[1]);
		if (g.cellIsFree(cell_index)) {
			g.markAsPlayer(cell_index);
			g.updateBoard();
			g.switchPlayer();
			g.checkForWinner();
			g.isBoardFull();
		}

	})
}

Game.prototype.winChecker = function() {
	if ((this.board[0] === 1 || this.board[0] === 2) && this.board[0] === this.board[4] && this.board[0] === this.board[8]) {
			return this.board[0] }  // downward diagonal
	if ((this.board[2] === 1 || this.board[2] === 2) && this.board[2] === this.board[4] && this.board[2] === this.board[6]) {
			return this.board[2] }  // upward diagonal
	for (var i = 0; i < 3; i++) {
		if ((this.board[3*i] === 1 || this.board[3*i] === 2) && this.board[3*i] === this.board[3*i+1] && this.board[3*i] === this.board[3*i+2]) {
			return this.board[3*i] }  // matching row
		if ((this.board[i] === 1 || this.board[i] === 2) && this.board[i] === this.board[i+3] && this.board[i] === this.board[i+6]) {
			return this.board[i] }  // matching column
	 
		// console.log(board[3*i))
		// console.log(board[3*i) === "X" || board[3*i) === "O")
		// console.log(board[3*i) === board[3*i+1) && board[i) === board[3*i+2))
		// console.log(board[i) === board[i+3) && board[i) === board[i+6))
	}

	return "NO match"
	
};

Game.prototype.cellIsFree = function(cell) {
	return this.board[cell] === 0;
};

Game.prototype.markAsPlayer = function(cell) {
	this.board[cell] = this.current_player;
}

Game.prototype.switchPlayer = function() {
	if (this.current_player === 1) {
		this.current_player = 2;
	} else {
		this.current_player = 1;
	}
}

Game.prototype.updateBoard = function() {
	var $cells = $(".cell");
	for (var i = 0; i < $cells.length; i++) {
		var mark = ""
		if (this.board[i] === 1) {
			mark = "X"
		}
		if (this.board[i] === 2) {
			mark = "O"
		}
		$($cells[i]).html(mark);
	}
}

Game.prototype.resetGame = function() {
	this.board = [0,0,0,0,0,0,0,0,0];
	this.current_player = 1;
	this.updateBoard();
}

Game.prototype.checkForWinner = function() {
	var winner = this.winChecker();
	if (winner != "NO match") {
		console.log(winner);
		this.resetGame();
		return winner;
	}
	return null;
}

Game.prototype.isBoardFull = function() {
	var isFull = true;
	for (var i = 0; i < this.board.length; i++) {
		isFull = isFull && (this.board[i] != 0)
	}
	if (isFull) {
		console.log("No winner!")
		this.resetGame();
		return true;
	}
	return false;
}
