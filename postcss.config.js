module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-px2rem': {
      remUnit: 75
    },
    'autoprefixer': {
      browsers: ['last 10 versions']
    }
  }
}
