const Posts=require('../models/posts');
const Post = require('../models/posts');
const User=require('../models/user');


module.exports.home =async function(req, res){
    

    try{

    // POpulate the user of each post 

      let posts=await Post.find({})
      .populate('user')
      .populate({
        path:'comments',
        populate:{
          path:'user'
        }
      });
    
    
    let users=await User.find({});

    
      return res.render('home',{
         
          all_users:users,
          title:"Home",
          posts:posts

      }); 
      
      }catch(err){
        console.log('Error',err);
        return;
      }
     
     }



