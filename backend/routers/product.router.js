const express = require("express");
const router =express.Router();
const Product = require("../models/product");
const upload = require("../services/file.service");
const response = require("../services/response.service");
const {v4:uuidv4} = require("uuid");
const fs = require("fs");

//Ürün Ekleme
router.post("/add", upload.array("images"),async(req,res)=>{
    response(res, async()=>{
        const {name, description, stock, price, categories} = req.body;
        console.log(categories);
        
        const productId = uuidv4()
        let product = new Product({
            _id: productId,
            name: name.toUpperCase(),
            description: description,
            stock: stock,
            price: price,
            imageUrls: req.files,
            categories: categories,
            isActive: true,
            createdDate: new Date(),
        });
        await product.save();        

        res.json({message: "Ürün kaydı başarıyla tamamlandı!"});
    });
});

//Ürün Silme
router.post("/removeById", async(req, res)=>{
    response(res,async()=>{
        const {_id} = req.body;
        //sepeti ve siparişi kontrol et. Eğer ürün oralarda varsa ürünü silme pasife çek
        const product = await Product.findById(_id);
        for (const image of product.imageUrls) {
            fs.unlink(image.path, ()=>{});
        }

        await Product.findByIdAndRemove(_id);
        res.json({message: "Ürün kaydı başarıyla silindi!"});
    });
})

//Ürün Listesi Getir
router.get("/", async(req, res)=>{
    response(res, async ()=>{
        let products = await Product.find().sort({name: 1}).populate("categories")
        res.json(products);
    });
})

//Ürünün Aktif/Pasif Durumunu Değiştir
router.post("/changeActiveStatus", async(req, res)=>{
    response(res, async()=>{
        const {_id} = req.body;
        let product = await Product.findById(_id);
        product.isActive = !product.isActive;
        await Product.findByIdAndUpdate(_id, product);
        res.json({message: "Ürün durumu başarıyla değiştirildi!"});
    })
});

//Id'ye Göre Ürünü Getir
router.post("/getById", async(req,res)=>{
    response(res, async()=>{
        const {_id} = req.body;
        let product = await Product.findById(_id);
        res.json(product);
    });
});

module.exports = router;