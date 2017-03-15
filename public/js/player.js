let Player = function(type) {
	this.type = type;
	this.fitness = 0;

	this.genome = this.newGenome();
};

Player.prototype.newGenome = function() {
	let freshGenome = new Array;

	for (let i = 0; i < 5890; i++) { 
		let choices = genomeOpenSpaces[i];
		freshGenome.push(choices[Math.floor(Math.random() * choices.length)]);
	}		
	
	return freshGenome;
};

Player.prototype.nextMove = function(state) {
	return this.genome[genomeTemplate[state]];
}

Player.prototype.setGene = function(gene, value) {
	this.genome[gene] = value;
}

Player.prototype.clone = function() {
	let newPlayer = new Player(this.type);
	newPlayer.fitness = 0;
	// newPlayer.genome = Object.assign({}, this.genome);
	newPlayer.genome = this.genome.slice();
	return newPlayer;
};

Player.prototype.mutate = function(mutationRate) {
	const minIndex = 0;
	const maxIndex = 8;

	//************************
	if (Math.random() < 4) {
		this.genome[0] = Math.floor(Math.random() * (maxIndex - minIndex) + minIndex);
	}
	//************************


	// CAN BE REFACTORED FOR BETTER PERFORMANCE	
	for (let key in this.genome) {
		let choices = genomeOpenSpaces[key];
		if (Math.random() < mutationRate) {
			this.genome[key] = choices[Math.floor(Math.random() * choices.length)];
		} 
	};
	return this;
};

Player.prototype.breedWith = function(otherPlayer) {
	let newPlayer = this.clone();
	for (let key in newPlayer.genome) {
		if (Math.random() < 0.5) {
			newPlayer.genome[key] = otherPlayer.genome[key];
		}
	}
	return newPlayer;
};