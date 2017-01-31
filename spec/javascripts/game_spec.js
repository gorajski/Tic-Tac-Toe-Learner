describe("Game object", function() {
	var player1, player2, board, game;
	
	beforeEach(function() {		
		player1 = new Player("computer");
		player2 = new Player("computer");
		board = new Board($("#dummy_entry"));
		game = new GameController(board, player1, player2);
	});

	it('has a game over flag', function() {
		expect(game.isComplete).toEqual(false);
	});

	it('has a current move', function() {
		expect(game.currentMove).toEqual(null);
	});

	it('has a current player', function() {
		expect(game.currentPlayer).toEqual(player1);
	});

	it('has a currently active game piece', function() {
		expect(game.currentPiece).toEqual(1);
	});

	describe('.switchPlayer', function() {
		it("toggles the currentPlayer from player1 to player2", function() {
			expect(game.currentPlayer).toEqual(player1);
			game.switchPlayer();
			expect(game.currentPlayer).toEqual(player2);
		});

		it("toggles the currentPlayer from player2 to player1", function() {
			game.currentPlayer = player2;
			game.switchPlayer();
			expect(game.currentPlayer).toEqual(player1);
		});

		it("toggles the currentPiece from 1 to 2", function() {
			expect(game.currentPiece).toEqual(1);
			game.switchPlayer();
			expect(game.currentPiece).toEqual(2);
		});

		it("toggles the currentPiece from 2 to 1", function() {
			game.currentPiece = 2;
			game.switchPlayer();
			expect(game.currentPiece).toEqual(1);
		});
	});

	describe('.resetGame', function() {
		it("clears the board and sets currentPlayer as player1", function() {
			game.board.state = [1,2,0,1,0,1,0,2,2];
			game.isComplete = true;
			game.currentPlayer = game.player2;
			game.currentPiece = 2;
			game.resetGame();
			expect(game.board.state).toEqual([0,0,0,0,0,0,0,0,0]);
			expect(game.isComplete).toEqual(false);
			expect(game.currentPlayer).toEqual(player1);
			expect(game.currentPiece).toEqual(1);
		});
	});

	describe('.takeTurn', function() {
		it("returns false and takes no action when chosen cell is not available", function() {
			game.board.state = [1,2,0,1,0,1,0,2,2];
			game.currentPlayer = game.player1;
			result = game.takeTurn(1);
			expect(game.board.state).toEqual([1,2,0,1,0,1,0,2,2]);
			expect(game.currentPlayer).toEqual(player1);
			expect(game.currentPiece).toEqual(1);
			expect(result).toEqual('illegal move');
		});

		it("returns true when chosen cell is not available", function() {
			game.board.state = [1,2,0,1,0,1,0,2,2];
			game.currentPlayer = game.player1;
			result = game.takeTurn(2);
			expect(game.board.state).toEqual([1,2,1,1,0,1,0,2,2]);
			expect(game.currentPlayer).toEqual(player2);
			expect(game.currentPiece).toEqual(2);
			expect(result).toEqual('Gameplay continues...');		// Currently, this returns whether the cell was available or not.
		});

		it("acknowledges a win by Player1", function() {
			game.board.state = [1,2,0,1,0,1,0,2,2];
			game.currentPlayer = game.player1;
			game.currentPiece = 1;
			result = game.takeTurn(6);

			expect(game.player1.fitness).toEqual(10);
			expect(game.isComplete).toEqual(true);
			expect(result).toEqual(game.player1);
		});

		it("acknowledges a win by Player2", function() {
			game.board.state = [1,2,0,1,0,1,0,2,2];
			game.currentPlayer = game.player2;
			game.currentPiece = 2;
			result = game.takeTurn(4);

			expect(game.player2.fitness).toEqual(11);
			expect(game.isComplete).toEqual(true);
			expect(result).toEqual(game.player2);
		});

	});

});