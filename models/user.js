var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
// user model
var userSchema = new mongoose.Schema({
   name: String,
   email: String,
   branch: String,
   sem: String,
   college: String,
   city: String,
   username: String,
   password: String
});
userSchema.plugin(passportLocalMongoose);

var User = mongoose.model("User", userSchema);
module.exports = User;
