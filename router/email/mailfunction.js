const nodemailer = require('nodemailer')


let sendMail = async (fromMail,toMail, content, subject) => {
    if(!fromMail || !content || !subject ||!toMail){
       return new Error('fromMail or content or subject is missing')
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",   
      auth: {
        user:"guptanamandream21sd@gmail.com",
        pass:"asaj kaub vljd gmas"
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const text = `${content}`;
  
    const mailOptions = {
      from: fromMail,
      to: toMail,
      subject: subject,
      text: text,
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
         return new Error("Error sending email" );
      } 
      else {
        console.log(`Email sent: ${info.response}`);
        return true;
      }
    });
  
  };

  module.exports = sendMail