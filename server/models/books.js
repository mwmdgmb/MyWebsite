const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
	title: String,
	auther: String,
	pages: Number,
	price: Number
});

module.exports = mongoose.model('Book', bookSchema);
