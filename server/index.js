const express = require('express');
const next = require('next');
const routes = require('../routes');
const mongoose = require('mongoose');

// server

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });

const handle = routes.getRequestHandler(app);

const authService = require('./services/auth');

const config = require('./config');

const Book = require('./models/books');

const bodyParser = require('body-parser');

const bookRoutes = require('./routes/book');

const portfolioRoutes = require('./routes/portfolio');

// src

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

mongoose
	.connect(config.DB_URI, { useNewUrlParser: true })
	.then(() => console.log('> Database is Connected!!'))
	.catch((err) => console.error('Not Connected to Database ERROR! ', err));

// async () => (await mongoose.connect(config.DB_URI, { useNewUrlParser: true }))();

app
	.prepare()
	.then(() => {
		const server = express();
		server.use(bodyParser.json());

		// server.get('/profile/:id', (req, res) => {
		// 	const actualPage = '/profile';
		// 	const queryParams = { id: req.params.id };
		// 	app.render(req, res, actualPage, queryParams);
		// });

		server.use('/api/v1/portfolios', portfolioRoutes);
		server.use('/api/v1/books', bookRoutes);

		server.get('/api/v1/secret', (req, res) => {
			return res.json(secretData);
		});

		server.get('/api/v1/onlysiteowner', (req, res) => {
			return res.json(secretData);
		});

		server.get('*', (req, res) => {
			return handle(req, res);
		});

		server.use(function(err, req, res, next) {
			if (err.name === 'UnauthorizedError') {
				res.status(401).send({
					title: 'Unauthorized',
					detail: 'UnauthorizedError Access!'
				});
			}
		});

		server.use(handle).listen(3000, (err) => {
			if (err) throw err;
			console.log('> Ready on http://localhost:3000');
		});
	})
	.catch((ex) => {
		console.error(ex.stack);
		process.exit(1);
	});
