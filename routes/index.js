var path = require('path');
var express = require('express');
var router = express.Router();
// var EventProxy = require('eventproxy');
var handler = require('../models/analysis.js');
var walk = require('../models/walk.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/tags', function(req, res, next) {
 // res.render('index', { title: 'Express' });
  //console.log(req.body);
    /*./images实际上时跟目录，为什么要带.呢？*/
  handler(path.join("./images",req.body.fileName),function (data) {
      res.send(data);
  });
  //console.log(data);
});

router.post('/search', function(req, res, next) {
    var searchInfo = req.body.searchInfo;
    console.log(searchInfo);
    var pathList = [];
    pathList = walk("./images");
    console.log(pathList);
    var picData = [];
    var count = 0;
    for(var i=0;i<pathList.length;i++){
        handler(pathList[i],function (data) {
            picData.push(data);
            count++;
            if(count===pathList.length){
                //console.log(picData);
                res.send(picData);
                // for(var j=0;j<picData.length;j++){
                //     var attr = JSON.parse(picData[j]);
                //     // console.log(attr.tags);
                //     for(var k=0;k<attr['tags'].length;k++){
                //         if(searchInfo == attr['tags'][k]['tag_name']){
                //             console.log(picData[j]['path']);
                //         }
                //     }
                // }
            }
        });
    }
});

module.exports = router;
