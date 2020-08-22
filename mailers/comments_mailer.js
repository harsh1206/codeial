const nodeMailer=require('../config/nodemailer');


//  this is another way of exporting a method
exports.newComment=(comment)=>{
   
    let htmlString=nodeMailer.renderTemplate({comment:comment},'/comments/new_comments.ejs');

    console.log('inside newComment mailer');
    console.log(comment);   

    nodeMailer.transporter.sendMail({
        

        from:'prodeveloper1206@gmail.com',
        to:comment.user.email,
        subject:"New comment",
        html:htmlString

    },(err,info)=>{
         
        if(err)
        {
            console.log('error in sending mail',err);
            return;
        }
        // console.log('Message Sent',info);
        return;
        
    })

}