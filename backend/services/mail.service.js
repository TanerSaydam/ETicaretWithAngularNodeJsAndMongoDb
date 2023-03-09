const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    html: true,
    auth:{
        user: "eticaretangular@hotmail.com",
        pass:"eticaret.angular",
    },
    tls:{
        ciphers: "SSLv3",
        rejectUnauthorized: false
    }
});

const sendMail = (mailOptions) => {    
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log("Mail başarıyla gönderildi");
        }
    });
}

module.exports = sendMail;