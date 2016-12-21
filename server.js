const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
const PORT = process.env.PORT || 3000;

const app = express();
const compiler = webpack(config);

app.use(express.static(__dirname + '/dist'));
app.use(webpackMiddleware(compiler));
app.use(webpackHotMiddleware(compiler));
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'client/src/public/index.html'));
});

app.listen(PORT);