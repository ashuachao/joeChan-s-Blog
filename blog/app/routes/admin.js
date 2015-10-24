var express = require('express');
var router = express.Router();
var Article = require('../models/article');
// var Catagory = require('../models/catagory');
var Comment = require('../models/comment');
var Catagory = require('../models/catagory');




router.use(function(req,res,next) {
	var user = req.session.user;
	if (!user) {
		res.redirect('/user/login');
		next()
	}
	next();
})

router.get('/admin',function(req,res,next) {

	// 可以预处理一下 用中间件的方法
	var user = req.session.user;
	// if (user) {
		// app.locals.user = user;
	res.render('admin/admin',{user:user})
	// } else {
	// 	res.redirect('/user/login');
	// }
})

router.get('/admin/catalogManage',function(req,res,next) {
	Catagory.find({},function(err,catagories) {
		res.render('admin/catagoryMan',{
			catagories:catagories,
			catagory:{}
		});
	})
})

router.get('/admin/articleManage',function(req,res,next) {
	var ajax = req.query.ajax;
	if (ajax) {
		Article.find({}).
		populate('catagory').
		exec(function(err,articles) {
			res.render('admin/articleMan',{
				articles:articles,
				article:{}
			})
		}) 
	} else {
		res.redirect('/admin');
	}
	
})

router.get('/admin/commentManage',function(req,res,next) {
	Comment.find({},function(err,comments) {
		if (err) {
			console.log(err);
		}
		res.render('admin/commentMan',{
			comments:comments
		});
	})
})
router.get('/admin/aboutMeManage',function(req,res,next) {
	var ajax = req.query.ajax;
	if (ajax) {
		res.render('admin/aboutMeMan');
	} else {
		res.redirect('admin/admin');
	} 
})
module.exports = router;