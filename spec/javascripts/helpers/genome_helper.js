const countIdenticalGenes = function(genome1, genome2) {
	let count = 0; 
	for (let i in genome1) { 
		if (genome1[i] === genome2[i]) { 
			count += 1; 
		}
	}
	return count;
};