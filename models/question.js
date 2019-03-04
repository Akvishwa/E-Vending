var mongoose = require("mongoose");
// user model
var questionSchema = new mongoose.Schema({
   author: String,
   ques : String,
   date : String,
   answer: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Answer"
      }
   ]
});

var Question = mongoose.model("Question", questionSchema);
module.exports = Question;
