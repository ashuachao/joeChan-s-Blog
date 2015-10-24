var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');
var Article = require('../models/article');
var fs = require('fs');
var path = require('path');
var multer = require('multer');
var upload = multer({dest:'uploads/'});
var Catagory = require('../models/catagory');

router.get('/admin/article/edit/:id',function(req,res,next) {
	var _id = req.params.id;
	if ( _id !== 'undefined') {
		Article.findById(_id,function(err,article) {
			Catagory.find({},function(err,catagories) {
				if (err) {
					console.log(err);
				}
				res.render('admin/articleEdit',{
					article:article,
					catagories:catagories
				});
			})	
		}) 
	} else {
		Catagory.find({},function(err,catagories) {
			res.render('admin/articleEdit',{
				article:{},
				catagories:catagories
			})
		})	
	}
})

router.get('/admin/article/delete/:id',function(req,res,next) {
	var _id = req.params.id;
	Article.remove({_id:_id},function(err) {
		if (err) {
			console.log(err);
		}
		res.redirect('/admin');
	})
})

var readFile = function(req,res,next) {
	var poster = req.file;
	if (poster) {
		var originalName = poster.originalname;
		var postpath = poster.path;
		fs.readFile(postpath,function(err,data) {
			var timeStamp = Date.now();
			var type = poster.mimetype.split('/')[1];
			var newPoster = timeStamp + '.' + type;
			var newPath = path.join(__dirname,'../../public/uploads/' + newPoster);
			fs.writeFile(newPath,data,function(err) {
				if (err) {
					console.log(err);
				}
				req.reqposter = newPoster
				next();
			}) 
		})
	} else {
		next();
	}
}

router.post('/admin/article/save',upload.single('uploadPoster'),readFile,function(req,res,next) {
	var art = req.body.article;
	if (req.reqposter) {
		art.poster = req.reqposter;
	}
	if (art.id) {
		// if (art.catagoryName) {
		// 	art.catagory = art.catagoryName;
		// }
		Article.update({_id:art.id},{$set:art},function(err) {
			if (err) {
				console.log(err);
			}
		})
		res.redirect('/admin');
	} else {
		var catagoryId = art.catagory;
		var article = new Article(art);
		article.save(function(err,article) {
			if (err) {
				console.log(err);
			}
			Catagory.findById(catagoryId,function(err,catagory) {
				catagory.articles.push(article._id);
				catagory.save(function(err) {
					if (err) {
						console.log(err);
					}
					res.redirect('/admin');
				})
			})
		})
	}
})

router.get('/article/like/:id',function(req,res,next) {
	var _id = req.params.id;
	Article.findById(_id,function(err,article) {
		article.like += 1;
		article.save(function(err){
			if (err) {
				console.log(err);
				res.json({success:false});
			} else {
				res.json({success:true});
			}
		});
	})
})

router.get('/article/:id',function(req,res,next) {
	var _id = req.params.id;	
	Article.findById(_id,function(err,article) {
		if (err) {
			console.log(err);
		}
		res.render('index/articleDetail',{
			article:article
		})
	})
})
module.exports = router;