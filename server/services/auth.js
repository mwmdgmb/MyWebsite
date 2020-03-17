var jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const namespace = 'http://localhost:3000/';

exports.checkJWK = jwt({
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 50,
		jwksUri: 'https://dev-5z8osyph.auth0.com/.well-known/jwks.json'
	}),
	audience: 'qiIfWiVHXdjsIVmOMq3P0Fqfjf7GAx4P',
	issuer: 'https://dev-5z8osyph.auth0.com/',

	algorihms: [ 'R5256' ]
});

exports.checkRole = (role) => (req, res, next) => {
	const user = req.user;
	if (user && (user[process.env.NAMESPACE + "/role"] === role)) {
		next();
	} else {
		return res.status(401).send({
			title: 'Not Authorized',
			detail: 'You are not authrorized to access this data'
		});
	}
};
