var MongoClient = require("mongodb").MongoClient;
var url = 'mongodb://localhost:27017/my_blog'
var ObjectId = require('mongodb').ObjectId
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.render('admin/category_list');
    MongoClient.connect(url,function (err, db) {
        if (err) {
            res.send(err);
        }else {
            var c = db.collection("cats");
            c.find().toArray(function (err, docs) {
                if (err) {
                    res.send(err)
                }else{
                    res.render('admin/category_list',{data: docs})
                }
            })
        }
    })
});
router.get('/add', function(req, res, next) {
    res.render('admin/category_add');
});
router.post('/add', function(req, res) {
    //res.render('admin/category_add');
    //获取表单内容
    var title = req.body.title;
    var sort = req.body.sort;
    MongoClient.connect(url,function (err,db) {
        if (err) {
            res.send (err)
        } else {
            var c = db.collection("cats")
            c.insert({title:title,sort:sort}, function (err,result) {
                if (err) {
                    res.send(err)
                } else {
                    res.send("添加分类成功!<a href='/admin/cats'>查看列表</a>")
                }
            })
        }
    })
});
router.get('/edit', function(req, res, next) {
    var id = req.query.id;
    MongoClient.connect(url,function (err,db) {
        if (err) {
            res.send(err)
        }else {
            var c = db.collection("cats")
            c.find({_id: ObjectId(id)}).toArray(function (err, docs) {
                console.log(docs)
                if (err) {
                    res.send(err)
                }else {
                    //res.send('err')
                    res.render('admin/category_edit',{data:docs[0]})
                }

            })
        }

    })
});
router.post('/edit',function (req,res,next) {
    var title = req.body.title
    var sort = req.body.sort
    var id = req.body.id
    MongoClient.connect(url,function (err,db) {
        if(err) {
            res.send(err)
        }else {
            var c = db.collection("cats")
            c.update({_id:ObjectId(id)},{$set:{"title":title,"sort":sort}},function (err, result) {
               if (err) {
                   res.send(err)
               }else {
                   res.send("更新成功！<a href='/admin/cats'>返回列表</a>")
               }
            })
        }

    })

})
router.get('/delete',function (req,res) {
    var id = req.query.id
    MongoClient.connect(url,function (err,db) {
        if(err) {
            res.send(err)
        }else{
            var c = db.collection("cats")
            c.remove({_id: ObjectId(id)},function (err,result) {
                if (err) {
                    res.send(err)
                }else {
                    res.redirect("/admin/cats")
                }
            })
        }
    })
})


module.exports = router;
