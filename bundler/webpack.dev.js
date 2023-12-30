const webpackMerge = require('webpack-merge')
const commonConfiguration = require('./webpack.common.js')

module.exports = webpackMerge(
    commonConfiguration,
    {
        mode: 'development',
        devServer:
        {
            contentBase: './dist',
            open: true,
            watchOptions: {
                poll: true // Enable polling for automatic refresh
            }
        }
    }
)
