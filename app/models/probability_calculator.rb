xwins = 0.0
owins = 0.0
ties = 0.0
xscore = 0
oscore = 0
tiescore = 0
arr = []

(0..531440).to_a.each do |num|
	state_str = num.to_s(3)
	arr << "0" * (12 - state_str.length) + state_str
end

arr.each do |round|
	round.split("").each do |winner|
		if winner == "0"
		  xscore += 0.6594
		elsif winner == "1"
			oscore += 0.3188
		else
			tiescore += 0.0218
		end
	end

	if xscore > oscore
	  xwins += 1
  elsif xscore < oscore
  	owins += 1
  else
    ties += 1
	end

	xscore = 0
	oscore = 0
	tiescore = 0
end

totalresults = xwins + owins + ties

p totalresults
p arr.length

puts "X:   #{xwins}, so should be weighted #{totalresults / xwins}"
puts "Y:    #{owins}, so should be weighted #{totalresults / owins}"
puts "tie:      #{ties}, so should be weighted #{totalresults / ties}"



# RESULTS:
# Out of twelve games, 
# X will win: 	84.9285245% (451345 games), so should be weighted 1.1774607007942925
# O will win: 	15.0712873% (80095 games), so should be weighted 6.635133279230914
# All games will tie: 0.0001882% (1 games), so should be weighted 531441.0