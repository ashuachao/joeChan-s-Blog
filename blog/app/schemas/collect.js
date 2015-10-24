var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CollectSchema = new Schema({
	
})

CollectSchema.statics = {
	fetch:function(cb) {
		return this.find({}).exec(cb)
	},
	findById:function(id,cb) {
		return this.findOne({_id:id}).exec(cb)
	}
};

module.exports = CollectSchema;