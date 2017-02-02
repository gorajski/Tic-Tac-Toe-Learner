let GeneticAlgorithmAI = function(playerCount, gameCount) {
	this.currentGeneration = new Generation();
	this.currentGeneration.create(playerCount);
	this.boardCollection = this.initBoards(gameCount);
	this.gameCollection = this.initGames(gameCount, this.boardCollection, this.currentGeneration);

	this.timer = null;
	this.timerInterval = 80;
};

GeneticAlgorithmAI.prototype.startTraining = function() {
	if (this.timer !== null) { return };
	this.timer = setInterval(this.trainer.bind(this), this.timerInterval);
};

GeneticAlgorithmAI.prototype.stopTraining = function() {
	clearInterval(this.timer);
	this.timer = null;
};

GeneticAlgorithmAI.prototype.trainer = function() {
	let areAllGamesComplete = true;
 	this.gameCollection.forEach(function(game) {
 		areAllGamesComplete = areAllGamesComplete && game.isComplete;
 		if (!game.isComplete) { game.gameClock(); }
 	});

 	if (areAllGamesComplete) { 
		this.currentGeneration = this.currentGeneration.spawn(0.24, 12, true);
		this.boardCollection = this.initBoards(144);
		this.gameCollection = this.initGames(144, this.boardCollection, this.currentGeneration);
	}
};

GeneticAlgorithmAI.prototype.initBoards = function(numberOfGames) {
	let boardCollection = [];
	for (let i = 0; i < numberOfGames; i++) {
		boardCollection.push(new Board($("#board" + (i + 1).toString())));
	}
	return boardCollection;
};

GeneticAlgorithmAI.prototype.initGames = function(numberOfGames, boardCollection, currentGeneration) {
	let gameCollection = [];
	let player1Tick = 0;
	let player2Tick = 0;
	let numberOfPlayers = currentGeneration.members.length;

	for (let boardd = 0; boardd < numberOfGames; boardd++) {
		if (player1Tick >= numberOfPlayers) {
			player1Tick = 0;
			player2Tick += 1;
		}
		gameCollection.push(new GameController(boardCollection[boardd], currentGeneration.members[player1Tick], currentGeneration.members[player2Tick]));
		player1Tick += 1;
	}
	return gameCollection;
}