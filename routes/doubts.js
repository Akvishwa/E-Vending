var express = require("express");
var User = require("../models/user");
var Question = require("../models/question");
var Answer = require("../models/answer");
var router = express.Router();

router.get("/education/questions", function(req, res){
   Question.find({}, function(err, foundques){
      if(err){
         console.log(err);
         res.redirect("/education");
      }else{
         res.render("questions/index", {ques: foundques});
      }
   });
});
//New Ques
router.post("/education/questions/new", function(req, res){
   var date = new Date();
   var newQues = {
      author: req.body.author,
      ques: req.body.ques,
      date: date
   }
   Question.create(newQues, function(err, ques){
      if(err){
         console.log(err);
      }else{
         console.log("New Question Addded!");
         console.log(ques);
         res.redirect("/education/questions");
      }
   });
});
//sHow ques route
router.get("/education/questions/:id", function(req, res){
   
   Question.findById(req.params.id).populate("answer").exec(function(err, foundques){
      if(err){
         console.log(err);
      }else{
         // console.log(foundques.answer);
         res.render("questions/show", {question: foundques});
      }
   });
});
//new answer
router.get("/education/questions/:id/answers/new", function(req, res){
   Question.findById(req.params.id, function(err, foundques){
      if(err){
         console.log(err);
      }else{
         res.render("answers/new", {question: foundques});
      }
   })
});
router.post("/education/questions/:id/answers/new", function(req, res){
   Question.findById(req.params.id, function(err, question){
      if(err){
         console.log(err);
         res.redirect("/education/questions/"+req.params.id);
      }else{
         Answer.create(req.body.ans, function(err, answer){
            if(err){
               console.log(err);
               res.redirect("/education/questions/"+req.params.id);
            }else{
               answer.save();
               question.answer.push(answer);
               question.save();
               console.log(question);
               res.redirect("/education/questions/"+req.params.id);
            }
         })
      }
   })
});
module.exports = router;
