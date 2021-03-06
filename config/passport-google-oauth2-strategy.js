const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');

// tell passport to use new strategy for google login
passport.use(new googleStrategy({

    clientID:"381948339177-nj257jcq320kapns091mgecc3pa77btl.apps.googleusercontent.com",
    clientSecret:"N0ZJ7eTV3csd4XmMRpjSP8cF",
    callbackURL:"http://localhost:8000/users/auth/google/callback"

    },
     
    function(accessToken,refreshToken,profile,done){
        // find a user
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){

           if(err){
               console.log('error in google startegy passport',err);
               return;
           }
          
           console.log(profile); 
             
           if(user){
               return done(null,user);
           }else{
            //    if not found,create the user and set it as req.user
               User.create({
                   name:profile.displayName,
                   email:profile.emails[0].value,
                   password:crypto.randomBytes(20).toString('hex')
               },function(err,user){
                   
                   if(err){
                      console.log('error in creating user');
                      return;
                   }
                   return done(null,user);
               })
           }

            
        });
    }
     

));


module.exports=passport;