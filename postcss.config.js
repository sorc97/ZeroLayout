module.exports = {
  plugins: [
    require('autoprefixer'),
/*     require('css-mqpacker')({
      sort: function (a, b) {
        return a.localeCompare(b);
      }
    }), */
    require('cssnano')({
      preset: [
        'default', {
          discardComments: {
            removeAll: true,
          }
        }
      ]
    })
  ]
}