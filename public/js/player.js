let Player = function(type) {
	this.number = null;
	this.type = type;

	this.genome = this.new_genome();

}

Player.prototype.new_genome = function() {
	let template = genome_template;
	const minIndex = 0;
	const maxIndex = 8;
	for (let key in template) { template[key] = Math.floor(Math.random() * (maxIndex - minIndex) + minIndex) }
	let fresh_genome = Object.assign({}, template)		
	return fresh_genome;
}

