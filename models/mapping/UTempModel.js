/**
 * Created by tancw on 2016/6/28.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = new Schema({
    tempid:{type:String},
    template_id: {type: String},
    title: {type: String},
    primary_industry: {type: String},
    deputy_industry: {type: String},
    content: {type: String},
    example: {type: Object},
    access_token:{type:String},
    createDate: { type: Date, default: Date.now }
}, {collection: 'u_temp'});
mongoose.model('UTemp', schema);