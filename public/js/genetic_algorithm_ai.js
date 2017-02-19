let GeneticAlgorithmAI = function(populationSize, gameCount, htmlElement, timerInterval, hasElites, survivalRatio, mutationRate, player1Reward, player2Reward, tieGameReward) {
	this.htmlElement = htmlElement;
	this.currentGeneration = new Generation(mutationRate);
	this.currentGeneration.create(populationSize);
	this.populationSize = populationSize;
	$(this.htmlElement).html("Generation " + Generation.id) //relocate this
	this.boardCollection = this.initBoards(gameCount);
	this.gameCollection = this.initGames(gameCount, this.boardCollection, this.currentGeneration);

	this.rewardProfile = { "1" : player1Reward, "2" : player2Reward, "draw" : tieGameReward }; // Calculated weights { "1" : 1.18, "2" : 6.64, "draw" : 531441 }
 	this.timer = null;
	this.timerInterval = timerInterval;
	this.hasElites = hasElites;
	this.survivalRatio = survivalRatio;
	this.mutationRate = mutationRate;
};

GeneticAlgorithmAI.prototype.startTraining = function() {
	if (this.timer !== null) { return };
	this.timer = this.trainer();
};

GeneticAlgorithmAI.prototype.stopTraining = function() {
	clearTimeout(this.timer);
	this.timer = null;
};

GeneticAlgorithmAI.prototype.trainer = function() {
	let areAllGamesComplete = true;
 	this.gameCollection.forEach( (game) => {
 		areAllGamesComplete = areAllGamesComplete && game.isComplete;
 			let result = game.gameClock();
 			if (result instanceof Player) {
 				this.winnerLogic(game);
 			} else if (result === 'draw') {
 				this.fullBoardLogic(game);
 			}
 	});

 	if (areAllGamesComplete) { 
 		// console.log(this.currentGeneration.members[0].fitness)

		this.currentGeneration = this.currentGeneration.spawn(this.survivalRatio, this.populationSize, this.hasElites);
		$(this.htmlElement).html("Generation " + Generation.id)
		this.boardCollection = this.initBoards(this.populationSize * this.populationSize);
		this.gameCollection = this.initGames(this.populationSize * this.populationSize, this.boardCollection, this.currentGeneration);
	};
	this.timer = setTimeout(this.trainer.bind(this), this.timerInterval)
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

GeneticAlgorithmAI.prototype.winnerLogic = function(game) {
	game.currentPlayer.fitness += this.rewardProfile[game.currentPiece] + game.board.state.filter(function(x){return x==0}).length;
};

GeneticAlgorithmAI.prototype.fullBoardLogic = function(game) {
	if (game.player1 === game.player2) {
		game.player1.fitness += this.rewardProfile["draw"];
	} else {
		game.player1.fitness += this.rewardProfile[1];
		game.player2.fitness += this.rewardProfile[2];
	}
};

GeneticAlgorithmAI.prototype.bestPerformer = function() {
	return this.currentGeneration.members[0];
};