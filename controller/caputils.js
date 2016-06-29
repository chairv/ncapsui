/**
 * Created by tancw on 2016/6/29.
 */
var https = require('https');

exports.httpsget = function (url,callback) {
    https.get(url, function (response) {
        var body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            var jsonData = JSON.parse(body);
            return callback(jsonData);
        });
    });
}