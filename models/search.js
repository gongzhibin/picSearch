var path = require('path');
var fs = require('fs');
var async = require('async');
var tags = [];
var fileList = [];

var walk = require('./walk.js');

var analysis = require('./analysis.js');

async.waterfall([
    function(callback) {
        fileList = walk('./pictures');
        callback(null,fileList);
    },
    function(arg,callback) {
        //for(i=0;i<arg.length;i++){
            data = analysis('./pictures/a.jpg');
            console.log(data);
            tags.push(data);
       // }
        callback(null, tags);
    }
], function (err, result) {
	console.log('err: ', err);
    console.log('result: ', result);
});
