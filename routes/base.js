var express = require('express');
var router = express.Router();
var dao = require('../dao/tempDao');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Capsui|微信模板消息测试'});
});

router.get('/templist', function (req, res, next) {
    dao.temp.find(function (err, docs) {
        if (err) {
            return next(err);
        }
        res.json(docs || {});
    });
    // res.render('temps', {temps: {"li": "ds"}});
});

router.get('/getTemp',function (req, res, next) {
    dao.temp.findById(req.query.id,function (err, doc) {
        if(err){
           return next(err);
        }
        res.json(doc);
    });
});

module.exports = router;
