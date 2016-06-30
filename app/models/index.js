/**
 * Created by tancw on 2016/6/30.
 */
const fs = require('fs');
const join = require('path').join;
const config = require('../../config');
const mongoose = require('mongoose');
const models = join(__dirname, '/mapping');

//数据库连接
const connection = connect();

// Bootstrap models
fs.readdirSync(models).forEach(function (file) {
    require(join(models, file))
    var modelName = file.replace('Model.js', '');
    exports[modelName] = mongoose.model(modelName);
});

connection
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', function () {
        console.info('capsui db is open');
    });

function connect() {
    var options = {server: {socketOptions: {keepAlive: 1}}};
    var connection = mongoose.connect(config.db, options).connection;
    return connection;
}