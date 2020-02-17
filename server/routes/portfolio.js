const express = require('express');
const router = express.Router();
const portfolioControler = require('../controllers/portfolio');
const authServies = require('../services/auth');

router.post('', authServies.checkJWK, authServies.checkRole('siteOwner'), portfolioControler.savePortfolio);

router.get('', portfolioControler.getPortfolios);

router.get('/:id', portfolioControler.getPortfoliosById);

router.patch('/:id', authServies.checkJWK, authServies.checkRole('siteOwner'), portfolioControler.updatePortfolio);

router.delete('/:id', authServies.checkJWK, authServies.checkRole('siteOwner'), portfolioControler.deletePortfolio);

module.exports = router;
