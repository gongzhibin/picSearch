/**
 * Created by Administrator on 2016/11/7.
 */
$(function () {
    //该函数触发弹出选文件框，并在div中显示图片，并显示图片名
    $('#uploadImg').on('click',function(){
        var $choose=$("#chooseFile");   /*为了避免重复选择，用一个定义*/
        $choose.trigger('click');  /*由于#chooseFile点不到，只能通过上边一层触发*/
        $choose.on('change',function(){
            //这里要实现图片预览,一种方法是先发送给后台,再由后台将图片的url返回.另一种方法是使用插件.具体代码就不展示了
            //假设我们使用向后台发送的方法,这里假定responseImgUrl是后台返回的图片url
            //$('#uploadImg').attr('src',responseImgUrl)//实现预览
            var objUrl = getObjectURL(this.files[0]) ;
            //console.log("objUrl = "+objUrl) ;
            if (objUrl) {
                $(".image-layer").css("backgroundImage", "url("+objUrl+")") ;  /*将图片显示在一个div中*/
            }
            var fileName=getFileName();
            $("#info").html("你识别的图片是：&nbsp;&nbsp;<b>" + fileName+"</b>");
            //清空右边栏属性
            $(".dynamic-rc").empty();
            /*同时要发送请求*/
            //console.log(111+fileName);

            if(fileName){       
                $.ajax({
                    url: "/tags",
                    type: "post",
                    data: {"fileName": fileName},
                    dataType: "json",
                    success: function (res) {
                        var tags = res.tags;
                        $(".dynamic-rc").empty();
                        for(var i=0;i<tags.length;i++){
                            var tName = tags[i].tag_name;
                            var tConfidence = tags[i].tag_confidence;
                            var tWidth = 0.8*tConfidence;
                            $(".dynamic-rc").append("<div class='item'><div class='percent' style='width: "+tWidth+"%;'><p>"+tConfidence+"</p></div><div class='name'>"+tName+"</div></div>");
                            //$(".dynamic-rc").append('<div class="item ng-scope" ng-repeat="item in imageRecognizeItems"><div class="percent" ng-style="{'width': item.width}" style="width: '+tWidth+'%;"><p ng-bind="item.percent" class="ng-binding">'+tConfidence+'</p></div><div class="name ng-binding" ng-bind="item.name"></div></div>');
                        }
                    },
                    error:function(){alert("解析错误！")},
                });
            }
            
        });
    });
    $('#searchButton').on('click',function () {
        var searchInfo = $('#searchInfo').val();
        if($.trim(searchInfo)){
            $.ajax({
                url: "/search",
                type: "post",
                data: {"searchInfo": searchInfo},
                dataType: "json",
                success: function (res) {
                    console.log(res);
                    $("#imageList").empty();
                    var count1 = 0;
                    var count2 = 0;
                    var count3 = 0;
                    for(var i=0;i<res.length;i++){
                        count1++;
                        var imgData = JSON.parse(res[i]);
                        /*console.log("imgData的内容是：");
                        console.log(imgData);*/
                        /*imgData的格式：
                        * {path:"./images/1.jpg",tags:[{tag_confidence:19,tag_name:"公园"},{...}]}
                        * */
                        var last_imgData = JSON.parse(res[res.length-1]);
                        var tagData = imgData.tags;
                        for(var j=0;j<tagData.length;j++){
                            if(count1 === res.length){
                                count2++;
                            }
                            //console.log(typeof( tagData[1].tag_name));
                            if(tagData[j].tag_name.indexOf(searchInfo) >= 0){
                                //路径转换
                                $("#imageList").append(
                                '<div class="canvas440">'+
                                    '<div class="border">'+
                                        '<div class="show-layer" >'+
                                        '<!--这一层是多余的，可以直接到image-layer，预留为了扩展-->'+
                                            '<div>'+
                                                '<span>置信度为：'+tagData[j].tag_confidence+'</span>'+
                                            '</div>'+
                                            '<div class="image-layer" style="background-image: url('+imgData.path+')"></div>'+
                                         '</div>'+
                                    '</div>'+
                                '</div>');
                                // console.log(imgData.path);
                                // console.log(tagData[j].tag_confidence);
                                count3++;
                            }
                            //console.log(count1,count2,count3);
                            //搜索到最后没结果就输出未检测到图片
                            if(count1 === res.length && count2 === last_imgData.tags.length && count3 === 0 ){
                                $("#imageList").append('<div class="tag_confidence"><span>未检测到图片</span></div>');
                            }
                        }

                    }

                    // for(var i=0;i<tags.length;i++){
                    //     var tName = tags[i].tag_name;
                    //     var tConfidence = tags[i].tag_confidence;
                    //     var tWidth = 0.8*tConfidence;
                    //     $(".dynamic-rc").append("<div class='item'><div class='percent' style='width: "+tWidth+"%;'><p>"+tConfidence+"</p></div><div class='name'>"+tName+"</div></div>");
                    //     //$(".dynamic-rc").append('<div class="item ng-scope" ng-repeat="item in imageRecognizeItems"><div class="percent" ng-style="{'width': item.width}" style="width: '+tWidth+'%;"><p ng-bind="item.percent" class="ng-binding">'+tConfidence+'</p></div><div class="name ng-binding" ng-bind="item.name"></div></div>');
                    // }
                },
                error:function(){alert("解析错误！请检查网络是否连通")},
            });
        }
    })

    //获取上传文件的名称
    function getFileName() {
        var path = $("#chooseFile").val();      /*C:\fakepath\http_imgload.jpg|类似这种形式的路径，进行划分*/
        var pos1 = path.split('\\');            /*以\划分，第一个\转义*/
        /*alert("以\\划分:"+pos1[pos1.length-1]);*/
        return pos1[pos1.length-1];
    }

    //建立一個可存取到該file的url，在第一个函数中调用过
    function getObjectURL(file) {
        var url = null ;
        if (window.createObjectURL!=undefined) { // basic
            url = window.createObjectURL(file) ;
        } else if (window.URL!=undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file) ;
        } else if (window.webkitURL!=undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file) ;
        }
        return url ;
    }
});


