var Index = require('../app/routes/index');
var User = require('../app/routes/user');
var Admin = require('../app/routes/admin');
var Comment = require('../app/routes/comment');
var Article = require('../app/routes/article');
var Catagory = require('../app/routes/catagory');
var Search = require('../app/routes/search')

module.exports = function(app) {
	app.use('/', Index,User,Admin,Comment,Article,Catagory,Search);
	// app.use('/collect',Index);
	// app.use('/comment',Index);
	
	// app.use('/admin',Admin);
	// app.use('/admin/articleManage',Admin);
	// app.use('/admin/collectManage',Admin);
	// app.use('/admin/aboutMeManage',Admin);
	// app.use('/admin/catatoryManage',Admin);
	

	// app.use('/user/login',User);
	// app.use('/user/signin',User);
	
	// app.use('/user/logout',User);

	// app.use('/comment/save',Comment);
}