var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var ObjectId = Schema.Types.ObjectId;

var CommentSchema = new Schema({
	from:String,
	reply:[{
		from:String,
		to:String,
		content:String
	}],
	content:String,
	count:{
		type:Number,
		default:0
	},
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}
})

CommentSchema.pre('save',function(next) {
	this.count++;
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else {
		this.meta.updateAt = Date.now();
	}
	next();
});

CommentSchema.statics = {
	fetch:function(cb) {
		return this.find({}).sort('meta.updateAt').exec(cb)
	},
	findById:function(id,cb) {
		return this.findOne({_id:id}).exec(cb)
	}
};

module.exports = CommentSchema;