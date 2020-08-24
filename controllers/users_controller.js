const User=require('../models/user');
const fs=require('fs');
const path=require('path');
const Noty=require('noty');



module.exports.profile = function(req, res){
    User.findById(req.params.id,function(err,user){
    return res.render('user_profile', {
        title: 'User Profile',
        profile_user:user
    })

   });
};


module.exports.update=async function(req,res){

    // if(req.user.id==req.params.id)
    // {
    //     User.findByIdAndUpdate(req.params.id,req.body,function(error,user){
          
    //         return res.redirect('back');

    //     });
    // }else{
    //     return res.status(401).send('Unauthroized'); 
    // }



    if(req.user.id==req.params.id)
    { 
          try{

            let user= await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                 
                if(err){
                    console.log('****Multer error !',err);
                }

                user.name=req.body.name;
                user.email=req.body.email;

                if(req.file){


                    if(user.avatar){

             
                            
                        if(fs.existsSync(path.join(__dirname,'..',user.avatar))){

                           fs.unlinkSync(path.join(__dirname,'..',user.avatar));

                        };
                        

                    }

                    // this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar=User.avatarPath+'/'+req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });    

          } catch(err){
              req.flash('error',err);
              return res.redirect('back');
          } 
                
    }else{
        req.flash('error','Unauthorized!');
        return res.status(401).send('Unauthroized');
    }

}

module.exports.signUp=function(req,res){

    if(req.isAuthenticated())
    {
        return res.redirect('/users/sign-up');
    }  

    return res.render('user_sign_up',{
        title:'Sign Up'
    })
};
module.exports.signIn=function(req,res){

    // if (req.isAuthenticated()) {
    //     return res.redirect('/');
    // }

    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }  


    return res.render('user_sign_in',{
        title:'Sign In'
    })

}

module.exports.create=function(req,res){


   if(req.body.password!= req.body.confirm_password)
   {
       return res.redirect('back');
   }

   User.findOne({email:req.body.email},function(err,user){

      if(err)
      {
        req.flash('error', err); return
      }
      
      if(!user)
      {
          User.create(req.body,function(err,user){
           
             if(err){
                req.flash('error', err); return
             }
             req.flash('success', 'You have signed up, login to continue!');
             return res.redirect('/users/sign-in');

          })
      }

      else{
          return res.redirect('back');
      }

   })

}

// sign in and create a session for user 
module.exports.createSession=function(req,res){

    
    req.flash('success','Logged in Successfully');

    return res.redirect('/');

}

module.exports.desstroySession=function(req,res){

    
    req.flash('success','You have logged out !');  
    console.log(req.flash);
    req.logout();


    return res.redirect('/');
}