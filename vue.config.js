const Dotenv = require('dotenv-webpack');

module.exports = {
  // baseUrl: '/kitsuko/dist',
  configureWebpack: {
    plugins: [
      new Dotenv()
    ]
  }
}
