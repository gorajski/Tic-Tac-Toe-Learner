require 'csv'

def number_of_moves_by_player(player_num, board)
  board.to_s(3).count(player_num)
end

def player_did_win(num, state)
  search_str = num.to_s * 3
  if (state[(0..2)] == search_str || state[(3..5)] == search_str || state[(6..8)] == search_str) || (state[0] == num.to_s && state[3] == num.to_s && state[6] == num.to_s) || (state[1] == num.to_s && state[4] == num.to_s && state[7] == num.to_s) || (state[2] == num.to_s && state[5] == num.to_s && state[8] == num.to_s) || (state[0] == num.to_s && state[4] == num.to_s && state[8] == num.to_s) || (state[2] == num.to_s && state[4] == num.to_s && state[6] == num.to_s)
    return true
  end
  return false
end

def remove_blatantly_impossible_board_states
  # INPUT: every number from 0 to 19682
  # OUTPUT: Array containing decimal numbers representing (not strictly) playable board states.

  # Discard any board where Player1 has more than 5 marks on the board or Player2 has more than 4 marks on the board
  arr = (0...19682).to_a.reject do |board|
    (number_of_moves_by_player('1', board) > 5 || board.to_s(3).count('2') > 4) 
  end

  # Discard any board where Player1 has more than just 1 mark more than Player2 
  arr = arr.to_a.reject do |board|
    (board.to_s(3).count('1') - board.to_s(3).count('2')) > 1
  end

  # Discard any board where Player2 has more marks than Player1
  arr = arr.to_a.reject do |board|
    (board.to_s(3).count('1') - board.to_s(3).count('2')) < 0
  end

  # Discard any board where both Player1 and Player2 are winners
  arr = arr.to_a.reject do |board|
    player_did_win(1, board.to_s(3)) && player_did_win(2, board.to_s(3))
  end

  return arr

end



REASONABLE_BOARD_STATES = remove_blatantly_impossible_board_states



def board_state_winners
  # INPUT: (array of (*) playable board states)
  # OUTPUT: hash of keys of board states that have values of winner

  winner_table = {}

  REASONABLE_BOARD_STATES.each do |state_int|
    state = state_int.to_s(3)
    if (state[(0..2)] == "111" || state[(3..5)] == "111" || state[(6..8)] == "111") || (state[0] == "1" && state[3] == "1" && state[6] == "1") || (state[1] == "1" && state[4] == "1" && state[7] == "1") || (state[2] == "1" && state[5] == "1" && state[8] == "1") || (state[0] == "1" && state[4] == "1" && state[8] == "1") || (state[2] == "1" && state[4] == "1" && state[6] == "1")
      winner_table[state] = "1"
    end
    if (state[(0..2)] == "222" || state[(3..5)] == "222" || state[(6..8)] == "222") || (state[0] == "2" && state[3] == "2" && state[6] == "2") || (state[1] == "2" && state[4] == "2" && state[7] == "2") || (state[2] == "2" && state[5] == "2" && state[8] == "2") || (state[0] == "2" && state[4] == "2" && state[8] == "2") || (state[2] == "2" && state[4] == "2" && state[6] == "2")
      winner_table[state] = "2"
    end
  end

  winner_table
end



# Something of a test suite for this file
# ***************************************


# Tests that these board combinations were removed from the array. Results should be FALSE.
# ***************************************

# - More than five 1's or more than four 2's
# ***************************************
# p remove_blatantly_impossible_board_states.include?("212212121".to_i(3))
# p remove_blatantly_impossible_board_states.include?("221221002".to_i(3))
# p remove_blatantly_impossible_board_states.include?("110101011".to_i(3))
# p remove_blatantly_impossible_board_states.include?("222220000".to_i(3))
# p remove_blatantly_impossible_board_states.include?("102202202".to_i(3))
# p remove_blatantly_impossible_board_states.include?("201101111".to_i(3))
# p remove_blatantly_impossible_board_states.include?("211121110".to_i(3))
# p remove_blatantly_impossible_board_states.include?("122211220".to_i(3))

