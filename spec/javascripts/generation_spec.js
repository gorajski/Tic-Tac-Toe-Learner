describe("Generation object", function() {

	beforeEach(function() {
		gen = new Generation();
		gen.create(10);
	});

	it("has a collection of member players", function() {
		expect(gen.members instanceof Array).toEqual(true);
	});

	describe('.create', function() {
		it('populates Generation object with randomly generated members', function() {
			expect(gen.members.length).toEqual(10);
			expect(gen.members[0] instanceof Player).toEqual(true);
			expect(gen.members[9] instanceof Player).toEqual(true);
		});
	});

	describe('.spawn', function() {		//Uses helper method countIdenticalGenes

		beforeEach(function() {
			gen.members[2].fitness = 999;
			gen.members[3].fitness = -1;
			gen.members[4].fitness = 888;
			newGen1 = gen.spawn(0.5, 6, true);
			newGen2 = gen.spawn(1, 30, false);
			newGen3 = gen.spawn(1, 39, false);
		});

		it('returns a Generation object', function() {
			expect(newGen1 instanceof Generation).toEqual(true);
		});

		it('has a member count equal to the requested newPopulationSize', function() {
			expect(newGen1.members.length).toEqual(6);
			expect(newGen2.members.length).toEqual(30);
			expect(newGen3.members.length).toEqual(39);
		});

		it('copies the best performer when the doesPromoteElites flag is set', function() {
			expect(newGen1.members[0].fitness).toEqual(0);
			expect(newGen1.members[0].genome).toEqual(gen.members[0].genome);
		});

		it('does not copy the best performer when the doesPromoteElites flag is not set', function() {
			expect(newGen2.members[0]).not.toEqual(gen.members[0]);
		});

		it('it sorts the members by fitness and modifies the genome by the specified amount  ***statistically dependent***', function() {
			//This test works on the basis of statistics.  In the case of direct descendants, the number of identical genes should be roughly 90%.  So of 6046 genes, >5000 will be identical.
			//Groups 1, 2 and 3 test the similarity of the descendants to the respective ancestor

			//Group 1
			//This group includes an elite at index 0.  
			//The member at index 1 is a descendant of the elite so the count is shifted by one.
			expect(countIdenticalGenes(newGen1.members[0].genome, gen.members[0].genome)).toBeGreaterThan(5300);
			expect(countIdenticalGenes(newGen1.members[1].genome, gen.members[0].genome)).toBeGreaterThan(5300);
			expect(countIdenticalGenes(newGen1.members[2].genome, gen.members[1].genome)).toBeGreaterThan(5300);
			expect(countIdenticalGenes(newGen1.members[3].genome, gen.members[2].genome)).toBeGreaterThan(5300);
			expect(countIdenticalGenes(newGen1.members[4].genome, gen.members[3].genome)).toBeGreaterThan(5300);
			expect(countIdenticalGenes(newGen1.members[5].genome, gen.members[4].genome)).toBeGreaterThan(5300);
			
			//Group 2
			//This group has no elite, so the count starts and continues normally.
			//Since there are 30 descendants (newPopulationSize) and 10 ancestors (gen.members.length * survivalRatio), each ancestor has 3 descendants each.
			expect(countIdenticalGenes(newGen2.members[0].genome, gen.members[0].genome)).toBeGreaterThan(5300);
			expect(countIdenticalGenes(newGen2.members[3].genome, gen.members[1].genome)).toBeGreaterThan(5300);
			expect(countIdenticalGenes(newGen2.members[6].genome, gen.members[2].genome)).toBeGreaterThan(5300);
			expect(countIdenticalGenes(newGen2.members[9].genome, gen.members[3].genome)).toBeGreaterThan(5300);
			expect(countIdenticalGenes(newGen2.members[12].genome, gen.members[4].genome)).toBeGreaterThan(5300);
			expect(countIdenticalGenes(newGen2.members[15].genome, gen.members[5].genome)).toBeGreaterThan(5300);
			expect(countIdenticalGenes(newGen2.members[18].genome, gen.members[6].genome)).toBeGreaterThan(5300);
			expect(countIdenticalGenes(newGen2.members[21].genome, gen.members[7].genome)).toBeGreaterThan(5300);
			expect(countIdenticalGenes(newGen2.members[24].genome, gen.members[8].genome)).toBeGreaterThan(5300);
			expect(countIdenticalGenes(newGen2.members[27].genome, gen.members[9].genome)).toBeGreaterThan(5300);

			//Group 3
			//This group has no elite, so the count starts and continues normally.
			//Since there are 39 descendants (newPopulationSize) and 10 ancestors (gen.members.length * survivalRatio), most ancestors have 3 descendants each.
			//However, the leftovers will be added to the very last group.
			expect(countIdenticalGenes(newGen3.members[30].genome, gen.members[9].genome)).toBeGreaterThan(5300);
			expect(countIdenticalGenes(newGen3.members[31].genome, gen.members[9].genome)).toBeGreaterThan(5300);
			expect(countIdenticalGenes(newGen3.members[32].genome, gen.members[9].genome)).toBeGreaterThan(5300);
			expect(countIdenticalGenes(newGen3.members[33].genome, gen.members[9].genome)).toBeGreaterThan(5300);
			expect(countIdenticalGenes(newGen3.members[34].genome, gen.members[9].genome)).toBeGreaterThan(5300);
			expect(countIdenticalGenes(newGen3.members[35].genome, gen.members[9].genome)).toBeGreaterThan(5300);
			expect(countIdenticalGenes(newGen3.members[36].genome, gen.members[9].genome)).toBeGreaterThan(5300);
			expect(countIdenticalGenes(newGen3.members[37].genome, gen.members[9].genome)).toBeGreaterThan(5300);
			expect(countIdenticalGenes(newGen3.members[38].genome, gen.members[9].genome)).toBeGreaterThan(5300);


			//In Groups 4 and 5, each grouping of three is based on a distinct common ancestor.  Statistically, there should be a low correlation between genomes of descendants from different parents.
			//Of 5890 genes, less than half will typically match in an arbitrary pairing.  
			//This test could fail statistically.  However, it should not persist in failing if the algorithm is working as intended.  If this fails, several repeats should be attempted to verify. 

			//Group 4
			expect(countIdenticalGenes(newGen1.members[2].genome, gen.members[0].genome)).toBeLessThan(2900);
			expect(countIdenticalGenes(newGen1.members[2].genome, gen.members[0].genome)).toBeLessThan(2900);
			expect(countIdenticalGenes(newGen1.members[3].genome, gen.members[1].genome)).toBeLessThan(2900);
			expect(countIdenticalGenes(newGen1.members[4].genome, gen.members[2].genome)).toBeLessThan(2900);
			expect(countIdenticalGenes(newGen1.members[5].genome, gen.members[3].genome)).toBeLessThan(2900);
			expect(countIdenticalGenes(newGen1.members[0].genome, gen.members[4].genome)).toBeLessThan(2900);

			//Group 5
			expect(countIdenticalGenes(newGen3.members[3].genome, gen.members[0].genome)).toBeLessThan(2900);
			expect(countIdenticalGenes(newGen3.members[6].genome, gen.members[1].genome)).toBeLessThan(2900);
			expect(countIdenticalGenes(newGen3.members[9].genome, gen.members[2].genome)).toBeLessThan(2900);
			expect(countIdenticalGenes(newGen3.members[12].genome, gen.members[3].genome)).toBeLessThan(2900);
			expect(countIdenticalGenes(newGen3.members[15].genome, gen.members[4].genome)).toBeLessThan(2900);
			expect(countIdenticalGenes(newGen3.members[18].genome, gen.members[5].genome)).toBeLessThan(2900);
			expect(countIdenticalGenes(newGen3.members[21].genome, gen.members[6].genome)).toBeLessThan(2900);
			expect(countIdenticalGenes(newGen3.members[24].genome, gen.members[7].genome)).toBeLessThan(2900);
			expect(countIdenticalGenes(newGen3.members[27].genome, gen.members[8].genome)).toBeLessThan(2900);
			expect(countIdenticalGenes(newGen3.members[0].genome, gen.members[9].genome)).toBeLessThan(2900);
		});
	});

});