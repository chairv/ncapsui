/**
 * Created by tancw on 2016/7/4.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = new Schema({
    email: {type: String},
    password:{type:String},
    openid: {type: String,default:''},
    access_token: {type: String,default:''},
    createDate: { type: Date, default: Date.now }
}, {collection: 'user'});
mongoose.model('User', schema);