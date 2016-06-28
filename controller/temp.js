/**
 * Created by tancw on 2016/6/28.
 */
var dao = require('../dao/TempDao');
var udao = require('../dao/UtempDao');
var UTemp = require('./../models').UTemp;
var https  = require('https');

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
    var tempId = req.query.tempId;
    var matchTemp = {};
    https.get('https://api.weixin.qq.com/cgi-bin/template/get_all_private_template?access_token=' + token, function (response) {
       console.info(response.statusCode);
       console.info(response.headers);
       console.info(response.content);
    });
    res.json(matchTemp);
}