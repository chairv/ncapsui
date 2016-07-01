var express = require('express');
var router = express.Router();
var temp = require('../controller/temp');
var user = require('../controller/user');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'Capsui|微信模板消息测试'});
});
router.get('/templist', temp.list);
router.get('/getTemp', temp.getById);
router.get('/loadTemp', temp.loadTemp);
router.get('/loadUserTemp', temp.loadUserTemp);
router.post('/login.do', user.login);
module.exports = router;