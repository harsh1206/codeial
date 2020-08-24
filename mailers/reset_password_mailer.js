const nodeMailer=require('../config/nodemailer');
const { renderFile } = require('ejs');
const { renderTemplate } = require('../config/nodemailer');

exports.resetPassword=(token)=>{

   let htmlString=renderTemplate({ResetPassword:token},'/reset_password/password.ejs');

   console.log('inside forgot password mailer');
       
     
    console.log(token);

   nodeMailer.transporter.sendMail({
        

    from:'prodeveloper1206@gmail.com',
    to:token.user.email,
    subject:"Reset Password",
    html:htmlString

   },(err,info)=>{
     
    if(err)
    {
        console.log('error in sending mail',err);
        return;
    }
    console.log('Message Sent',info);
    return;
    
  })  

}