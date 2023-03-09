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

// let mailOptions = {
//     from: "eticaretangular@hotmail.com",
//     to: "eticaretangular@hotmail.com",
//     subject: "Mail Onayı",
//     html: `
//     <div class="container text-center">
//     <h1>Tebrikler</h1>
//     <p>Kaydınızı tamamlamak için son bir adım kaldı. Aşağıdaki linke tıklayarak mail adresinizi onaylayabilir ve uygulamızı ücretsiz şekilde kullanabilirsiniz</p>
//     <hr>
//     <a href="http://localhost:4200/auth/confirmMail/${newUser.mailConfirmCode}" class="btn btn-primary">Mail Adresimi Onayla</a>
//     </div> `
// };

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