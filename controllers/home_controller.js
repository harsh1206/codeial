const Posts=require('../models/posts');
const Post = require('../models/posts');
const User=require('../models/user');
const Friendship = require('../models/freindship');




module.exports.home =async function(req, res){
    

    try{

    // Populate the user of each post 

      let posts=await Post.find({})
      .sort('-createdAt')
      .populate('user')
      .populate({
        path:'comments',
        populate:{
          path:'user'
        },
        populate:{
          path:'likes'
        }
      }).populate('likes');
    
      // console.log(req.user);   
        
      const users=await User.find({});

      if(req.user){

      
     let freindships = await Friendship.find({from_user:req.user._id}).populate('to_user');     

    
      return res.render('home',{
         
          all_users:users,
          title:"Home",
          posts:posts,
          freindships:freindships
      }); 

     }else{
        
      return res.render('home',{
         
        all_users:users,
        title:"Home",
        posts:posts,
        }); 
       
     }
      
      }catch(err){
        console.log('Error',err);
        return;
      }
     
     }



