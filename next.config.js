const webpack = require('webpack')

module.exports = {
  webpack(config) {
    config.plugins.push(
      new webpack.EnvironmentPlugin([
        'SERVER_ENDPOINT',
        'PORT',
        'API_ROUTE',
        'GRAPHQL_ENDPOINT',
        'FACEBOOK_API_VERSION',
        'FACEBOOK_APP_ID'
      ])
    )

    return config
  }
}
