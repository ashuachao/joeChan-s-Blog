var express = require('express');
var router = express.Router();
var Article = require('../models/article');
// var Catagory = require('../models/catagory');
var Comment = require('../models/comment');
var Catagory = require('../models/catagory');

router.get('/result',function(req,res,next) {
	var cataId = req.query.cata;
	var page = parseInt(req.query.p,10) || 1;
	var count = 3;
	// index是每页展示数据量
	var index = (page-1)  * count;
	var search = req.query.search;
	if (cataId) {
		Catagory.find({_id:cataId}).
		populate({
			path:'articles'
		}).
		exec(function(err,catagories) {
			if (err) {
				console.log(err);
			}
			var catagory = catagories[0] || {};
			var articles = catagory.articles || [];
			var results = articles.slice(index,index+count);
			res.render('index/result',{
				title:'result',
				keyword:catagory.name,
				currentPage:page,
				totalPage:Math.ceil(articles.length / 3),
				articles:results,
				query:'cata=' + cataId
			})
		})
	} else {
		Article.find({title:new RegExp(search + '.*','i')}).exec(function(err,articles) {
			if (err) {
				console.log(err);
			}
			var results = articles.slice(index,index+count);
			res.render('index/result',{
				title:'result',
				keyword:search,
				currentPage:page,
				totalPage:Math.ceil(articles.length / 3),
				articles:results,
				query:'search=' + search
			})
		})
	}
	
})

module.exports = router;