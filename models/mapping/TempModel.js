/**
 * Created by tancw on 2016/6/28.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var tempSchema = new Schema({
    template_id: {type: String},
    title: {type: String},
    primary_industry: {type: String},
    deputy_industry: {type: String},
    content: {type: String},
    example: {type: Object}
}, {collection: 'temp'});
mongoose.model('Temp', tempSchema);