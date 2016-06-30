/**
 * Created by tancw on 2016/6/28.
 */
var models = require('../models');
var utils = require('./caputils');

exports.list = function (req, res, next) {
    models.Temp.find({}, function (err, docs) {
        if (err) {
            next(err);
        }
        res.json(docs || {});
    });
}

exports.getById = function (req, res, next) {
    models.Temp.find({id: req.query.id}, function (err, doc) {
        if (err) {
            console.info(err);
        }
        res.json(doc || {});
    })
}

exports.loadTemp = function (req, res, next) {
    var token = req.query.access_token;
    var url = 'https://api.weixin.qq.com/cgi-bin/template/get_all_private_template?access_token=' + token;
    utils.httpsget(url, function (data) {
        var temps = data.template_list;
        if (temps) {
            temps.forEach(function (doc) {
                var tmepModel = new models.Temp(doc);
                saveWhenNotExist(tmepModel, function (temp) {
                    doc.access_token = token;
                    doc.tempId = temp.id;
                    var utemp = new models.UTemp(doc);
                    utemp.save(function (err) {
                        // console.info(err);
                    });
                });
            });
        }
        return res.send({'data': data});
    });
}

function saveWhenNotExist(model, callback) {
    model.save(function (err, doc) {
        if (err) {
            models.Temp.findOne({'content': model.content}, function (err, result) {
                return callback(result);
            });
        } else {
            return callback(doc);
        }
    });
}


exports.loadUserTemp = function (req, res, next) {
    var token = req.query.access_token;
    models.UTemp.find({'access_token': token}, function (err, docs) {
        if (err)console.info(err);
        console.info(docs);
        res.send({'temps': docs});
    });
}