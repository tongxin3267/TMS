//检查版本
require('../build/check-versions')()

//express
var fs = require('fs')
var express = require('express')
var bodyParser = require('body-parser')
var app = express()

// create application/json parser 
var jsonParser = bodyParser.json()

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
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET");
    res.header("Access-Control-Allow-Headers","content-type");
    res.header("Access-Control-Max-Age","1728000");
    res.header("Access-Control-Allow-Credentials","true");
    next();
});
var num = 0;
//发布
app.post('/bundle', jsonParser, function(req, res) {
    //receive treeData
    var treeData = 'export default ' + JSON.stringify({tree:req.body.tree})
    //create tree.js
    fs.writeFile(path.resolve(__dirname, '..', 'src/page/tree.js'), treeData, (err) => {
        if (err) throw err;
        //webpack merge config
        num+=1;
        var bundleConfig = merge(webpackConfig, {
            output: {
                path: path.resolve(__dirname, '../dist/page'+num),
            },
            plugins: [
                new HtmlWebpackPlugin({
                    filename: path.resolve(__dirname, '../dist/page'+num+'/index.html'),
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
        //webpack bundle
        webpack(bundleConfig, function (err, stats) {
            if (err) throw err
            console.log('打包完成......')
            res.send('打包完成！！！')
        })
    });
    
});

app.listen(3000);