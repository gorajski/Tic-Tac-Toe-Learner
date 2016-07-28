def remove_blatantly_impossible_boards
  arr = (0..19682).to_a.map! do |number|
    unless number.to_s(3).split('').map{|num| num if num == "1"}.compact.count > 5 || number.to_s(3).split('').map{|num| num if num == "2"}.compact.count > 4
      number
    end
  end.compact!
end
