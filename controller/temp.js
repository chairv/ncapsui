/**
 * Created by tancw on 2016/6/28.
 */
var dao = require('../dao/TempDao');
var UtModel = require('./../models').UTemp;
var TempModel = require('./../models').Temp;
var utils = require('./caputils');

exports.list = function (req, res, next) {
    dao.Temp.getAll(function (err, docs) {
        if (err) {
            return next(err);
        }
        res.json(docs || {});
    });
}

exports.getById = function (req, res, next) {
    dao.Temp.getById(req.query.id, function (err, doc) {
        if (err) {
            return next(err);
        }
        res.json(doc || {});
    })
}

exports.loadTemp = function (req, res, next) {
    var token = req.query.access_token;
    var url = 'https://api.weixin.qq.com/cgi-bin/template/get_all_private_template?access_token=' + token;
    utils.httpsget(url, function (data) {
        console.info(data);
        var temps = data.template_list;
        if (temps != null) {
            temps.forEach(function (doc) {
                var tmepModel = new TempModel(doc);
                saveWhenNotExist(tmepModel, function (temp) {
                    doc.access_token = token;
                    doc.tempId = temp.id;
                    var utemp = new UtModel(doc);
                    utemp.save(function (err) {
                        console.info(err);
                    });
                });
            });
        }
    });
    return res.send({'success': true});
}

function saveWhenNotExist(model, callback) {
    model.save(function (err, doc) {
        if (err) {
            TempModel.findOne({'content': model.content}, function (err, result) {
                return callback(result);
            });
        } else {
            return callback(doc);
        }
    });
}

