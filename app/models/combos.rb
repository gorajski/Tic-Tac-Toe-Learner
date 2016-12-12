require 'csv'

def number_of_moves_by_player(player_num, board)
  board.to_s(3).count(player_num)
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

  # arr = arr.to_a.reject do |number|
  #   (number.to_s(3).count('1') == 2 && number.to_s(3).count('2') > 2) 
  # end

  # arr = arr.to_a.reject do |number|
  #   (number.to_s(3).count('1') == 3 && number.to_s(3).count('2') > 3) 
  # end

  # arr = arr.to_a.reject do |number|
  #   (number.to_s(3).count('1') == 4 && number.to_s(3).count('2') > 4) 
  # end

  # arr = arr.to_a.reject do |number|
  #   (number.to_s(3).count('1') == 5 && number.to_s(3).count('2') > 5) 
  # end

  # arr = arr.to_a.reject do |number|
  #   (number.to_s(3).count('1') < 1 && number.to_s(3).count('2') == 1) 
  # end

  # arr = arr.to_a.reject do |number|
  #   (number.to_s(3).count('1') < 2 && number.to_s(3).count('2') == 2) 
  # end

  # arr = arr.to_a.reject do |number|
  #   (number.to_s(3).count('1') < 3 && number.to_s(3).count('2') == 3) 
  # end

  # arr = arr.to_a.reject do |number|
  #   (number.to_s(3).count('1') < 4 && number.to_s(3).count('2') == 4) 
  # end

  # arr = arr.to_a.reject do |number|
  #   (number.to_s(3).count('1') < 5 && number.to_s(3).count('2') == 5) 
  # end

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

# Tests that these board combinations were removed from the array -> FALSE
# - More than five 1's or more than four 2's
# p remove_blatantly_impossible_board_states.include?("110011011".to_i(3))
# p remove_blatantly_impossible_board_states.include?("220022020".to_i(3))
# p remove_blatantly_impossible_board_states.include?("111110100".to_i(3))
# p remove_blatantly_impossible_board_states.include?("222220000".to_i(3))
# p remove_blatantly_impossible_board_states.include?("102202202".to_i(3))
# p remove_blatantly_impossible_board_states.include?("201101111".to_i(3))
# p remove_blatantly_impossible_board_states.include?("211121110".to_i(3))
# p remove_blatantly_impossible_board_states.include?("122211220".to_i(3))
# - More player2 plays outstrips player1 plays
# p remove_blatantly_impossible_board_states.include?("222211220".to_i(3))
# p remove_blatantly_impossible_board_states.include?("201201220".to_i(3))
# p remove_blatantly_impossible_board_states.include?("000022100".to_i(3))
# p remove_blatantly_impossible_board_states.include?("022200001".to_i(3))
# p remove_blatantly_impossible_board_states.include?("112121222".to_i(3))
# p remove_blatantly_impossible_board_states.include?("100121222".to_i(3))
# p remove_blatantly_impossible_board_states.include?("112100222".to_i(3))
# p remove_blatantly_impossible_board_states.include?("122101202".to_i(3))
# p remove_blatantly_impossible_board_states.include?("222111122".to_i(3))
# p remove_blatantly_impossible_board_states.include?("212121221".to_i(3))
# p remove_blatantly_impossible_board_states.include?("111000000".to_i(3))

# Tests that these board combinations remain in the array -> TRUE
puts '*' * 8
# p remove_blatantly_impossible_board_states.include?("222000111".to_i(3))
# p remove_blatantly_impossible_board_states.include?("102001002".to_i(3))
# p remove_blatantly_impossible_board_states.include?("201002101".to_i(3))
# p remove_blatantly_impossible_board_states.include?("211022100".to_i(3))
# p remove_blatantly_impossible_board_states.include?("122011200".to_i(3))
# p remove_blatantly_impossible_board_states.include?("122010000".to_i(3))
# p remove_blatantly_impossible_board_states.include?("121021020".to_i(3))
# p remove_blatantly_impossible_board_states.include?("022111002".to_i(3))
# p remove_blatantly_impossible_board_states.include?("222011001".to_i(3))
# Total reasonable states
remove_blatantly_impossible_board_states

template_str = "{ "
remove_blatantly_impossible_board_states.each do |state|
  state_str = state.to_s(3)
  state_str = "0" * (9 - state_str.length) + state_str

  template_str << "'#{state_str}' : null, "
end
template_str = template_str.chop.chop
template_str += " }"
p template_str

CSV.open('template.csv', 'wb') do |csv|
  csv << [template_str]
end


# winning board
# puts board_state_winners
# p REASONABLE_BOARD_STATES