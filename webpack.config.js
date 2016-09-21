var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    entry: [
        'webpack-dev-server/client?http://localhost:9091',
        'webpack/hot/only-dev-server',
        './src/app/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass!',
                include: path.join(__dirname, 'src')
            },
        ]
    },
    resolve: {
        extensions: ['', '.js'],
        modulesDirectories: ['node_modules'],
        root: [path.join(__dirname, './src')]
    }
};
