const Portfolio = require('../models/portfolio');

exports.getPortfolios = (req, res) => {

	Portfolio.find({})
		.sort({"startDate":1})
		.exec((err, allPortfolios)=>{
			if (err) {
				return res.status(422).send(err);
			}
			return res.json(allPortfolios);
		})
};

exports.getPortfoliosById = (req, res) => {

	const portfolioById = req.params.id;

	Portfolio.findById(portfolioById).select("-__v").exec((err, foundPortfolio)=>{
		if (err) {
			return res.status(422).send(err);
		}
		return res.json(foundPortfolio);
	})

	// Portfolio.findById(portfolioById, (err, foundPortfolio) => {
	// 	if (err) {
	// 		return res.status(422).send(err);
	// 	}
	// 	return res.json(foundPortfolio);
	// 	console.log("foundPortfolio", foundPortfolio);
	// });
};

exports.savePortfolio = (req, res) => {
	const portfolioData = req.body;

	const userId = req.user && req.user.sub;

	// console.log(portfolioData);

	const portfolio = new Portfolio(portfolioData);
	portfolio.userId = userId;

	portfolio.save((err, createdPortfolio) => {
		if (err) {
			return res.status(422).send(err);
		}
		return res.json(createdPortfolio);
	});
};

exports.updatePortfolio = (res, req) => {
	// console.log('UPDATED');
	const portfolioId = res.params.id;
	// console.log('portfolioId :', portfolioId);

	const portfolioData = res.body;
	// console.log('portfolioData :', portfolioData);

	Portfolio.findById(portfolioId, (err, foundPortfolio) => {
		if (err) {
			return req.status(422).send(err);
		}
		foundPortfolio.set(portfolioData);
		foundPortfolio.save((err, savedPortfolio) => {
			if (err) {
				return req.status(422).send(err);
			}

			return req.json(foundPortfolio);
		});
	});
};

exports.deletePortfolio = (req, res) => {
	// console.log('DELETED');
	const portfolioId = req.params.id;
	Portfolio.deleteOne({ _id: portfolioId }, (err, deletedPortfolio) => {
		if (err) {
			return res.status(422).send(err);
		}

		return res.json({ status: 'DELETED' });
	});
};
