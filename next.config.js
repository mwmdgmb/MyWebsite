const WithCss = require('@zeit/next-css');
const WithSass = require('@zeit/next-sass');
const withImages = require('next-images');
const withFonts = require('next-fonts');

module.exports = withImages(withFonts(WithCss(WithSass())));
