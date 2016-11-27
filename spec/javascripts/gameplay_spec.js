describe("game play", function() {
	var game;

	beforeEach(function() {
		game = new Game();
	});

	it("has game board representation", function() {
		expect(game.board).toEqual([0,0,0,0,0,0,0,0,0]);
	})
});