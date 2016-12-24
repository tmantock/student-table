const path = require('path');
const fs = require('fs');
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
    var fileStream = fs.createReadStream(path.join(__dirname, 'client/src/public/index.html'));
    res.statusCode = 200;
    fileStream.pipe(res);
    
    var dataLength = 0;

    fileStream
        .on('data', function (chunk){
            dataLength += chunk.length;
        })
        .on('end', function () {
            console.log(`The length was: ${dataLength}`);
        });
});

app.listen(PORT, function(){
    console.log(`===========================`);
    console.log(`Listening on PORT: ${PORT}`);
    console.log(`===========================`);
});
