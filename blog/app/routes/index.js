var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Comment = require('../models/comment');
var Article = require('../models/article');
var Catagory = require('../models/catagory');

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.redirect('/index');
});


router.get('/index', function(req, res, next) {
	Article.find({}).
		populate('catagory').
		exec(function(err,articles) {
			res.render('index/index',{
				articles:articles,
				article:{}
			})
		}) 
});


router.get('/aboutMe',function(req,res,next) {
	res.render('index/aboutMe')
});

router.get('/collect',function(req,res,next) {
	res.render('index/collect',{
		collect:{
			angular:['Anular中文','angular英文']
		}});
});

router.get('/comment',function(req,res,next) {
	Comment.find({},function(err,comments) {
		if (err) {
			console.log(err);
		} else {
			res.render('index/comment',{
				comments:comments
			})
		}
	})
});



router.get('/collect',function(req,res,next) {

});

router.get('/myDemo',function(req,res,next) {

});




module.exports = router;
