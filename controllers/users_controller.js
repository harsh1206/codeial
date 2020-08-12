const User=require('../models/user')

module.exports.profile = function(req, res){
    User.findById(req.params.id,function(err,user){
    return res.render('user_profile', {
        title: 'User Profile',
        profile_user:user
    })

   });
};


module.exports.update=function(req,res){

    if(req.user.id==req.params.id)
    {
        User.findByIdAndUpdate(req.params.id,req.body,function(error,user){
          
            return res.redirect('back');

        });
    }else{
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