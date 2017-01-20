let Player = function(type) {
	this.type = type;
	this.fitness = 0;

	this.genome = this.newGenome();
};

Player.prototype.newGenome = function() {
	let template = genome_template;
	const minIndex = 0;
	const maxIndex = 8;
	for (let key in template) { 
		template[key] = Math.floor(Math.random() * (maxIndex - minIndex) + minIndex) 
	}
	let fresh_genome = Object.assign({}, template)		
	return fresh_genome;
};

Player.prototype.clone = function() {
	let newPlayer = new Player(this.type);
	newPlayer.fitness = 0;
	newPlayer.genome = Object.assign({}, this.genome);
	return newPlayer;
};

Player.prototype.mutate = function() {
	let mutationFactor = 0.07 * Math.random();		//revisit for a better distribution... maybe http://www.meredithdodge.com/2012/05/30/a-great-little-javascript-function-for-generating-random-gaussiannormalbell-curve-numbers/
	const minIndex = 0;
	const maxIndex = 8;

	//************************
	if (Math.random() > 0.75) {
		this.genome['000000000'] = Math.floor(Math.random() * (maxIndex - minIndex) + minIndex);
	}
	//************************

	for (let key in this.genome) {
		if (Math.random() < mutationFactor) {
			this.genome[key] = Math.floor(Math.random() * (maxIndex - minIndex) + minIndex);
		} 
	};
	return this;
};

Player.prototype.breedWith = function(other_player) {
	let newPlayer = this.clone();
	for (let key in newPlayer.genome) {
		if (Math.random() < 0.5) {
			newPlayer.genome[key] = other_player.genome[key];
		}
	}
	return newPlayer;
};