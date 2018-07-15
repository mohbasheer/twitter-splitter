import webpack from 'webpack';
import path from 'path';

export default {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: [
        path.resolve(__dirname, 'src/index')
    ],
    target: 'web',
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'src')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: path.join(__dirname, 'node_modules'),
                include: path.join(__dirname, 'src'),
                use: 'babel-loader'
            },
            {
                test: /\.css$/, use: ['style-loader', 'css-loader']
            }
        ]
    }
};