describe("Player object", function() {

	beforeEach(function() {
		let player1 = new Player("computer");
		let player2 = new Player("computer");
	});

	it("has number, type and fitness representations", function() {
		expect(player1.number).toEqual(null);
		expect(player1.type).toEqual("computer");
		expect(player1.fitness).toEqual(0);
	});

	it("has a genome representation", function() {
		expect(player1.genome instanceof Object).toEqual(true);
		expect(Object.keys(player1.genome).length).toEqual(6046);
		expect(gen.members[0].genome['000000000'] >= 0).toEqual(true);
		expect(gen.members[0].genome['000000000'] <= 8).toEqual(true);
		expect(gen.members[0].genome['000000001'] >= 0).toEqual(true);
		expect(gen.members[0].genome['000000001'] <= 8).toEqual(true);
		expect(gen.members[0].genome['000000012'] >= 0).toEqual(true);
		expect(gen.members[0].genome['000000012'] <= 8).toEqual(true);
	});

	describe('.newGenome', function() {
		it('generates a new genome from scratch', function() {
			let genome = Object.assign({}, player1.genome);
			expect(player1.newGenome()).not.toEqual(genome);
			expect(player1.newGenome() instanceof Object).toEqual(true);
			expect(Object.keys(player1.genome).length).toEqual(6046);
		});
	});

	describe('.clone', function() {
		it('generates a deep copy of the Player object', function() {
			let copy = player1.clone();
			expect(copy).not.toBe(player1);		//expect these to be independent objects
			expect(copy).toEqual(player1);		//expect these objects to have identical contents
			expect(copy.genome).not.toBe(player1.genome);		//expect the genomes to be independent objects
			expect(copy.genome).toEqual(player1.genome);		//but with identical key/value pairs
		});
	});

	describe('.mutate', function() {		//Uses helper method countIdenticalGenes
		it("modifies the Player object's genome", function() {
			let copy = player1.clone();
			let mutant = player1.mutate();
			expect(mutant).not.toEqual(copy);
			expect(mutant.genome).not.toEqual(copy.genome);
			expect(countIdenticalGenes(player1.genome, copy.genome)).toBeGreaterThan(5440);
		});
	});

	describe('.breedWith', function() {		//Uses helper method countIdenticalGenes
		it("generates a new Player object whose genome is a mix of two ancestors  ***statistically dependent***", function() {
			let descendant = player1.breedWith(player2);
			expect(descendant).not.toEqual(player1);
			expect(descendant).not.toEqual(player2);

			//This following criteria are based on statistics.  A descendant in this model should have roughly, but not strictly, 50% of its genes from each parent.
			//50% of 6406 is 3203.  However, since some of the genes will inevitably match in both parents, the expected value will be higher than 3203, experimentally determined to be near 3400.
			//Due to the arbitrary gene assignment in the algorithm, there will be some variability above and below 3400, so a tolerance of +/-500 was added here.
			expect(countIdenticalGenes(player1.genome, descendant.genome)).toBeGreaterThan(2900);
			expect(countIdenticalGenes(player1.genome, descendant.genome)).toBeLessThan(3900);
			expect(countIdenticalGenes(player2.genome, descendant.genome)).toBeGreaterThan(2900);
			expect(countIdenticalGenes(player2.genome, descendant.genome)).toBeLessThan(3900);
		});
	});

});