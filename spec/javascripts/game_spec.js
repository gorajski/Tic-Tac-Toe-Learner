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
		it("returns 'illegal move' and takes no action when chosen cell is not available", function() {
			game.board.state = [1,2,0,1,0,1,0,2,2];
			game.currentPlayer = game.player1;
			game.currentPiece = 1;
			result = game.takeTurn(1);
			expect(game.board.state).toEqual([1,2,0,1,0,1,0,2,2]);
			expect(game.currentPlayer).toEqual(player1);
			expect(game.currentPiece).toEqual(1);
			expect(result).toEqual('illegal move');
		});

		it("returns 'Gameplay continues...' when chosen cell is available and game is not over", function() {
			game.board.state = [1,2,0,1,0,1,0,2,2];
			game.currentPlayer = game.player1;
			game.currentPiece = 1;
			result = game.takeTurn(2);
			expect(game.board.state).toEqual([1,2,1,1,0,1,0,2,2]);
			expect(game.currentPlayer).toEqual(player2);
			expect(game.currentPiece).toEqual(2);
			expect(result).toEqual('Gameplay continues...');
		});

		it("returns 'draw' when there is no winner and no more moves can be made", function() {
			game.board.state = [1,2,1,1,2,1,2,1,2];
			game.currentPlayer = game.player2;
			game.currentPiece = 2;
			result = game.takeTurn(2);
			expect(game.board.state).toEqual([1,2,1,1,2,1,2,1,2]);
			expect(game.currentPlayer).toEqual(player2);
			expect(game.currentPiece).toEqual(2);
			expect(result).toEqual('draw');
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

	describe('.gameClock .winnerLogic .fullBoardLogic', function() {
		beforeEach(function() {		
			playerA = new Player("computer");
			playerA.genome = { "120120000" : 5, "120121212" : 2 };
			playerB = new Player("computer");
			playerB.genome = { "121120002" : 6, "120121000" : 7 };
			playerC = new Player("computer");
			playerC.genome = { "120120000" : 6, "122211102" : 7 };
			board1 = new Board($("#dummy"));
			board1.state = [1, 2, 0, 1, 2, 1, 2, 1, 2];
			game1 = new GameController(board1, playerA, playerA);
			board2 = new Board($("#dummy"));
			board2.state = [1, 2, 0, 1, 2, 0, 0, 0, 0];
			game2 = new GameController(board2, playerA, playerB);
			board3 = new Board($("#dummy"));
			board3.state = [1, 2, 1, 1, 2, 0, 0, 0, 2];
			game3 = new GameController(board3, playerB, playerA);
			board4 = new Board($("#dummy"));
			board4.state = [1, 2, 1, 1, 2, 0, 0, 0, 2];
			game4 = new GameController(board4, playerB, playerB);
			board5 = new Board($("#dummy"));
			board5.state = [1, 2, 0, 1, 2, 0, 0, 0, 0];
			game5 = new GameController(board5, playerC, playerA);
			board6 = new Board($("#dummy"));
			board6.state = [1, 2, 2, 2, 1, 1, 1, 0, 2];
			game6 = new GameController(board6, playerC, playerB);
		});

		it('adds fitness points', function() {
			expect(playerA.fitness).toEqual(0);
			expect(playerB.fitness).toEqual(0);
			expect(playerC.fitness).toEqual(0);

			game1.gameClock();
			expect(playerA.fitness).toEqual(game1.rewardProfile["draw"]);
			game2.gameClock(); game2.gameClock();
			expect(playerA.fitness).toEqual(game2.rewardProfile["draw"]);
			expect(playerB.fitness).toEqual(game2.rewardProfile[2]);
			game3.gameClock();
			expect(playerA.fitness).toEqual(game3.rewardProfile["draw"]);
			expect(playerB.fitness).toEqual(game3.rewardProfile[1] + game3.rewardProfile[2]);
			game4.gameClock();
			expect(playerA.fitness).toEqual(game4.rewardProfile["draw"]);
			expect(playerB.fitness).toEqual(2 * game4.rewardProfile[1] + game4.rewardProfile[2]);
			game5.gameClock();
			expect(playerC.fitness).toEqual(game5.rewardProfile[1]);
			game6.gameClock();
			expect(playerB.fitness).toEqual(2 * game6.rewardProfile[1] + game6.rewardProfile[2] + game6.rewardProfile["draw"]);
			expect(playerC.fitness).toEqual(game6.rewardProfile[1] + game6.rewardProfile["draw"]);
		});
	});
});