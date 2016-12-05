var Game = function(player1, player2) {
	this.board = [
							  0,0,0,
								0,0,0,
								0,0,0 
											];
	this.player1 = player1;
	this.player2 = player2;
	
	this.current_player = player1;

	this.current_move = null;
	// this.i = 150;
};

Game.prototype.play = function() {
	var g = this;

	var gameLoop = setInterval( () => {
	// this.i = this.i + 1;
	// console.log('rotate(' + this.i + 'deg)')

	// $('#board').css('-ms-transform', 'rotate(' + this.i + 'deg)');
	// $('#board').css('-webkit-transform', 'rotate(' + this.i + 'deg)');
	// $('#board').css('transform', 'rotate(' + this.i + 'deg)');
	// $('#board').css('width', 2*this.i);
	// $('#board').css('height', 2*this.i);

		if (this.current_player === this.player2) {
			var state = this.board.join('');
			console.log('hi')
			var p2 = { '000000001': 0, '200000011': 1, '220001011': 3, '220201011': 4, '220221011': 6 };
			console.log(p2[state])
			this.takeTurn(p2[state]);
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
	// var myCount = setInterval(function() {
	// 	// console.log(g.current_player)
	// 	if (g.current_move != null) {
	// 		console.log('success!')
	// 		// g.current_move = null;
	// 		clearInterval(myCount)
	// 	}
	// }
	// , 300);

};

// Game.prototype.playing = 

	// $(document).on('keyup', function() {
	// 	// g.switchPlayer();
	// 	g.current_player = g.player1;
	// 	console.log(g.current_player);		
	// });


Game.prototype.fetchPlayerMove = function(event) {
	var cell = event.target;
	var cell_index = parseInt($(cell).attr("id")[1]);
	this.current_move = cell_index;
	// console.log(this.current_move)

	// 	this.markAsPlayer(cell_index);
	// 	this.switchPlayer();
	// 	this.updateBoard();
	// 	this.checkForWinner();
	// 	this.checkForFullBoard();
		// this.takeTurn(cell_index);
		// console.log(cell_index)

}

Game.prototype.takeTurn = function(cell_index) {
	if (this.cellIsFree(cell_index) ) {  // && this.current_player == this.player1     SAVE FOR LATER
		this.markAsPlayer(cell_index);
		this.switchPlayer();
		this.updateBoard();
		this.checkForWinner();
		this.checkForFullBoard();
	}
}

Game.prototype.winChecker = function() {
	if ((this.board[0] === 1 || this.board[0] === 2) && this.board[0] === this.board[4] && this.board[0] === this.board[8]) {
			return this.board[0]; }  // downward diagonal
	if ((this.board[2] === 1 || this.board[2] === 2) && this.board[2] === this.board[4] && this.board[2] === this.board[6]) {
			return this.board[2]; }  // upward diagonal
	for (var i = 0; i < 3; i++) {
		if ((this.board[3*i] === 1 || this.board[3*i] === 2) && this.board[3*i] === this.board[3*i+1] && this.board[3*i] === this.board[3*i+2]) {
			return this.board[3*i]; }  // matching row
		if ((this.board[i] === 1 || this.board[i] === 2) && this.board[i] === this.board[i+3] && this.board[i] === this.board[i+6]) {
			return this.board[i]; }  // matching column
	}

	return "NO match"
	
};

Game.prototype.cellIsFree = function(cell) {
	return this.board[cell] === 0;
};

Game.prototype.markAsPlayer = function(cell) {
	this.board[cell] = this.current_player.number;
}

Game.prototype.switchPlayer = function() {
	if (this.current_player.number === 1) {
		this.current_player = this.player2;
	} else {
		this.current_player = this.player1;
	}
}

Game.prototype.updateBoard = function() {
	var $cells = $(".cell");
	for (var i = 0; i < $cells.length; i++) {
		var mark = "";
		if (this.board[i] === 1) {
			mark = "X";
		}
		if (this.board[i] === 2) {
			mark = "O";
		}
		$($cells[i]).html(mark);
	}
}

Game.prototype.resetGame = function() {
	this.board = [0,0,0,0,0,0,0,0,0];
	this.current_player = this.player1;
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

Game.prototype.checkForFullBoard = function() {
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
