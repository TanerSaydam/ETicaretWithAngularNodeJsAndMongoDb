const connection = require("./database/database");
const express = require("express");
const cors = require("cors");
const {v4: uuidv4} = require("uuid");

const User = require("./models/user");

//Routerlar
const authRouter = require("./routers/auth.router");

//Api istekleri için
const app = express();

//İsteklerde JSON formatı geçerli olsun
app.use(express.json());

//CORS politikası
app.use(cors());

//Db Connection
connection();

//Admin Kullanıcısı Yoksa Eğer Ekle
const createAdminUser = async () =>{
    let userCount = await User.find({}).count();
    if(userCount == 0){
        let newUser = new User({
            _id: uuidv4(),
            name: "Taner Saydam",
            userName: "tsaydam",
            email: "tanersaydam@gmail.com",
            isMailConfirm: true,
            mailConfirmCode: "000000",
            password: "1",
            createdDate: Date.now(),
            isAdmin: true
        });

        await newUser.save();
    }
}

createAdminUser();

//Auth Router
app.use("/api/auth/", authRouter);



const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Sunucu çalışıyor..."));