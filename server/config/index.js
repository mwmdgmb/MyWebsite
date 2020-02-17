if (process.env.NODE_ENV === 'production') {
	module.exports = require('./pord.js');
} else {
	module.exports = require('./dev.js');
}
