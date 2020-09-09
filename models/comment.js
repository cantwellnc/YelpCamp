var mongoose = require("mongoose"); 
var commentSchema = new mongoose.Schema({
	text: String, 
	author: String
});
// compile into model and export
module.exports = new mongoose.model("Comment", commentSchema); 
