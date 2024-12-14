const path = require('path')
const os = require('os')
const crypto = require('crypto')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const dotenv = require('dotenv');
dotenv.config()
const devMode = process.env.MODE !== "production";


const plugins = [

    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "./src/index.html"),
        inject: "body"
    }),

    new MiniCssExtractPlugin({
        filename: devMode ? "[name].css" :"[name].[contenthash].css",
        chunkFilename: devMode ?  "[id].css" : "[id].[contenthash].css",
    }),

    new CleanWebpackPlugin(),
];

const rules = [
    {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    },
    {
        test: /\.(html)$/,
        use: "html-loader",
    },
    {
        test: /\.(sa|sc|c)ss$/i, use: [
            devMode ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader"
        ]
    },
    {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        type: devMode ? "asset/resource" : "asset",
    },
]

module.exports = {
    mode: process.env.MODE,

    entry: {
        main: path.resolve(__dirname, './src/index.ts'),
    },

    plugins: plugins,

    output: {
        filename: devMode ? "[name].bundle.js" : "[name].[contenthash].js",
        assetModuleFilename:  devMode ? "assets/[name][ext][query]" : "assets/[hash][ext][query]",
        path: devMode ?path.resolve(__dirname, "dist") : path.resolve(__dirname, "build"),
        clean: true
    },

    module: {
        rules: rules
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    devtool: "source-map",
    devServer: {
        open: true,
        hot: true,
        port: 3000,
    },

    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ]
    }
}

