1.访问127.0.0.1:3000/      -->     点提交图片时      -->
                    /tags  -->转向./routers/index.js整个文件（模块）中的 /tags 路由来处理
  处理过程：利用回调函数，调用分析图片方法

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