var path = require('path');
var youtu = require('./youtu.js');

var handler = function(picPath,callback){
    var res = {};
    var picData = {};
    youtu.imagetag(picPath, function(data) {
        picData.tags = data.data.tags;
        picData.path = picPath;
        res = JSON.stringify(picData);
        callback(res);
    });
}

// handler("../public/images/a.jpg",function (data) {
//     console.log(data);
// });
exports = module.exports = handler

// //获取图片标签
// var handler = function(picPath,callback){
// 	var allTags = [];
// 	var picData = {};
// 	var res;
// 	youtu.imagetag(picPath, function(data) {
// 		picData.tags = data.data.tags;
// 		picData.path = picPath;
// 		allTags.push(picData);
// 		res = JSON.stringify(allTags);
// 		return res;
// 	});
// };

// //对文件夹循环
// var getImageTag = function(pathList){
// 	for(var i=0;i<pathList.length;i++){
// 		handler(pathList[i]);
// 	}
// }

// console.log(res);

// exports = module.exports = getImageTag