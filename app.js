var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var app = express();
// var nodemailer = require("nodemailer");
var passport = require("passport"),
    localStrategy = require("passport-local");
// var passportLocalMongoose = require("passport-local-mongoose");
//requiring routes
var authRoutes = require("./routes/auth");
var doubtsRoute = require("./routes/doubts");
//requiring models
var User = require("./models/user");
var Question = require("./models/question");
var Answer = require("./models/answer");

mongoose.connect("mongodb://localhost/regi_sys",{ useNewUrlParser: true});


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
//express session
app.use(require("express-session")({
    secret: "dogs are love",
    resave: false,
    saveUninitialized: false
}));
app.use(express.static(__dirname + "/public"));
//passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// var ques = {
//    author: "kriti ",
//    ques: "Pagination, best way to handle first and last page and disable Next and Previous buttons, and set class to current element?"
// };
// Question.create(ques , function(err, newques){
//    if(err){
//       console.log(err);
//    }else{
//       console.log("new ques added!");
//       console.log(newques);
//    }
// });

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.currentdate =  new Date();
   next();
});

app.use(authRoutes);
app.get("/", function(req, res){
   res.render("landing"); 
});
app.get("/education", function(req, res){
   console.log(req.user);
   res.render("index"); 
});
app.use(doubtsRoute);






app.listen( process.env.PORT, process.env.ID, function(){
   console.log("Server connected!!"); 
});