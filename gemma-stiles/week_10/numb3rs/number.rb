class Number

	def self.bin2dec(binary)
	# The binary ("base two") numerical system has two possible values, often represented as 0 or 1, for each place-value. In contrast, the decimal (base ten) numeral system has ten possible values (0,1,2,3,4,5,6,7,8, or 9) for each place-value. To avoid confusion while using different numeral systems, the base of each individual number may be specified by writing it as a subscript of the number. For example, the binary number 10011100 may be specified as "base two" by writing it as 100111002. The decimal number 156 may be written as 15610 and read as "one hundred fifty-six, base ten".

		number = 0
		power = 0
		binary.chars.reverse.each do |bit|
			bit = bit.to_i
			number += (bit * 2 ** power) if bit > 0
			power += 1
		end
		number

		# bin.chars.reverse.each_with_index.map { |b, i|b.to_i * 2 ** i}.reduce(:+)
		# same as the above but in one line of code, not readable
	end	



	def self.dec2bin(decimal)
	# An easy method of converting decimal to binary number equivalents is to write down the decimal number and to continually divide-by-2 (two) to give a result and a remainder of either a “1” or a “0” until the final result equals zero. 
    	
    	decimal = decimal.to_i
    	binaryNumbers = []

    	# Whilst the number is greater than zero keep dividing it by 2 to get a new number and push the remainder into the binary numbers array (this pushes 0 if even, 1 if odd).  
  
   		while decimal > 0
      		remainder = decimal % 2
      		binaryNumbers << remainder
      		decimal = decimal / 2
    	end

    	binaryNumbers.reverse.join

  	end



	def self.bin2hex(binary)
	# Easier to convert binary > decimal and then decimal > hexadecimal?? 

		# Taken from the bin2dec function, should prbably just call that function down here?
		number = 0
		power = 0
		binary.chars.reverse.each do |bit|
			bit = bit.to_i
			number += (bit * 2 ** power) if bit > 0
			power += 1
		end

		number

		decimal = number

		hexadecimal_result = []

		if decimal == 0
			hexadecimal_result << "0"
		end

		while decimal > 0
			remainder = decimal % 16
			decimal = decimal / 16
			hexadecimal_result << remainder
		end

		hexadecimal_result.each_with_index do |j, i|

			if j == 15
				hexadecimal_result[i] = "F"

			elsif j == 14
				hexadecimal_result[i] = "E"

			elsif j == 13
				hexadecimal_result[i] = "D"

			elsif j == 12
				hexadecimal_result[i] = "C"

			elsif j == 11
				hexadecimal_result[i] = "B"

			elsif j == 10
				hexadecimal_result[i] = "A"
			end

		end

		hexadecimal_result.join.reverse
	end

		# bin.each_byte.map { |b| b.to_s(16) }
		# end	



	def self.hex2bin(hex)
		
	end	
end	