const WithCss = require('@zeit/next-css');
const WithSass = require('@zeit/next-sass');
const withImages = require('next-images');
const withFonts = require('next-fonts');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')



module.exports = withImages(withFonts(WithCss(WithSass({
  webpack(config , {dev}){
    if(config.mode === 'production'){
      if(Array.isArray(config.optimization.minimizer)){
        config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}))
      }
    }
    return config ;
  }
}))));
