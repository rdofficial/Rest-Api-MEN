/*
products.js - NarcotaApi

A mongoose model for the products. Per product, the two values required are the product name and the product price.

Author : Rishav Das (https://github.com/rdofficial/)
Created on : July 7, 2021

Last modified by: -
Last modified on: -
*/

// Importing the required modules
const Mongoose = require('mongoose');

// Defining the MongoDb schema for the Products field
const ProductSchema = Mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	price: {
		type: String,
		required: true,
	},
});

// Exporting the Product model created from the product schema
module.exports = Mongoose.model('Product', ProductSchema);