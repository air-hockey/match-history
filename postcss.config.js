module.exports = {
  plugins: [
    require('postcss-easy-import')({ prefix: '_' }), // keep this first
    require('postcss-url')({
      url: 'inline',
      ignoreFragmentWarning: true
    }),
    require('autoprefixer')({
      /* ...options */
    }) // so imports are auto-prefixed too
  ]
}
