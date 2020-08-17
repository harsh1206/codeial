const Post=require('../models/posts');
const Comment=require('../models/comment');
const { populate } = require('../models/posts');

module.exports.create=async function(req,res){
    
    try{

     let post=await Post.create({
         content:req.body.content,
         user:req.user._id
     });
      
     
    //   let CreatedPost=Post.findOne({user:req.user._id}).populate('user');
    //   console.log(CreatedPost);

     let CreatedPost=await post.populate('user','name').execPopulate();
     console.log(CreatedPost.user);

     if(req.xhr){
           
        return res.status(200).json({
            data:{
                    
                 post:CreatedPost
            },
            message:"Post Created"
        });

     }
     
    //  req.flash('success','Post published');
     return res.redirect('back');
    }
    catch(err){
        req.flash('error',err);
        console.log('Error',err);
         return res.redirect('back');
    }

}

module.exports.destroy =async function(req,res){
    
     try{
         
        let post= await Post.findById(req.params.id);
                         

         
       //  .id means converting the objject id into the string
       if(post.user._id==req.user.id)
       {
             
          console.log(post);

          post.remove();

          await Comment.deleteMany({post:req.params.id});
          
          if(req.xhr){
              return res.status(200).json({
                  data:{
                      post_id:req.params.id,
                     
                  },
                  message:"Post deleted"
              })
          }
          
         
        //   req.flash('success','Post deleted');
          
          return res.redirect('back')
       
       }
       else{
      
        req.flash('error','YOu cannot delete this post');
           return res.redirect('back');
       }
       
    }catch(err){
        req.flash('error',err);
        console.log('Error',err);
        return res.redirect('back');
    }
            
     
   

}

