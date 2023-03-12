const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const {v4:uuidv4} = require("uuid");
const response = require("../services/response.service");
const User = require("../models/user");

//Kategori Listesi
router.get("/getAll", async (req, res)=>{
    response(res, async() => {
        const categories = await Category.find({}).sort({name: 1});
        res.json(categories);
    });
});

//Kategori Ekleme İşlemi
router.post("/add", async (req, res)=>{
    response(res, async()=>{
        const {name} = req.body;
        let category = new Category({
            _id: uuidv4(),
            name: name.toUpperCase(),
            createdDate: new Date()
        });
        await category.save();
        res.json({message: "Kategori kaydı başarıyla tamamlandı"});
    });
});

//Kategori Silme İşlemi
router.post("/removeById", async (req, res)=>{
    response(res,async ()=> {
        const {_id} = req.body;
        await Category.findByIdAndRemove(_id);
        res.json({message: "Kategori kaydı başarıyla silindi!"});
        //Düzeltilecek
    });   
});

//Kategori Güncelleme İşlemi
router.post("/update", async (req, res)=>{
    response(res, async()=>{
        const {_id, name} = req.body;
        const category = await Category.findById(_id);
        category.name = name;
        await Category.findByIdAndUpdate(_id, category);
        res.json({message: "Kategori başarıyla güncellendi"});
    });
});




module.exports = router;
