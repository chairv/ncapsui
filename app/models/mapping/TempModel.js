/**
 * Created by tancw on 2016/6/28.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = new Schema({
    title: {type: String},
    primary_industry: {type: String},
    deputy_industry: {type: String},
    content: {type: String},
    example: {type: Object},
    createDate: { type: Date, default: Date.now }
}, {collection: 'temp'});
mongoose.model('Temp', schema);