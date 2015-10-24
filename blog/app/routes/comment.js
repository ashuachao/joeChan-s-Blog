var express = require('express');
var router = express.Router();
var Comment = require('../models/comment')

router.post('/comment/save',function (req,res,next) {
	var cid = req.body.cid;
	if (cid) {
		Comment.findById(cid,function(err,comment) {
			var reply = {
				from:req.body.from,
				to:req.body.to,
				content:req.body.content
			}
			comment.reply.push(reply);
			comment.save(function(err,comment) {
				if (err) {
					console.log(err);
				} 
				res.json({success:true});
			})
		})
	} else {
		var comment = new Comment(req.body);
		comment.save(function(err,comment) {
			if (err) {
				console.log(err);
				res.json({success:false})
			} else {
				res.json({success:true})
			}
		})
	}	
})

module.exports = router;