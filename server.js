/*
server.js - NarcotaApi

Author : Rishav Das (https://github.com/rdofficial/)
Created on : July 8, 2021

Last modified by : Rishav Das (https://github.com/rdofficial/)
Last modified on : July 12, 2021

Changes made in the last modification :
1. Added more validation and error reducing codes to the functions. Commented the code for serving the mongoose connection.

Authors contributed to this script (Add your name below if you have contributed) :
1. Rishav Das (github:https://github.com/rdofficial/, email:rdofficial192@gmail.com)
*/

// Importing the required modules
// ----
const Express = require('express');
const BodyParser = require('body-parser');
const Mongoose = require('mongoose');
const Cors = require('cors');

// Importing the custom defined modules
const Encryption = require('./tools/encryption');

// Importing the custom models created
//
// ----

// Creating the express app
const app = Express();
const port = process.env.PORT || 8000;

// Setting some of the properties of the express app
app.use(BodyParser.urlencoded({extended: true}));
app.use(BodyParser.json());
app.use(Cors());

// The URL to connect to the remote Mongo database
// const databaseConnectionUrl = `mongodb+srv://amnesiaaffecteduser:f4ckth3w0rld@cluster0.ymh8g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// // Connecting to the remote database
// Mongoose.connect(databaseConnectionUrl, {
// 	useNewUrlParser: true,
// 	useCreateIndex: true,
// 	useUnifiedTopology: true, }, (error) => {
// 		// Checking for the errors while connecting to the MongoDb server
// 		if (error) {
// 			// If there are any errors encountered during the process, then we display the error message on the console screen

// 			console.log(error);
// 		}
// });

// Defining the '/' (index) endpoint
// GET Request
app.get('/', (request, response) => {
	/* This function serves the functionality when there is a GET request on the / url of app. This function just returns a message back to the client side. */

	return response.send(`Maximum effort ~ Check the other rooms for TV remote`);
});

// Defining the Text utils encrypt (/textutils/encrypt) endpoint
// POST Request
app.post('/textutils/encrypt', (request, response) => {
	/* This function serves the functionality of serving the response when there is a HTTP POST request on the '/textutils/encrypt' URL of the app. The function returns the encrypted form of string as per password and plain string specified by the user. The Encryption class is implemented in this endpoint, through which we encrypt the required text. */

	// Validating the user specified inputs
	// ----
	let text = request.body.text;
	let password = request.body.password;

	if (text == undefined || password == undefined) {
		// If the user did not specified the text or password, then we return the error message back to the client

		return response.send({error : 'ValueError', message : 'Either text or password is not specified.'});
	}
	// ----

	// Encrypting the user specified text
	text = Encryption.encrypt(text, password);

	// Returing the encrypted text back to the client
	return response.send(text);
});

// Defining the Text utils encrypt (/textutils/decrypt) endpoint
// POST Request
app.post('/textutils/decrypt', (request, response) => {
	/* This function serves the functionality of serving the response when there is a HTTP POST request on the '/textutils/decrypt' URL of the app. The function returns the decrypted and plain form of an already encrypted string as per password and plain string specified by the user. The Encryption class is implemented in this endpoint, through which we decrypt the required text. */

	// Validating the user specified inputs
	// ----
	let text = request.body.text;
	let password = request.body.password;

	if (text == undefined || password == undefined) {
		// If the user did not specified the text or password, then we return the error message back to the client

		return response.send({error : 'ValueError', message : 'Either text or password is not specified.'});
	}
	// ----

	// Decrypting the user specified text
	text = Encryption.decrypt(text, password);

	// Returing the decrypted text back to the client
	return response.send(text);
});

// Defining the Text utils capitalize (/textutils/capitalize) endpoint
// POST Request
app.post('/textutils/capitalize', (request, response) => {
	/* This function serves the functionality of serving the response when there is a HTTP POST request on the '/textutils/capitalize' URL of the app. The function returns the auto capitalized form of the text input that is specified by the user. */

	// Checking the user specified inputs
	// ----
	if (request.body.text == undefined) {
		// If the user did not specified the text input, then we return the error message back to the client

		return response.send({error : 'ValueError', message : 'The text input not specified'});
	}
	// ----

	// Auto capitalizing first characters of each sentence in the user specified text
	// ----
	let text = '';
	let sentences = request.body.text.split('.');
	if (sentences.length == 0) {
		// If there are no text or sentences in the user specified text, then we a blank string back to the client

		return response.send('')
	} else {
		// If there are atleast one or more sentences, then we continue the process further

		for (let sentence of sentences) {
			// Iterating through each sentences of the user specified text

			if (sentence == '') {
				// If the sentence is blank, then we skip the current iteration

				continue;
			} else {
				if (sentence[0] == ' ') {
					text = text + ' ' + sentence[1].toUpperCase() + sentence.substr(2) + '.';
				} else {
					text = text + sentence[0].toUpperCase() + sentence.substr(1) + '.';
				}
			}
		}
	}
	// ----

	// Returining the processed text back to the client
	return response.send(text);
});

// Listening on the specfic port
app.listen(port, (error) => {
	console.log(`Listening on port-${port}`);
});