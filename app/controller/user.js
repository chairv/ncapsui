/**
 * Created by tancw on 2016/7/1.
 */
var User = require('../models').User;

exports.login = function (req, res) {
    console.info();
    var user = {
        id: '1',
        role: 'editor',
        userId: '1',
        access_token: '-tsfBpKeT5jGfsVR5bd3b6D_LoZIwsA4n4oySxljEAU3T502UyPimMnfKbx6KWvJaYN1mZQHuxWBovAIcviuAr27LZuXNs9WqEfbC8Nf43GWa2k9arsJnH14m7UCavYwBTShCDAJBA'
    }

    res.send({id: '', 'user': user});
}

exports.register = function (req, res, next) {
    var model = new User(req.body);
    User.find({email:model.email},function (err,doc) {
        if (err)next(err);

        if (doc.length > 0) {
            res.send({success: false, msg: '邮箱已存在'});
        } else {
            model.save(model, function (err, doc) {
                if (err)next(err);
                res.send({success: true, user: doc});
            });

        }
    });
}

exports.active = function (req,res,next) {

}