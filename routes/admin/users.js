var MongoClient = require("mongodb").MongoClient;
var url = 'mongodb://localhost:27017/my_blog'
var ObjectId = require('mongodb').ObjectId
var express = require('express');
var router = express.Router();

/* GET home page. */
function checkNotLogin(req,res,next) {
    if (req.session.isLogin) {
        res.redirect('/admin/index')
    }
    next();
}
router.use('/login', checkNotLogin)
router.get('/login', function(req, res, next) {
    res.render('admin/login');
});
router.post('/signin',function (req,res,next) {
    var username = req.body.username;
    var pwd = req.body.pwd;
    MongoClient.connect(url,function (err,db) {
        if(err) {
            res.send(err)
        }else{
            var c = db.collection('users')
            c.find({username:username,pwd:pwd}).toArray(function (err,docs) {
                if (err) {
                    res.send(err)
                }else {
                    if (docs.length) {
                        req.session.isLogin = true;
                        res.redirect('/admin/index')
                    }else {
                        res.redirect('/admin/users/login')
                    }
                }

            })
        }

    })
})
router.get('/logout',function (req,res) {
    req.session.isLogin = null
    res.redirect('/admin/index')

})
module.exports = router;
