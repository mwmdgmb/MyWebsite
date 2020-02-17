const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const setStringTypes = (maxLength) => ({
	type: String,
	required: true,
	maxlength: maxLength
});

const portfolioSchema = new Schema({
	userId: setStringTypes(512),
	title: setStringTypes(256),
	company: setStringTypes(256),
	location: setStringTypes(128),
	description: setStringTypes(2048),
	position: setStringTypes(256),
	startDate: { type: Date, required: true },
	endDate: Date
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
