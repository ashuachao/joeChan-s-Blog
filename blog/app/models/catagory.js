var mongoose = require('mongoose');
var CatagorySchema = require('../schemas/catagory');
var Catagory = mongoose.model('Catagory',CatagorySchema);

module.exports = Catagory;