# player2 cannot make more plays than player1
# ***************************************
# p remove_blatantly_impossible_board_states.include?("202211020".to_i(3))
# p remove_blatantly_impossible_board_states.include?("201201220".to_i(3))
# p remove_blatantly_impossible_board_states.include?("000022100".to_i(3))
# p remove_blatantly_impossible_board_states.include?("022200001".to_i(3))
# p remove_blatantly_impossible_board_states.include?("112021022".to_i(3))
# p remove_blatantly_impossible_board_states.include?("100121222".to_i(3))
# p remove_blatantly_impossible_board_states.include?("112100222".to_i(3))
# p remove_blatantly_impossible_board_states.include?("122101202".to_i(3))
# p remove_blatantly_impossible_board_states.include?("200001122".to_i(3))
# p remove_blatantly_impossible_board_states.include?("220000001".to_i(3))

# player1 cannot make more than one additional play over player2
# ***************************************
# p remove_blatantly_impossible_board_states.include?("112000001".to_i(3))
# p remove_blatantly_impossible_board_states.include?("111000200".to_i(3))
# p remove_blatantly_impossible_board_states.include?("211000001".to_i(3))
# p remove_blatantly_impossible_board_states.include?("111020021".to_i(3))

# player1 and player2 cannot both have winning positions on the board simultaneously
# ***************************************
# p remove_blatantly_impossible_board_states.include?("222000111".to_i(3))
# p remove_blatantly_impossible_board_states.include?("000222111".to_i(3))
# p remove_blatantly_impossible_board_states.include?("201201211".to_i(3))
# p remove_blatantly_impossible_board_states.include?("120120120".to_i(3))

# Tests that these board combinations remain in the array.  Results should be TRUE.
# ***************************************
puts '*' * 8
# p remove_blatantly_impossible_board_states.include?("102001002".to_i(3))
# p remove_blatantly_impossible_board_states.include?("201002101".to_i(3))
# p remove_blatantly_impossible_board_states.include?("211022100".to_i(3))
# p remove_blatantly_impossible_board_states.include?("122011200".to_i(3))
# p remove_blatantly_impossible_board_states.include?("122010000".to_i(3))
# p remove_blatantly_impossible_board_states.include?("121021020".to_i(3))
# p remove_blatantly_impossible_board_states.include?("022111002".to_i(3))
# p remove_blatantly_impossible_board_states.include?("222011001".to_i(3))



# For Javascript to construct an object that can be used as a genome template.
template_str = "{ "
remove_blatantly_impossible_board_states.each do |state|
  state_str = state.to_s(3)
  state_str = "0" * (9 - state_str.length) + state_str   # add frontend zeroes back on

  template_str << "'#{state_str}' : null, "
end
template_str = template_str.chop.chop
template_str += " }"
p template_str

CSV.open('template.csv', 'wb') do |csv|
  csv << [template_str]
end


# For Javascript to construct an object that can be used as a list of all open spaces available in a board state.
# This object to be used as a look up during gene assignment and mutation to ensure any move selected is a legal move.
open_spaces_str = "{ "
remove_blatantly_impossible_board_states.each do |state|  
  state_str = state.to_s(3)
  state_str = "0" * (9 - state_str.length) + state_str   # add frontend zeroes back on

  spaces = "["
  for i in 0..state_str.length
    spaces += "#{i}, " if state_str[i] == '0'
  end
  spaces = spaces.chop.chop if spaces != "["
  spaces += "]"
  open_spaces_str += "'#{state_str}' : #{spaces}, "
end
open_spaces_str = open_spaces_str.chop.chop
open_spaces_str += " }"

CSV.open('open_spaces.csv', 'wb') do |csv|
  csv << [open_spaces_str]
end