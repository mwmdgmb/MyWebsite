var jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

// middleware

// exports.checkJWK = function(req, res, next) {
// 	const isValidToken = true;
// 	if (isValidToken) {
// 		next();
// 	} else {
// 		return res.status(401).send({ title: 'Not Authrized', detail: 'Please login in order to get a data' });
// 	}
// };

exports.checkJWK = jwt({
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 15,
		jwksUri: 'https://dev-5z8osyph.auth0.com/.well-known/jwks.json'
	}),
	audience: 'qiIfWiVHXdjsIVmOMq3P0Fqfjf7GAx4P',
	issuer: 'https://dev-5z8osyph.auth0.com/',

	algorihms: [ 'R5256' ]
});
