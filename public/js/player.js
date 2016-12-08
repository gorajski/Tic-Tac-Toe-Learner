var Player = function(number, type) {
	this.number = number;
	this.type = type;

	this.genome = this.new_genome();
	console.log(this.genome)
}

Player.prototype.new_genome = function() {
	let template = genome_template;
	const minIndex = 0;
	const maxIndex = 8;
	for (key in template) { template[key] = Math.floor(Math.random() * (maxIndex - minIndex) + minIndex) }		
	return template;
}