const mongoose=require('mongoose');

// import multer
const multer=require('multer');
const path=require('path');
const AVATAR_PATH=path.join('/uploads/users/avatars');

const userSchema=new mongoose.Schema({
       
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
           
          type:String,
          required:true
    },
    name:{

        type:String,
        required:true
    },
    avatar:{
          type:String
    },
    freindship: [

         {
             type:mongoose.Schema.Types.ObjectId,
             ref:'Freindship'
         }

    ]


}, {

    timestamps:true

});

userSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.password;
    return obj;
   }

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
});

// static functions
userSchema.statics.uploadedAvatar=multer({storage: storage}).single('avatar');
userSchema.statics.avatarPath=AVATAR_PATH;


const User=mongoose.model('User',userSchema);

module.exports=User;

