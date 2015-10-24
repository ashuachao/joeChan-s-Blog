var express = require('express');
var router = express.Router();
var User = require('../models/user');
// var IfUser = function(req,res,next) {
// 	// 用户权限的检查
// 	next();
// }
// /* GET users listing. */
// router.use(IfUser);


router.get('/user/login',function(req,res,next) {
	res.render('index/login')
})

router.post('/user/signin',function(req,res) {
	var _user = req.body;
	var name = _user.name;
	var password = _user.password;
	User.findOne({name:name},function(err,user) {
		if (err) {
			console.log(err);
		}
		if (!user) {
			return res.json({pass:false});
		}
		user.comparePassword(password,function(err,isMatch) {
			if (err) {
				console.log(err);
				res.json({pass:false})
			}
			if (isMatch) {
				console.log('match');
				req.session.user = user;
				res.json({pass:true});
			} else {
				res.json({pass:false});
			}
		})
	})
})
router.get('/user/logout',function(req,res,next) {
	delete req.session.user;
	res.redirect('/index');
})
module.exports = router;


