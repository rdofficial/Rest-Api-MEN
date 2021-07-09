/*
server.js - NarcotaApi

Author : Rishav Das (https://github.com/rdofficial/)
Created on : July 8, 2021

Last modified by : Rishav Das (https://github.com/rdofficial/)
Last modified on : July 9, 2021

Changes made in the last modification :
1. Removed all the previously defind endpoints and defined new endpoints for the URLs '/textutils/encrypt' and '/textutils/decrypt', as well as defined functions for string encryption and decryption.

Authors contributed to this script (Add your name below if you have contributed) :
1. Rishav Das (github:https://github.com/rdofficial/, email:rdofficial192@gmail.com)
*/

// Importing the required modules
const Express = require('express');
const BodyParser = require('body-parser');
const Mongoose = require('mongoose');
const Cors = require('cors');

// Importing the custom models created
//

// Creating the express app
const app = Express();
const port = process.env.PORT || 8000;

// Setting some of the properties of the express app
app.use(BodyParser.urlencoded({extended: true}));
app.use(BodyParser.json());
app.use(Cors());

// The URL to connect to the remote Mongo database
const databaseConnectionUrl = `mongodb+srv://amnesiaaffecteduser:f4ckth3w0rld@cluster0.ymh8g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// Connecting to the remote database
Mongoose.connect(databaseConnectionUrl, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});

// Defining the '/' (index) endpoint
// GET Request
app.get('/', (request, response) => {
	/* This function serves the functionality when there is a GET request on the / url of app. This function just returns a message back to the client side. */

	return response.send(`Maximum effort ~ Check the other rooms for TV remote`);
});

// Defining the Text utils encrypt (/textutils/encrypt) endpoint
// POST Request
app.post('/textutils/encrypt', (request, response) => {
	/* This function serves the functionality of serving the response when there is a HTTP POST request on the '/textutils/encrypt' URL of the app. The function returns the encrypted form of string as per password and plain string specified by the user. */

	let text = encrypt(request.body.text, request.body.password);
	return response.send(text);
});

// Defining the Text utils encrypt (/textutils/decrypt) endpoint
// POST Request
app.post('/textutils/decrypt', (request, response) => {
	/* This function serves the functionality of serving the response when there is a HTTP POST request on the '/textutils/decrypt' URL of the app. The function returns the decrypted and plain form of an already encrypted string as per password and plain string specified by the user. */

	let text = decrypt(request.body.text, request.body.password);
	return response.send(text);
});

// Functions defined to serve any other internal tasks
// ----
const encrypt = (text, password) => {
	/* The function to encrypt a string using a password string ;-) */

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

	// Jumping the characters of the text (plain)
	let encryptedText = ``;
	text.split('').forEach((element, index) => {
		// Iterating through the each characters of the plain text specified by the user

		encryptedText += String.fromCharCode((element.charCodeAt() + key) % 256);
	});

	// Encoding the jumbled character to the base64
	encryptedText = Buffer.from(encryptedText, 'utf-8').toString('base64');

	// Returning back the cipher text
	return encryptedText;
}

const decrypt = (text, password) => {
	/* The function to decrypt a string using a password string that was used to encrypt it */
	
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

	return decryptedText;
}
// ----

// Listening on the specfic port
app.listen(port, (error) => {
	console.log(`Listening on port-${port}`);
});