describe("game play", function() {
	
	beforeEach(function() {
		game = new GameController();
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
			game.board.state = [1,2,0,1,0,1,0,2,2];
			game.current_player = game.player2;
			game.resetGame();
			expect(game.board.state).toEqual([0,0,0,0,0,0,0,0,0]);
			expect(game.current_player.number).toEqual(1);
		});
	});

	describe('takeTurn', function() {
		it("returns false and takes no action when chosen cell is not available", function() {
			game.board.state = [1,2,0,1,0,1,0,2,2];
			game.current_player = game.player1;
			result = game.takeTurn(game.current_player, 1);
			expect(game.board.state).toEqual([1,2,0,1,0,1,0,2,2]);
			expect(game.current_player.number).toEqual(1);
			expect(result).toEqual(false);		// Currently, this returns whether the cell was available or not.
		});

		it("returns true when chosen cell is not available", function() {
			game.board.state = [1,2,0,1,0,1,0,2,2];
			game.current_player = game.player1;
			result = game.takeTurn(game.current_player, 2);
			expect(game.board.state).toEqual([1,2,1,1,0,1,0,2,2]);
			expect(game.current_player.number).toEqual(2);
			expect(result).toEqual(true);		// Currently, this returns whether the cell was available or not.
		});

		it("resets the board when there is a winner", function() {
			game.board.state = [1,2,0,1,0,1,0,2,2];
			game.current_player = game.player2;
			result = game.takeTurn(game.current_player, 4);
			expect(game.board.state).toEqual([0,0,0,0,0,0,0,0,0]);
			expect(game.current_player.number).toEqual(1);
			expect(result).toEqual(true);		// Currently, this returns whether the cell was available or not.
		});
	});
});