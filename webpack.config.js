const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        films: './src/pages/films/films.js'
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/env'],
                    plugins: ['transform-class-properties']
                }
            },
            {
                test: /\.css$/,
                loader: ['style-loader','css-loader']
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|otf)$/,
                loader: 'file-loader?name=[name].[ext]&outputPath=./'
            }
        ]
    },
    devtool: 'source-map',
    plugins: [
        new CopyPlugin([
            { from: 'src/pages/films/films.html', to: './' }
        ])
    ]
}