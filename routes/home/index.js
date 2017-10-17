var MongoClient = require("mongodb").MongoClient;
var url = 'mongodb://localhost:27017/my_blog'
var ObjectId = require('mongodb').ObjectId
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  MongoClient.connect(url,function (err,db) {
    if (err){
      res.send(err)
    }else {
      var c = db.collection("posts")
        var c1 = db.collection("cats")
        c.find().toArray(function (err,docs) {
          if (err) {
            res.send (err)
          }else {
            c1.find().toArray(function (err,result) {
              if (err) {
                res.send(err)
              }else{
                res.render('home/index',{data:docs,data1:result})
              }
            })
          }
        })
    }
  })
  /*res.render('home/index', { title: 'Express' });*/
});

module.exports = router;
