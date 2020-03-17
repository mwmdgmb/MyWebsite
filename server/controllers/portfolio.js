const Portfolio = require("../models/portfolio");

exports.getPortfolios = (req, res) => {
  Portfolio.find({})
    .sort({ startDate: 1 })
    .exec((err, allPortfolios) => {
      if (err) {
        return res.status(422).send(err);
      }
      return res.json(allPortfolios);
    });
};

exports.getPortfoliosById = (req, res) => {
  const portfolioById = req.params.id;

  Portfolio.findById(portfolioById)
    .select("-__v")
    .exec((err, foundPortfolio) => {
      if (err) {
        return res.status(422).send(err);
      }
      return res.json(foundPortfolio);
    });

};

exports.savePortfolio = (req, res) => {
  const portfolioData = req.body;

  const userId = req.user && req.user.sub;


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
  const portfolioId = res.params.id;

  const portfolioData = res.body;

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
  const portfolioId = req.params.id;
  Portfolio.deleteOne({ _id: portfolioId }, (err, deletedPortfolio) => {
    if (err) {
      return res.status(422).send(err);
    }

    return res.json({ status: "DELETED" });
  });
};
