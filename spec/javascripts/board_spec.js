describe("Board object", function() {
	var board, player1, player2;

	beforeEach(function() {
		player1 = new Player("computer");
		player2 = new Player("computer");
		board = new Board("#dummy_entry");
	});

	it("has board representation", function() {
		expect(board.state).toEqual([0,0,0,0,0,0,0,0,0]);
	});

	describe('.cellIsFree', function() {
		it('indicates when cell is unmarked', function() {
			board.state = [0,0,0,0,0,0,0,0,0];
			expect(board.cellIsFree(2)).toEqual(true);
		});

		it('indicates when cell is marked', function() {
			board.state = [1,1,0,2,0,2,0,1,2];
			expect(board.cellIsFree(1)).toEqual(false);
		});
	});

	describe('.placePiece', function() {
		it("marks the selected cell as the current_player's", function() {
			expect(board.state).toEqual([0,0,0,0,0,0,0,0,0]);
			board.placePiece(player1, 2);
			expect(board.state).toEqual([0,0,1,0,0,0,0,0,0]);
		});
	});


	describe('.checkForWinner', function() {
		it("returns null results when no winner", function() {
			board.state = [2,1,2,
										1,0,0,
										1,1,2];
			expect(board.checkForWinner()).toEqual(null);
		});

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

	describe('.checkForFullBoard', function() {
		it("detects board is full and returns true", function() {
			board.state = [1,1,2,
										2,1,1,
										1,2,2];
			expect(board.checkForFullBoard()).toEqual(true);
		});

		it("detects board is not full and returns false", function() {
			board.state = [1,1,2,
										2,1,0,
										1,2,2];
			expect(board.checkForFullBoard()).toEqual(false);
		});
	});
});