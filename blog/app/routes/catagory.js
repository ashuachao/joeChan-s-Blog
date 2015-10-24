var express = require('express');
var router = express.Router();
var Catagory = require('../models/catagory');
var Article = require('../models/article');

router.get('/admin/catagory/edit/:id',function(req,res,next) {
	console.log(req.params);
	var _id = req.params.id;
	if ( _id !== 'undefined') {
		Catagory.findById(_id,function(err,catagory) {
			if (err) {
				console.log(err);
			}
			res.render('admin/cataEdit',{
				catagory:catagory
			});
		}) 
	} else {
		res.render('admin/cataEdit',{
			catagory:{}
		})
	}
})
router.get('/admin/catagory/delete/:id',function(req,res,next) {
	var _id = req.params.id;
	Catagory.remove({_id:_id},function(err) {
		if (err) {
			console.log(err);
		}
		res.redirect('/admin');
	})
})
router.post('/admin/catagory/save',function(req,res,next) {
	var cata = req.body.catagory;
	if (cata.id) {
		Catagory.update({_id:cata.id},{$set:cata},function(err) {
			if (err) {
				console.log(err);
			}
		})
		res.redirect('/admin');
	} else {
		var catagory = new Catagory(cata);
		catagory.save(function(err,catagory) {
			if (err) {
				console.log(err);
			}
			res.redirect('/admin');
		})
	}
})

router.get('/admin/article/delete/:id',function(req,res,next) {
	var _id = req.params.id;
	Catagory.remove({_id:_id},function(err) {
		if (err) {
			console.log(err);
		}
		res.redirect('/admin');
	})
})
module.exports = router;