var mongoose = require("mongoose");
// user model
var answerSchema = new mongoose.Schema({
   author: String,
   ans : String
});

var Answer = mongoose.model("Answer", answerSchema);
module.exports = Answer;
