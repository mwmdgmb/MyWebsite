const WithCss = require('@zeit/next-css');
const WithSass = require('@zeit/next-sass');
const withImages = require('next-images');

module.exports = withImages(WithCss(WithSass()));
