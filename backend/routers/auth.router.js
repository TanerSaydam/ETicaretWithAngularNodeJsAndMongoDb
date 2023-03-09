const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");

const upload = require("../services/file.service");
const token = require("../services/token.service");
let sendMail = require("../services/mail.service");
const MailOptions = require("../dtos/mail-options");

//Register İşlemi
router.post("/register", upload.single("image"), async (req, res) => {
    const newUser = new User(req.body);

    newUser.createdDate = Date.now();
    newUser._id = uuidv4();
    newUser.imageUrl = req.file.path;
    newUser.isMailConfirm = false;

    try {
        let mailConfirmCode = Math.floor(Math.random() * 1000000);
        let checkMailConfirmCode = await User.find({ isMailConfirmCode: mailConfirmCode });
        while (checkMailConfirmCode.length > 0) {
            mailConfirmCode = Math.floor(Math.random() * 1000000);
            checkMailConfirmCode = await User.find({ isMailConfirmCode: mailConfirmCode });
        }

        newUser.mailConfirmCode = mailConfirmCode;

        const result = await newUser.save();

        sendConfirmMail(newUser);

        res.json({ message: "Kullanıcınız başarıyla oluşturuldu. Mail onayından sonra giriş yapabilirsiniz!" });
    } catch (error) {
        if (error.code == "11000") {
            res.status(400).json({ message: "Kullanıcı mail/kullanıcı adı geçersiz!" })
        }
        else {
            res.status(400).json({ message: error.message });
        }
    }
});

sendConfirmMail = (user) => {
    let mailOptions = new MailOptions(
        user.email,
        "Mail Onayı",
        `
        <div class="container text-center">
        <h1>Tebrikler</h1>
        <p>Kaydınızı tamamlamak için son bir adım kaldı. Aşağıdaki linke tıklayarak mail adresinizi onaylayabilir ve uygulamızı ücretsiz şekilde kullanabilirsiniz</p>
        <hr>
        <a href="http://localhost:4200/auth/confirmMail/${user.mailConfirmCode}" class="btn btn-primary">Mail Adresimi Onayla</a>
        </div> `
    )

    sendMail(mailOptions);
}

//Mail Onayla
router.post("/confirm-mail", async (req, res) => {
    const { code } = req.body;

    try {
        const user = await User.findOne({ mailConfirmCode: code });
        if (user == null) {
            res.status(400).json({ "message": "Kullanıcı bulunamadı!" });
        } else {
            if (user.isMailConfirm) {
                res.status(400).json({ "message": "Kullanıcı maili zaten onaylı!" });
            } else {
                user.isMailConfirm = true;
                const result = await User.findOneAndUpdate(user);
                res.json({ result: result });
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }


});

//Giriş İşlemi
router.post("/login", async (req, res) => {
    try {
        const { emailOrUserName, password } = req.body;

        var user = await User.find({ email: emailOrUserName });
        if (user.length == 0) {
            user = await User.find({ userName: emailOrUserName });
            if (user.length == 0) {
                res.status(500).json({ message: "Kullanıcı bulunamadı!" });
            } else {
                if (user[0].password == password) {
                    if (user[0].isMailConfirm) {
                        const payload = {
                            user: user[0]
                        }
                        res.json({ token: token(payload), user: user[0] });
                    } else {
                        res.status(500).json({ message: "Mail adresiniz onaylı değil! Onaylamadan giriş yapamazsınız!" });
                    }
                } else {
                    res.status(500).json({ message: "Şifre yanlış!" });
                }
            }
        } else {
            if (user[0].password == password) {
                if (user[0].isMailConfirm) {
                    const payload = {
                        user: user[0]
                    }
                    res.json({ token: token(payload), user: user[0] });
                } else {
                    res.status(500).json({ message: "Mail adresiniz onaylı değil! Onaylamadan giriş yapamazsınız!" });
                }
            } else {
                res.status(500).json({ message: "Şifre yanlış!" });
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Onaylama Maili Gönder
router.post("/sendConfirmMail", async (req, res)=>{
    try {
        const {email} = req.body;

        let user = await User.find({email:email});        
        if(user.length == 0){
            res.status(500).json({ message: "Kullanıcı bulunamadı!" });
        }else{
            if(user[0].isMailConfirm){
                res.status(500).json({ message: "Mail adresi zaten onaylı!" });
            }else{                
                sendConfirmMail(user[0]);
                res.json({message: "Onay mailiniz başarıyla gönderildi!"});
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;