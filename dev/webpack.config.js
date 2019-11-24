const   webpack = require('webpack'),
        path = require('path'),
        CopyWebpackPlugin = require('copy-webpack-plugin'),
        ExtractTextPlugin = require('extract-text-webpack-plugin'),
        autoprefixer = require('autoprefixer');
        Env = require('dotenv-webpack');

module.exports = {
    target: 'web',
    node: {
        fs: 'empty'
    },
    resolve: {
      extensions: ['.js']
    },
    entry: {
        piano: path.join(__dirname, 'js', 'piano.js'),
        common: path.join(__dirname, 'js', 'menu.js'),
    },
    output: {
        path: path.join(__dirname, "..", 'assets'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            { test: /\.js$/, loader: 'babel-loader?compact=false' },
            { test: /\.json$/, loader: 'json-loader' },
            {
                test: /\.css$/, 
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{ loader: 'css-loader' }],
                }),
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader' }, 
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    autoprefixer()
                                ],
                                sourceMap: true
                            }
                        },
                        { loader: 'less-loader' }],
                }),
            },
            {
                test: /\.(eot|woff|woff2|ttf)([\?]?.*)$/,
                loader: 'file-loader?name=[name].[ext]&publicPath=/fonts/&outputPath=fonts/&publicPath=/assets/fonts/'
            },
            {
                test: /\.(svg|png)$/,
                loader: 'file-loader?name=[name].[ext]&publicPath=/img/&outputPath=img/&publicPath=/assets/img/'
            },
            {
                test: /\.jade$/,
                loader: 'jade-loader'
            }
        ]
    },
    plugins: [
        new Env(),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin({ filename: 'css/[name].css', disable: false, allChunks: true }),
        new CopyWebpackPlugin([
            { from: path.join('img'), to: 'img' },
        ])
    ]
};
