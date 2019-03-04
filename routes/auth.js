var express = require("express");
var User = require("../models/user");
var passport = require("passport");
var nodemailer = require("nodemailer");
var router = express.Router();
//Auth Routes------------------
var otp = Math.floor(Math.random()*10000);

router.get("/register", function(req, res){
   res.render("users/signup");
});
router.post("/register", function(req, res){
   User.register(new User({username: req.body.username, name: req.body.name}), req.body.password, function(err, user){
      if(err){
         console.log(err);
         res.redirect("/register");
      }else{
         passport.authenticate("local")(req, res, function(){
            res.redirect("/register/"+ req.user._id +"/info");
            // res.redirect("/education")
         });
      };
   });
});
router.get("/register/:id/info", function(req, res){
   User.findById(req.params.id , function(err, foundUser){
      if(err){
         console.log(err);
         res.redirect("/register");
      }else{
         console.log(foundUser.id);
         res.render("users/info" , {user : foundUser});      
      }
   })
});
router.put("/register/:id/info", function(req, res){
   User.findByIdAndUpdate(req.params.id, req.body.user , function(err, user){
      if(err){
         console.log(err);
         res.redirect("/register");
      }else{
         res.redirect("/register/"+req.params.id+"/verification");
      }
   });
});
router.get("/register/:id/verification", function(req, res){
   User.findById(req.params.id, function(err, foundUser){
      if(err){
         console.log(err);
      }else{
         res.render("users/verification", {user: foundUser});
      }
   })
});
router.post("/register/:id/verification", function(req, res){
   //nodemailer
   User.findById(req.params.id , function(err, foundUser){
      if(err){
         console.log(err);
      }else{
         
         let transporter = nodemailer.createTransport({
            service: "gmail",
            secure: false,
            port: 25,
            auth: {
               user: "kriti.ritu.dew@gmail.com",
               pass: "9098101995"
            },
            authMethod : "PLAIN",
            tls : {
               rejectUnauthorized: false
            }
         });
         var message = {
            from: "kriti dewangan, <kriti.ritu.dew@gmail.com>",
            to: foundUser.email,
            subject: "Verification Code",
            text: "Your Verification OTP is "+ otp +"...Only valid for 2 min",
         };
         transporter.sendMail(message, function(err, info){
            if(err){
               console.log(err);
            }else{
               console.log("Email Sent!!");
               console.log(info);
               res.redirect("/register/"+req.params.id+"/verification/otp");
            }
         });
      };
   });
});
router.get("/register/:id/verification/otp", function(req, res){
   User.findById(req.params.id, function(err, foundUser){
      if(err){
         console.log(err);
      }else{
         res.render("users/verification2", {user: foundUser});
      }
   })
});
router.post("/register/:id/verification/otp", function(req, res) {
   if(req.body.otp == otp){
      res.redirect("/education");
   }
   else{
      res.redirect("/register/"+req.params.id+"/verification")
   }
})


router.get("/login", function(req, res){
   res.render("users/login");
});

router.post("/login",passport.authenticate("local", {
   successRedirect: "/education",
   failureRedirect: "/login"
}), function(req, res){
   
});
router.get("/logout", function(req, res){
   req.logout();
   res.redirect("/education");
});
module.exports = router;
