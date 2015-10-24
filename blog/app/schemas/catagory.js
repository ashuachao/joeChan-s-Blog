var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var CatagorySchema = new Schema({
	name:String,
	articles:[{
		type:ObjectId,
		ref:'Article'
	}], 
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

CatagorySchema.pre('save',function(next) {
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else {
		this.meta.updateAt = Date.now();
	}
	next();
});

CatagorySchema.statics = {
	fetch:function(cb) {
		return this.find({}).sort('meta.updateAt').exec(cb)
	},
	findById:function(id,cb) {
		return this.findOne({_id:id}).exec(cb)
	}
};

module.exports = CatagorySchema;