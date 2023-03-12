const connection = require("./database/database");
const express = require("express");
const cors = require("cors");
const {v4: uuidv4} = require("uuid");
const createAdminUser = require("./options/configurations");
const User = require("./models/user");

//Routerlar
const authRouter = require("./routers/auth.router");
const categoryRouter = require("./routers/category.router");

//Api istekleri için
const app = express();

//İsteklerde JSON formatı geçerli olsun
app.use(express.json());

//CORS politikası
app.use(cors());

//Db Connection
connection();

//Admin Kullanıcısı Yoksa Eğer Ekle
createAdminUser();

//Auth Router
app.use("/api/auth/", authRouter);

//Category Router
app.use("/api/categories/", categoryRouter);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Sunucu çalışıyor..."));