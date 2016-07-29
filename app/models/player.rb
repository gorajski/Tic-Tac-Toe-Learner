class Player
	attr_accessor :lookup_move

	def initialize
		@lookup_move = {}
		# (0..19682).to_a
		19682.times do |board_state|
			lookup_move[board_state] = rand(9);
		end
	end

	def play_as_player2(game_state)
		# convert game state to ternary
		# change each of the 2's to 3's
		# change each of the 1's to 2's
		# change each of the 3's to 1's
		# convert the value back to decimal
		ternary = game_state.to_s(3)



		game_state = ternary.to_i(3)

	end

end

# I'm going to take a collection of players and I will match each player with a game and score each game and return an array in order of each player


class Game

	def initialize(player1, player2)
		
	end

end



