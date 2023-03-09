const connection = require("./database/database");
const express = require("express");
const cors = require("cors");

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

//Auth Router
app.use("/api/auth/", authRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Sunucu çalışıyor..."));