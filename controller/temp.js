/**
 * Created by tancw on 2016/6/28.
 */
var dao = require('../dao/TempDao');
var udao = require('../dao/UtempDao');
var UtModel = require('./../models').UTemp;
var TempModel = require('./../models').Temp;
var https = require('https');

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
        var body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            var jsonData = JSON.parse(body);
            if (jsonData['template_list']) {
                jsonData['template_list'].forEach(function (doc) {
                    var ut = new UtModel(doc);
                    ut.access_token = token;
                    dao.Temp.getByQuery({'content': doc.content, "title": doc.title}, null, null,
                        function (err, model) {
                            // dao.Temp.create(doc,function (TempModel) {
                            //    console.info(TempModel);
                            // })
                            console.info('no model');
                        });
                    udao.UTemp.create(ut, null);
                });
            }
        });
    });
    res.json(matchTemp);
}