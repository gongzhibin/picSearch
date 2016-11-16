var path = require('path');
var fs = require('fs');

//遍历文件夹，并返回所有文件夹内文件路径
var walk = function(path){
    var fileList = [];
    var dirList = fs.readdirSync(path);
    dirList.forEach(function(item){
        if(fs.statSync(path + '/' + item).isDirectory()){
            walk(path + '/' + item);
        }else{
            fileList.push(path + '/' + item);
        }
    });
    return fileList;
}

exports = module.exports = walk;