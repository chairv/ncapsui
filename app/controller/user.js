/**
 * Created by tancw on 2016/7/1.
 */
var models = require('../models');

exports.login = function (req, res) {
  console.info();
    var user = {
        id: '1',
        role: 'editor',
        userId:'1',
        access_token:'-tsfBpKeT5jGfsVR5bd3b6D_LoZIwsA4n4oySxljEAU3T502UyPimMnfKbx6KWvJaYN1mZQHuxWBovAIcviuAr27LZuXNs9WqEfbC8Nf43GWa2k9arsJnH14m7UCavYwBTShCDAJBA'
    }

    res.send({id: '', 'user': user });
}