/*
server.js - NarcotaApi

Author : Rishav Das (https://github.com/rdofficial/)
Created on : July 8, 2021

Last modified by : -
Last modified on : -

Authors contributed to this script (Add your name below if you have contributed) :
1. Rishav Das (github:https://github.com/rdofficial/, email:rdofficial192@gmail.com)
*/

// Importing the required modules
const Express = require('express');
const BodyParser = require('body-parser');
const Mongoose = require('mongoose');
const Cors = require('cors');

// Importing the custom models created
const Product = require('./models/products');

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

// Defining the /products endpoint
// GET Request
app.get('/products', (request, response) => {
	/* This function serves the functionality of serving the response when there is a GET request on the /products endpoint of the web app. The function fetches list of all the product entries stored in the database. */

	try {
		// Sending the request to fetch the products
		Product.find((error, data) => {
			if (error) {
				// If there are any errors in fetching the database, then we return the error message back to the client

				return response.status(500).send(error);
			} else {
				// If there are no errors encountered during the fetching process, then we return the fetched data back to the client

				return response.status(500).send(data);
			}
		});
	} catch (error) {
		// If there are any errors encountered during the process, then we return the error message back to the client

		return response.status(500).send(error);
	}
});

// Defining the  /products/new endpoint
// POST Request
app.post('/products/new', (request, response) => {
	/* This function serves the functionality of serving the response when there is a POST request on the /products/new endpoint of the web app. The function creates a new product entry in the database, using the user specified data and parameters. */

	// Verifying the user inputs from the POST request data
	// -----
	if (request.body.name != undefined) {
		// If the name of the product entered by the user is defined, then we continue for further validation

		if (request.body.name.length == 0) {
			// If the name of the product specified by the user is an empty string, then we return the error message back to the client

			return response.status(500).send('{"error":"ValueError", "message" : "Invalid name for the new product specified"}');
		}
	} else {
		// If the name of the product entered by the user is not defined, then we return the error message back to the client

		return response.status(500).send('{"error":"ValueError", "message" : "Invalid name for the new product specified"}');
	}
	if (request.body.price != undefined) {
		// If the name of the product entered by the user is defined, then we continue for further validation

		if ((request.body.price > 0) == false) {
			// If the price of product specified by the user is an number more than 0, then we return the error message back to the client

			return response.status(500).send('{"error":"ValueError", "message" : "Invalid price for the new product specified"}');
		}
	} else {
		// If the price of the product entered by the user is not defined, then we return the error message back to the client

		return response.status(500).send('{"error":"ValueError", "message" : "Invalid price for the new product specified"}');
	}
	// ----

	try {
		// Sending the request to insert a new product
		Product.create(request.body, (error, data) => {
			if (error) {
				// If there are any errors in fetching the database, then we return the error message to the client

				return response.status(500).send(error);
			} else {
				// If there are no errors encountered during the fetching process, then we return the fetched data back to the client

				return response.status(200).send(data);
			}
		});
	} catch (error) {
		// If there are any errors encountered during the process, then we return the error message back to the client

		return response.status(500).send(error);
	}
});

// Defining the /products/delete endpoint
// POST Request
app.post('/products/delete', (request, response) => {
	/* This function serves the functionality of serving the response when there is a POST request on the /products/delete endpoint of the web app. The function deletes the product entries in the database as per the user inputs. If the user specified the Id of the product, then the particular product is deleted. If the user speicified the name of the product entry, then all the products with such name gets deleted. */

	// Checking the inputs specified by the user in the POST request data
	// ----
	if (request.body.id != undefined) {
		// If the user specified the Id of the product to be deleted, then we continue

		Product.deleteOne({_id : request.body.id}).then(() => {
			// If the requested fields are deleted successfully, then we return the info message back to the client

			return response.status(200).send('deleted : 1');
		}).catch(error => {
			// If there are any errors encountered during the process, then we return the error message back to the client

			return response.status(500).send(error);
		});
	} else if (request.body.name != undefined) {
		// If the user specified the name of the product to be deleted, then we continue

		Product.deleteMany({name : request.body.name}).then(() => {
			// If the requested fields are deleted successfully, then we return the info message back to the client

			return response.status(200).send('deleted all');
                }).catch(error => {
			// If there are any errors encountered during the process, then we return the error message back to the client

			return response.status(500).send(error);
                });
	} else {
		// If the user specified Id or the name is not defined, then return the error message back to the client

		return response.status(500).send('{"error" : "ValueError", "message" : "Proper data not specified"}');
	}
	// ----
});

// Listening on the specfic port
app.listen(port, (error) => {
	console.log(`Listening on port-${port}`);
});