const express = require('express');
const next = require('next');
const routes = require('../routes');

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });

const handle = routes.getRequestHandler(app);

// const authService = require('./services/auth');

const secretData = [
	{
		title: 'sercretData 1 ',
		description: 'Plans how to build spaceship'
	},
	{
		title: 'sercretData 2 ',
		description: 'My sercret Password'
	}
];

app
	.prepare()
	.then(() => {
		const server = express();

		// server.get('/profile/:id', (req, res) => {
		// 	const actualPage = '/profile';
		// 	const queryParams = { id: req.params.id };
		// 	app.render(req, res, actualPage, queryParams);
		// });

		server.get('/api/v1/secret', (req, res) => {
			return res.json(secretData);
		});

		server.get('*', (req, res) => {
			return handle(req, res);
		});

		// server.use(function(err, req, res, next) {
		// 	if (err.name === 'UnauthorizedError') {
		// 		res.status(401).send({
		// 			title: 'Unauthorized',
		// 			detail:'UnauthorizedError Access!'
		// 		});
		// 	}
		// });

		server.use(handle).listen(3000, (err) => {
			if (err) throw err;
			console.log('> Ready on http://localhost:3000');
		});
	})
	.catch((ex) => {
		console.error(ex.stack);
		process.exit(1);
	});
