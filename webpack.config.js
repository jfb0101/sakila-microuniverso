const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        films: './src/pages/films/films.js',
        currentRental: './src/pages/currentRental/currentRental.js',
        registerFilmsWithBackbone: './src/pages/register-films-with-backbone/register-films-with-backbone.js',
        listFilmsWithBackbone: './src/pages/list-films-with-backbone/list-films-with-backbone.js'
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
            { from: 'src/pages/films/films.html', to: './' },
            { from: 'src/pages/currentRental/currentRental.html',to: './'},
            { from: 'src/pages/register-films-with-backbone/register-films-with-backbone.html', to: './'},
            { from: 'src/pages/list-films-with-backbone/list-films-with-backbone.html'}
        ])
    ]
}