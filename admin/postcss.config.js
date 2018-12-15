module.exports = {
  plugins: [
    require('@csstools/postcss-sass'),
    require('postcss-import'),
    require('postcss-nested'),
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default',
    }),
  ],
};
