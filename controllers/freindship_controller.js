const Freindship=require('../models/freindship');
const User=require('../models/user');
const Friendship = require('../models/freindship');

module.exports.toggleFriend=async function(req,res){
    
    try{
        
     let added = false;

     let from=await User.findById(req.user._id);
     let to=await User.findById(req.query.id);

     let exsitingFreindship=await Freindship.findOne({

        from_user:from._id,
        to_user:to._id

     });
    
     if(exsitingFreindship){
       
        from.freindship.pull(exsitingFreindship._id);
        to.freindship.pull(exsitingFreindship._id);
        from.save();
        to.save();
        exsitingFreindship.remove();
        added=true; 

     }else{
        
        let newFreindship = await Friendship.create({
            from_user: from._id,
            to_user:to._id
        })

        from.freindship.push(newFreindship._id);
        to.freindship.push(newFreindship._id);
        from.save();
        to.save();
        
     }

     return res.json(200, {
        message: "Request successful!",
        data: {
            added: added
        }
    })

   
    }catch(err){
         
        console.log(err);


    } 

}