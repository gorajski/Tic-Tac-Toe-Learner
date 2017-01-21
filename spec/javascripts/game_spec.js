describe("Game object", function() {
	
	beforeEach(function() {		
		player1 = new Player("computer");
		player2 = new Player("computer");
		board = new Board($("#dummy_entry"));
		game = new GameController(board, player1, player2);
	});

	it('has a current player', function() {
		expect(game.currentPlayer.number).toEqual(1);
	});

	it('has a current move', function() {
		expect(game.currentMove).toEqual(null);
	});

	describe('.switchPlayer', function() {
		it("toggles the currentPlayer from player1 to player2", function() {
			expect(game.currentPlayer.number).toEqual(1);
			game.switchPlayer();
			expect(game.currentPlayer.number).toEqual(2);
		});

		it("toggles the currentPlayer from player2 to player1", function() {
			game.currentPlayer = 2;
			game.switchPlayer();
			expect(game.currentPlayer.number).toEqual(1);
		});
	});

	describe('.resetGame', function() {
		it("clears the board and sets currentPlayer as player1", function() {
			game.board.state = [1,2,0,1,0,1,0,2,2];
			game.currentPlayer = game.player2;
			game.resetGame();
			expect(game.board.state).toEqual([0,0,0,0,0,0,0,0,0]);
			expect(game.currentPlayer.number).toEqual(1);
		});
	});

	describe('.takeTurn', function() {
		it("returns false and takes no action when chosen cell is not available", function() {
			game.board.state = [1,2,0,1,0,1,0,2,2];
			game.currentPlayer = game.player1;
			result = game.takeTurn(game.currentPlayer, 1);
			expect(game.board.state).toEqual([1,2,0,1,0,1,0,2,2]);
			expect(game.currentPlayer.number).toEqual(1);
			expect(result).toEqual('illegal move');
		});

		it("returns true when chosen cell is not available", function() {
			game.board.state = [1,2,0,1,0,1,0,2,2];
			game.currentPlayer = game.player1;
			result = game.takeTurn(game.currentPlayer, 2);
			expect(game.board.state).toEqual([1,2,1,1,0,1,0,2,2]);
			expect(game.currentPlayer.number).toEqual(2);
			expect(result).toEqual('Gameplay continues...');		// Currently, this returns whether the cell was available or not.
		});

		describe('setTimeout after win', function() {

			beforeEach(function() {
		    jasmine.clock().install();
		  });

			afterEach(function() {
		    jasmine.clock().uninstall();
		  });

			it("resets the board 40ms", function() {
				game.board.state = [1,2,0,1,0,1,0,2,2];
				game.currentPlayer = game.player2;
				result = game.takeTurn(game.currentPlayer, 4);

				jasmine.clock().tick(40);

				expect(game.board.state).toEqual([0,0,0,0,0,0,0,0,0]);
				expect(game.currentPlayer.number).toEqual(1);
				expect(result).toEqual(game.player1);
			});

			it("does not reset the board until 40ms", function() {
				game.board.state = [1,2,0,1,0,1,0,2,2];
				game.currentPlayer = game.player2;
				result = game.takeTurn(game.currentPlayer, 4);

				jasmine.clock().tick(39);

				expect(game.board.state).not.toEqual([0,0,0,0,0,0,0,0,0]);
			});
		});
	});

});