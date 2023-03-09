const express = require("express");
const router = express.Router();
const {v4:uuidv4} = require("uuid");
const User = require("../models/user");

const upload = require("../services/file.service");
const token = require("../services/token.service");
let sendMail = require("../services/mail.service");

//Register İşlemi
router.post("/register", upload.single("image"),async (req, res)=>{
    const newUser = new User(req.body);   

    newUser.createdDate = Date.now();
    newUser._id = uuidv4();
    newUser.imageUrl = req.file.path;    
    newUser.isMailConfirm = false;

    try {
        let mailConfirmCode = Math.floor(Math.random() * 1000000);
        let checkMailConfirmCode = await User.find({isMailConfirmCode: mailConfirmCode});
        while(checkMailConfirmCode.length > 0){
            mailConfirmCode = Math.floor(Math.random() * 1000000);
            checkMailConfirmCode = await User.find({isMailConfirmCode: mailConfirmCode});           
        }
        
        newUser.mailConfirmCode = mailConfirmCode;

        const result = await newUser.save();       

        let mailOptions = {
            from: "eticaretangular@hotmail.com",
            to: newUser.email,
            subject: "Mail Onayı",
            html: `
            <div class="container text-center">
            <h1>Tebrikler</h1>
            <p>Kaydınızı tamamlamak için son bir adım kaldı. Aşağıdaki linke tıklayarak mail adresinizi onaylayabilir ve uygulamızı ücretsiz şekilde kullanabilirsiniz</p>
            <hr>
            <a href="http://localhost:4200/auth/confirmMail/${newUser.mailConfirmCode}" class="btn btn-primary">Mail Adresimi Onayla</a>
            </div> `
        };

        sendMail(mailOptions);
   
        res.json({message: "Kullanıcınız başarıyla oluşturuldu. Mail onayından sonra giriş yapabilirsiniz!"});
    } catch (error) {
        if(error.code == "11000") 
            res.status(400).json({message: "Kullanıcı mail/kullanıcı adı geçersiz!"})
        else 
            res.status(400).json({message: error.message});
    }
});

module.exports = router;