/*
encryption.js - NarcotaApi

This file is a module file under which the encryption related functions and objects are defined.

Author : Rishav Das (https://github.com/rdofficial/)
Created on : July 10, 2021

Last modified by : -
Last modified on : -

Authors contributed to this script (Add your name below if you have contributed) :
1. Rishav Das (github:https://github.com/rdofficial/, email:rdofficial192@gmail.com)
*/

// Defining the functions for encryption
// ----
// These are all string based encryptions (Works for strings)
const Encryption = {
	encrypt : (text, password) => {
		/* This function serves the functionality of encrypting a plain text with a user specified password. The text is encrypted using plain algorithms after a key is created from the password specified by the user. The strings encrypted using this encrypt function can only be decrypted using the decrypt() function defined in this object. */

		// Generating the key for the encryption
		let key = 0, isEven = true;
		for (let i of password) {
			if (isEven) {
				key += i.charCodeAt();
			} else {
				key -= i.charCodeAt();
			}
			isEven = !isEven; // It will make the isEven false if it is true and true if it is false
		}
		if (key < 0) {
			key = key * (-1);
		}
		key += password.length;

		// Converting the plain text to cipher text
		let encryptedText = ``;
		text.split('').forEach((element, index) => {
			// Iterating through the each characters of the plain text specified by the user

			encryptedText += String.fromCharCode((element.charCodeAt() + key) % 256);
		});

		// Encoding the cipher text to the base64
		encryptedText = Buffer.from(encryptedText, 'utf-8').toString('base64');

		// Returning back the encrypted text
		return encryptedText;
	},

	decrypt : (text, password) => {
		/* This function serves the functionality of decrypting an encrypted text, with a user specified password. The encrypted text should be the one created using the encrypt() function defined in this object only. */

		// Generating the key for the encryption
		let key = 0, isEven = true;
		for (let i of password) {
			if (isEven) {
				key += i.charCodeAt();
			} else {
				key -= i.charCodeAt();
			}
			isEven = !isEven; // It will make the isEven false if it is true and true if it is false
		}
		if (key < 0) {
			key = key * (-1);
		}
		key += password.length;

		// Decoding the cipher text from base64 format back to the ASCII format
		text = Buffer.from(text, 'base64').toString('utf-8');

		// Jumping the characters of the text (encrypted) to plain text (original)
		let decryptedText = ``;
		text.split('').forEach((element, index) => {
			// Iterating through the each characters of the plain text specified by the user

			if(element.charCodeAt() < key){
				decryptedText += String.fromCharCode((element.charCodeAt() - key + 256) % 256);
			}
			else{
				decryptedText += String.fromCharCode((element.charCodeAt() - key) % 256);
			}
		});

		// Returning back the decrypted text
		return decryptedText;
	},

	hash : (string) => {
		/* The function which serves the functionality of hashing a plain string. The function takes in a plain string input from the user and returns the hashed form of it. */

		// Generating the key for the encryption
		let key = 0, isEven = true;
		for (let i of string) {
			if (isEven) {
				key += i.charCodeAt();
			} else {
				key -= i.charCodeAt();
			}
			isEven = !isEven; // It will make the isEven false if it is true and true if it is false
		}
		if (key < 0) {
			key = key * (-1);
		}
		key += string.length;

		// Converting the plain string to cipher form
		let hash = ``;
		string.split('').forEach((element, index) => {
			// Iterating through the each characters of the plain string specified by the user

			hash += String.fromCharCode((element.charCodeAt() + key) % 256);
		});

		// Encoding the jumbled character to the base64
		hash = Buffer.from(hash, 'utf-8').toString('base64');

		// Returning back the hash
		return hash;
	},
}
// ----

// Exporting the functions and objects defined here
module.exports = Encryption;