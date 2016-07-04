/**
 * Created by qiao on 2016/6/26.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://120.24.94.225:27017/capsui');
var db = mongoose.connection;

db.on('error',console.error.bind(console,'connection error: '));
db.once('open', function () {
    console.info('capsui db is open');
});

var Schema = mongoose.Schema;
var tempSchema = new Schema({
    _id:{type:Object},
    template_id: {type: String},
    title: {type: String},
    primary_industry: {type: String},
    deputy_industry: {type: String},
    content: {type: String},
    example: {type: String}
},{collection:'temp'});

exports.temp = mongoose.model('temp', tempSchema);