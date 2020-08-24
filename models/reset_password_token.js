const mongoose=require('mongoose');

const ResetPasswordSchema = new mongoose.Schema({

    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    isValid :{
         type:Boolean,
         default:true
    },
    accesstoken:{
        type:String
    }

},{
    timestamps:true
});

const ResetPassword=mongoose.model('ResetPassword',ResetPasswordSchema);
module.exports=ResetPassword;

// but i am not using the reset password till now
// i was just trying to print t/req./body
//there is nothing in body..thats y it is not showing anything
// so when form is subiited isnt body filled
//i think so thats y it is showing nothing..try to print user