const Posts=require('../models/posts');
const Post = require('../models/posts');
const User=require('../models/user');


module.exports.home = function(req, res){
    
    //   Posts.find({},function(err,posts){
            
    //     if(err){
    //        console.log('error in fetchhing posts')
    //        return;
    //     }
        
    //     return res.render('home',{
             
    //         title:"Home",
    //         posts:posts

    //     });
               
    //   });

    // POpulate the user of each post 

      Post.find({})
      .populate('user')
      .populate({
        path:'comments',
        populate:{
          path:'user'
        }
      })
      .exec(function(err,posts){
          
        User.find({},function(err,users){
        return res.render('home',{
           
            all_users:users,
            title:"Home",
            posts:posts

        });  
        
       });
         

      })
    
}



