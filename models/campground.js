var mongoose = require("mongoose"); 
var campgroundSchema = new mongoose.Schema({
	name: String, 
	image: String, 
	description: String,
	comments: [{
		type: mongoose.Schema.Types.ObjectId, ref: "Comment"}]
});
// compile into model and export
module.exports = new mongoose.model("Campground", campgroundSchema); 
