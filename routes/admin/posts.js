var express = require('express');
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var url = 'mongodb://localhost:27017/my_blog'
var ObjectId = require('mongodb').ObjectId

/* GET home page. */
router.get('/', function(req, res, next) {
    MongoClient.connect(url,function (err,db) {
        if (err) {
            res.send(err)
        }else{
            var c = db.collection("posts");
            c.find().toArray(function (err,docs) {
                if (err){
                    res.send(err)
                }else {
                    res.render('admin/article_list',{data:docs})
                }
            })
        }

    })
});
router.get('/add', function(req, res, next) {
    // 获取数据
    MongoClient.connect(url,function (err, db) {
        if (err) {
            res.send(err);
        }else {
            var c = db.collection("cats");
            c.find().toArray(function (err, docs) {
                if (err) {
                    res.send(err)
                }else{
                    res.render('admin/article_add',{data: docs})
                }
            })
        }
    })
});
router.post('/add',function (req,res,next) {
    var cat = req.body.cat;
    var title = req.body.title;
    var summary = req.body.summary;
    var content = req.body.content;
    var time = new Date();
    var post = {
        "cat": cat,
        "title": title,
        "summary": summary,
        "content": content,
        "time": time
    }
    MongoClient.connect(url,function (err,db) {
        if  (err) {
            res.send(err)
        }else{
            var c = db.collection('posts')
            c.insert(post,function (err,result) {
                if (err) {
                    res.send(err)
                }else {
                    res.send("添加文章成功<a href='/admin/posts'>查看文章列表</a>")
                }

            })
        }

    })
})
module.exports = router;