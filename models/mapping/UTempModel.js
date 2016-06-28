/**
 * Created by tancw on 2016/6/28.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = new Schema({
    openid:{type:String},
    template_id: {type: String},
    title: {type: String},
    content: {type: String},
    example: {type: Object}
}, {collection: 'u_temp'});
mongoose.model('UTemp', schema);