//检查版本
require('../build/check-versions')()

//express
var express = require('express')
var app = express()

//path
var path = require('path')

//webpack
var webpack = require('webpack')
var merge = require('webpack-merge')

//plugin
var HtmlWebpackPlugin = require('html-webpack-plugin')

//webpack config
var webpackConfig = require('./bundle')

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

//发布
app.get('/bundle', function(req, res) {
    var bundleConfig = merge(webpackConfig, {
        output: {
            path: path.resolve(__dirname, '../dist/page1'),
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: path.resolve(__dirname, '../dist/page1/index.html'),
                template: 'index.html',
                inject: true,
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                },
                chunksSortMode: 'dependency'
            })
        ]
    })
    webpack(bundleConfig, function (err, stats) {
    	if (err) throw err
    	console.log('打包完成......')
	})
    res.send('111')
});

app.listen(3000);