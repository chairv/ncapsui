/**
 * Created by tancw on 2016/6/28.
 */
var dao = require('../dao/tempDao');

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