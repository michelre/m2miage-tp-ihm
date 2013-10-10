var RRServer = {
    fs: require('fs')
            , express: require('express')
            , app: null
            , init: function(port) {
        this.app = this.express().use(this.express.static(__dirname))
                .use(this.express.bodyParser())
                .get('/generateHierarchy', function(req, res) {
            var str = ''
                    , nb = Math.round(3 + Math.random() * 5);
            for (var i = 0; i < nb; i++) {
                if (Math.random() < 0.3) {
                    str += '<li class="Album"><span class="name">Sous-Album ' + Math.random().toString(36).substring(7) + ' (<span class="nb"></span>)</span></li>';
                } else {
                    str += '<li class="file">Photo ' + Math.random().toString(36).substring(7) + '</li>';
                }
            }
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8', 
                                'Access-Control-Allow-Origin' : 'http://localhost:1234'});
            res.end(str);
        })
                .listen(port);
    }
};

var port = process.env.PORT || 9999;
console.log("Listening on port " + port);
RRServer.init(port);