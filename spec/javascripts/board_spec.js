describe("game play", function() {
	var game, player1, player2;

	beforeEach(function() {
		player1 = new Player(1, "keyboard");
		player2 = new Player(2, "mouse");
		board = new Board(player1, player2);
	});

	it("has board representation", function() {
		expect(board.state).toEqual([0,0,0,0,0,0,0,0,0]);
	});

	// it('has a current player', function() {
	// 	console.log(board.current_player)
	// 	expect(board.current_player.number).toEqual(1);
	// });

	describe('winChecker', function() {
		it('detects no winner condition', function() {
			expect(board.checkForWinner()).toEqual(null);
		});

		it('detects player1 win on row 1', function() {
			board.state = [1,1,1,2,2,0,0,0,0];
			expect(board.checkForWinner()).toEqual(1);
		});

		it('detects player2 win on row 2', function() {
			board.state = [1,0,1,2,2,2,0,1,1];
			expect(board.checkForWinner()).toEqual(2);
		});

		it('detects player1 win on row 3', function() {
			board.state = [2,0,0,
										0,2,2,
										1,1,1];
			expect(board.checkForWinner()).toEqual(1);
		});

		it('detects player2 win on column 1', function() {
			board.state = [2,0,1,
										2,0,0,
										2,1,1];
			expect(board.checkForWinner()).toEqual(2);
		});

		it('detects player1 win on column 2', function() {
			board.state = [2,1,0,
										0,1,2,
										2,1,1];
			expect(board.checkForWinner()).toEqual(1);
		});

		it('detects player2 win on column 3', function() {
			board.state = [2,1,2,
										1,0,2,
										1,1,2];
			expect(board.checkForWinner()).toEqual(2);
		});

		it('detects player1 win on downward diagonal', function() {
			board.state = [1,2,0,
										0,1,2,
										2,1,1];
			expect(board.checkForWinner()).toEqual(1);
		});

		it('detects player2 win on upward diagonal', function() {
			board.state = [1,0,2,
										1,2,0,
										2,1,1];
			expect(board.checkForWinner()).toEqual(2);
		});

	});

	describe('cellIsFree', function() {
		it('indicates when cell is unmarked', function() {
			board.state = [0,0,0,0,0,0,0,0,0];
			expect(board.cellIsFree(2)).toEqual(true);
		});

		it('indicates when cell is marked', function() {
			board.state = [1,1,0,2,0,2,0,1,2];
			expect(board.cellIsFree(1)).toEqual(false);
		});
	});

	describe('markAsPlayer', function() {
		it("marks the selected cell as the current_player's", function() {
			expect(board.state).toEqual([0,0,0,0,0,0,0,0,0]);
			board.markAsPlayer(player1, 2);
			expect(board.state).toEqual([0,0,1,0,0,0,0,0,0]);
		});
	});

	// pending('switchPlayer', function() {
	// 	it("toggles the current_player from player1 to player2", function() {
	// 		expect(game.current_player.number).toEqual(1);
	// 		game.switchPlayer();
	// 		expect(game.current_player.number).toEqual(2);
	// 	});

	// 	it("toggles the current_player from player2 to player1", function() {
	// 		game.current_player = 2;
	// 		game.switchPlayer();
	// 		expect(game.current_player.number).toEqual(1);
	// 	});
	// });

	// describe('resetGame', function() {
	// 	it("clears the board and sets current_player as player1", function() {
	// 		game.state = [1,2,0,1,0,1,0,2,2];
	// 		game.current_player = this.player2;
	// 		game.resetGame();
	// 		expect(game.state).toEqual([0,0,0,0,0,0,0,0,0]);
	// 		expect(game.current_player.number).toEqual(1);
	// 	});
	// });

	// describe('checkForWinner', function() {
	// 	it("returns the winner and resets the game", function() {
	// 		game.state = [2,1,2,
	// 									1,0,2,
	// 									1,1,2];
	// 		game.current_player = 2;
	// 		expect(game.checkForWinner()).toEqual(2);
	// 		expect(game.state).toEqual([0,0,0,0,0,0,0,0,0]);
	// 		expect(game.current_player).toEqual(game.player1);
	// 	});

	// 	it("returns null results when no winner", function() {
	// 		game.state = [2,1,2,
	// 									1,0,0,
	// 									1,1,2];
	// 		game.current_player = game.player2;
	// 		expect(game.checkForWinner()).toEqual(null);
	// 		expect(game.state).toEqual([2,1,2,1,0,0,1,1,2]);
	// 		expect(game.current_player).toEqual(game.player2);
	// 	});
	// });

		describe('checkForWinner', function() {
		it("returns the winner", function() {
			board.state = [2,1,2,
										1,0,2,
										1,1,2];
			board.current_player = board.player2;
			expect(board.checkForWinner()).toEqual(2);
		});

		it("returns null results when no winner", function() {
			board.state = [2,1,2,
										1,0,0,
										1,1,2];
			board.current_player = board.player2;
			expect(board.checkForWinner()).toEqual(null);
		});
	});

	describe('checkForFullBoard', function() {
		it("detects board is full and returns true", function() {
			board.state = [1,1,2,
										2,1,1,
										1,2,2];
			board.current_player != board.player2;
			expect(board.checkForFullBoard()).toEqual(true);
		});

		it("detects board is not full and returns false", function() {
			board.state = [1,1,2,
										2,1,0,
										1,2,2];
			board.current_player = board.player2;
			expect(board.checkForFullBoard()).toEqual(false);
		});
	});

});