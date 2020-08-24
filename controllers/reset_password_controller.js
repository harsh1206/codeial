const User=require('../models/user');
const { timingSafeEqual } = require('crypto');
const ResetPassword = require('../models/reset_password_token');
const crypto=require('crypto');
const ResetPasswordMailer=require('../mailers/reset_password_mailer');

module.exports.find=function(req,res){

    return res.render('email_confirm',{
         
       title:"Reset-Password"

    });

}

module.exports.confirmUser=function(req,res){
    

   const user= User.findOne({email:req.body.email},function(err,user){
     
      
    if(err)
    {
        console.log('error in finding the user');
        return;
    }

    if(user){
        console.log('user found');

         ResetPassword.create({
            
            user:user,
            accesstoken:crypto.randomBytes(20).toString('hex')

         })

        ResetPassword.findOne({user:user._id}).
        populate('user').
        exec(function(err,token){
          
           if(err){
               console.log('error in setting token');
                return;
           }
           
           console.log(token);

           ResetPasswordMailer.resetPassword(token);

           req.flash('success','Reset Password link sent on email');

           return res.redirect('back');
        //    yaha aa rha hai


        });

    }else{

        console.log('USER NOT FOUND');
           
         req.flash('error','Incorrect Email-Id !'); 
        return res.redirect('back');
    }

      });

    // console.log(user);


} 

module.exports.redirectUser=function(req,res){
    
    // console.log(req.params);

    ResetPassword.findOne({accesstoken:req.params.accesstoken}).
    populate('user').
    exec(function(err,token){
      
       
        if(err){
            console.log('error in finding token'); 
            return res.redirect('back');
        }

        if(token){
             
            // console.log(token.user);

            return res.render('reset_password',{
                title:'Reset Password',
                token:token
            });
        }
        
        else{
            console.log('coudnt find token');
            return res.redirect('back');

        }

    });

   
    
}

module.exports.reset=function(req,res){
     
    ResetPassword.findOne({accesstoken:req.params.accesstoken}).
    populate('user').
    exec(function(err,token){
      
       
        if(err){
            console.log('error in finding token'); 
            return res.redirect('back');
        }

        if(token){
             
             console.log(token.user);
            //  console.log(req.body) ;
            if(req.body.password != req.body.c_password)
            {
                console.log('password do not match');
                console.log(req.body) ;
                req.flash('error','Passwords do not match !');
                return res.redirect('back');
            }
            console.log(req.body) ;

             const newPassword=req.body.password;
             token.user.password=newPassword;

            User.findOneAndUpdate({_id:token.user._id},{password:req.body.password},function(err,user){
                
                if(err){
                    console.log('error in updating password');
                }
                else{
                    console.log('new password :',newPassword);
                }


            });

            // console.log('New Password',token.user.password);

            console.log(token.user);
             
             return res.redirect('/users/sign-in');
        }
        
        else{
            console.log('coudnt find token');
            return res.redirect('back');

        }

    });


}