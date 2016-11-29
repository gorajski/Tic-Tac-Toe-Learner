describe("game play", function() {
	var game;

	beforeEach(function() {
		game = new Game('mouse','mouse');
	});

	it("has game board representation", function() {
		expect(game.board).toEqual([0,0,0,0,0,0,0,0,0]);
	});

	it('has a current player', function() {
		expect(game.current_player.number).toEqual(1);
	});

	describe('winChecker', function() {
		it('detects no winner condition', function() {
			expect(game.winChecker()).toEqual("NO match");
		});

		it('detects player1 win on row 1', function() {
			game.board = [1,1,1,2,2,0,0,0,0];
			expect(game.winChecker()).toEqual(1);
		});

		it('detects player2 win on row 2', function() {
			game.board = [1,0,1,2,2,2,0,1,1];
			expect(game.winChecker()).toEqual(2);
		});

		it('detects player1 win on row 3', function() {
			game.board = [2,0,0,
										0,2,2,
										1,1,1];
			expect(game.winChecker()).toEqual(1);
		});

		it('detects player2 win on column 1', function() {
			game.board = [2,0,1,
										2,0,0,
										2,1,1];
			expect(game.winChecker()).toEqual(2);
		});

		it('detects player1 win on column 2', function() {
			game.board = [2,1,0,
										0,1,2,
										2,1,1];
			expect(game.winChecker()).toEqual(1);
		});

		it('detects player2 win on column 3', function() {
			game.board = [2,1,2,
										1,0,2,
										1,1,2];
			expect(game.winChecker()).toEqual(2);
		});

		it('detects player1 win on downward diagonal', function() {
			game.board = [1,2,0,
										0,1,2,
										2,1,1];
			expect(game.winChecker()).toEqual(1);
		});

		it('detects player2 win on upward diagonal', function() {
			game.board = [1,0,2,
										1,2,0,
										2,1,1];
			expect(game.winChecker()).toEqual(2);
		});

	});

	describe('cellIsFree', function() {
		it('indicates when cell is unmarked', function() {
			game.board = [0,0,0,0,0,0,0,0,0];
			expect(game.cellIsFree(2)).toEqual(true);
		});

		it('indicates when cell is marked', function() {
			game.board = [1,1,0,2,0,2,0,1,2];
			expect(game.cellIsFree(1)).toEqual(false);
		});
	});

	describe('markAsPlayer', function() {
		it("marks the selected cell as the current_player's", function() {
			expect(game.board).toEqual([0,0,0,0,0,0,0,0,0]);
			game.markAsPlayer(2);
			expect(game.board).toEqual([0,0,1,0,0,0,0,0,0]);
		});
	});

	describe('switchPlayer', function() {
		it("toggles the current_player from player1 to player2", function() {
			expect(game.current_player.number).toEqual(1);
			game.switchPlayer();
			expect(game.current_player.number).toEqual(2);
		});

		it("toggles the current_player from player2 to player1", function() {
			game.current_player = 2;
			game.switchPlayer();
			expect(game.current_player.number).toEqual(1);
		});
	});

	describe('resetGame', function() {
		it("clears the board and sets current_player as player1", function() {
			game.board = [1,2,0,1,0,1,0,2,2];
			game.current_player = this.player2;
			game.resetGame();
			expect(game.board).toEqual([0,0,0,0,0,0,0,0,0]);
			expect(game.current_player.number).toEqual(1);
		});
	});

	describe('checkForWinner', function() {
		it("returns the winner and resets the game", function() {
			game.board = [2,1,2,
										1,0,2,
										1,1,2];
			game.current_player = 2;
			expect(game.checkForWinner()).toEqual(2);
			expect(game.board).toEqual([0,0,0,0,0,0,0,0,0]);
			expect(game.current_player).toEqual(game.player1);
		});

		it("returns null results when no winner", function() {
			game.board = [2,1,2,
										1,0,0,
										1,1,2];
			game.current_player = game.player2;
			expect(game.checkForWinner()).toEqual(null);
			expect(game.board).toEqual([2,1,2,1,0,0,1,1,2]);
			expect(game.current_player).toEqual(game.player2);
		});
	});

	describe('isBoardFull', function() {
		it("detects board is full and resets the game", function() {
			game.board = [1,1,2,
										2,1,1,
										1,2,2];
			game.current_player = game.player2;
			expect(game.isBoardFull()).toEqual(true);
			expect(game.board).toEqual([0,0,0,0,0,0,0,0,0]);
			expect(game.current_player).toEqual(game.player1);
		});

		it("detects board is not full and returns null result", function() {
			game.board = [1,1,2,
										2,1,0,
										1,2,2];
			game.current_player = game.player2;
			expect(game.isBoardFull()).toEqual(false);
			expect(game.board).toEqual([1,1,2,2,1,0,1,2,2]);
			expect(game.current_player).toEqual(game.player2);
		});
	});

});