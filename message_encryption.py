char = input("Password: ")
if len(char) > 1:
    unicode_list = [ord(c) for c in char]
    # Correctly encrypt each value in the list
    encrypted_numeric_values = [3 * val for val in unicode_list]
    # Convert the list of encrypted numerical values back to a string
    password = "".join([chr(val) for val in encrypted_numeric_values])
    password
else:
    print("Invalid")
