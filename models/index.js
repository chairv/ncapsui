/**
 * Created by tancw on 2016/6/28.
 */
var fs = require('fs');
var mongoose = require('mongoose');
mongoose.connect('mongodb://120.24.94.225:27017/capsui');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
    console.info('capsui db is open');
});

var models_path = __dirname + '/../models/mapping'
fs.readdirSync(models_path).forEach(function (file) {
    require(models_path + '/' + file);
    var modelName = file.replace('Model.js', '');
    exports[modelName] = mongoose.model(modelName);
});