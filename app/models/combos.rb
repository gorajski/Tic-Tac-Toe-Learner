PROBABLE_BOARD_STATES = (0..19682).to_a

def remove_blatantly_impossible_board_states
  # INPUT: every number from 0 to 19682
  # OUTPUT: Array containing decimal numbers representing (not strictly) playable board states.
  arr = (0..19682).to_a.map! do |number|
    unless number.to_s(3).split('').map{|num| num if num == "1"}.compact.count > 5 || number.to_s(3).split('').map{|num| num if num == "2"}.compact.count > 4
      number
    end
  end.compact!
end

def board_state_winners
  # INPUT: (array of (*) playable board states)
  # OUTPUT: hash of keys of board states that have values of winner

  arr = remove_blatantly_impossible_boards
  # rows = arr.

end

