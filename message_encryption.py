char = input("Message: ")
if len(char) == 1:
    unicode_value = ord(char)
    encrypted_numeric_value = 3 * unicode_value
    # Convert the encrypted numerical value back to a character
    encrypted_text = chr(encrypted_numeric_value)
    print(encrypted_text)
elif len(char) > 1:
    unicode_list = [ord(c) for c in char]
    # Correctly encrypt each value in the list
    encrypted_numeric_values = [3 * val for val in unicode_list]
    # Convert the list of encrypted numerical values back to a string
    encrypted_text = "".join([chr(val) for val in encrypted_numeric_values])
    print(encrypted_text)
else:
    print("No character entered.")
