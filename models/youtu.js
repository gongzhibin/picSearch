var path = require('path');
var fs = require('fs');

//优图认证
var youtusdk = require('tencentyoutuyun'),
    youtuconf = youtusdk.conf,
    youtu = youtusdk.youtu;

youtuconf.setAppInfo('10008881','AKIDTnvvmWpRinsw57PI9NXj3HJyY1MV7cQJ','rWCRbaQ5c0DJJBrMxQHlxRp1Vs722bSC','2271721552',0);

exports = module.exports = youtu;

