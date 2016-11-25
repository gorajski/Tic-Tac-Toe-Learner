$(document).ready(function() {
 
	var game = function() {
		var board = [
								  0,0,0,
									0,0,0,
									0,0,0 
												];
		
		var current_player = 1;

		var winChecker = function() {
			if ((board[0] === 1 || board[0] === 2) && board[0] === board[4] && board[0] === board[8]) {
					return "downward diagonal - " + board[0] }
			if ((board[2] === 1 || board[2] === 2) && board[2] === board[4] && board[2] === board[6]) {
					return "upward diagonal - " + board[2] }
			for (var i = 0; i < 3; i++) {
				if ((board[3*i] === 1 || board[3*i] === 2) && board[3*i] === board[3*i+1] && board[3*i] === board[3*i+2]) {
					return "matching ROWS - " + board[3*i] }
				if ((board[i] === 1 || board[i] === 2) && board[i] === board[i+3] && board[i] === board[i+6]) {
					return "matching COLUMNS - " + board[i] }
			 
				// console.log(board[3*i))
				// console.log(board[3*i) === "X" || board[3*i) === "O")
				// console.log(board[3*i) === board[3*i+1) && board[i) === board[3*i+2))
				// console.log(board[i) === board[i+3) && board[i) === board[i+6))
			}

			return "NO match"
			
		};

		var cellIsFree = function(cell) {
			return board[cell] === 0;
		};

		var markAsPlayer = function(cell) {
			board[cell] = current_player;
		}

		var switchPlayer = function() {
			if (current_player === 1) {
				current_player = 2;
			} else {
				current_player = 1;
			}
		}

		var updateBoard = function() {
			var $cells = $(".cell");
			for (var i = 0; i < $cells.length; i++) {
				var mark = ""
				if (board[i] === 1) {
					mark = "X"
				}
				if (board[i] === 2) {
					mark = "O"
				}
				$($cells[i]).html(mark);
			}
		}

		var resetGame = function() {
			board = [0,0,0,0,0,0,0,0,0];
			current_player = 1;
			updateBoard();
		}

		var checkForWinner = function() {
			var winner = winChecker();
			if (winner != "NO match") {
				console.log(winner);
				resetGame();
			}
		}

		$(".cell").on("click", function() {
			cell_index = parseInt($(this).attr("id")[1]);
			if (cellIsFree(cell_index)) {
				markAsPlayer(cell_index);
				updateBoard();
				switchPlayer();
				checkForWinner();
			}

		})

	}

	game();
});
