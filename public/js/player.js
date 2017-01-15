let Player = function(type) {
	this.number = null;
	this.type = type;
	this.fitness = 0;

	this.genome = this.newGenome();
}

Player.prototype.newGenome = function() {
	let template = genome_template;
	const minIndex = 0;
	const maxIndex = 8;
	for (let key in template) { template[key] = Math.floor(Math.random() * (maxIndex - minIndex) + minIndex) }
	let fresh_genome = Object.assign({}, template)		
	return fresh_genome;
};

Player.prototype.clone = function() {
	let newPlayer = new Player(this.type);
	newPlayer.genome = Object.assign({}, this.genome);
	return newPlayer;
};

Player.prototype.mutate = function() {
	let mutationFactor = 0.1 * Math.random();

	for (let i = 0; i < 100000; i++) { 
		if (Math.random() < mutationFactor) {
			this.genome[key] = this.genome[key];
		} else {
			this.genome[key] = other_player.genome[key];
		} 
	};

};

Player.prototype.breedWith = function(other_player) {
	for (let key in this.genome) {
		if (Math.random() < 0.5) {
			this.genome[key] = this.genome[key];
		} else {
			this.genome[key] = other_player.genome[key];
		}
	}
};
