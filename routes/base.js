var express = require('express');
var router = express.Router();
var dao = require('../dao/tempDao');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/temp', function (req, res, next) {
    dao.temp.find(function (err, docs) {
        console.info(docs);
        if (err) {
            // return next(err);
            console.info(err);
        }
        res.render('temps', {temps: docs});
    });
    // res.render('temps', {temps: {"li": "ds"}});
});

module.exports = router;
