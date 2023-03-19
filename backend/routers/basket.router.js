const express = require("express");
const router = express.Router();
const {v4:uuidv4} = require("uuid");
const Basket = require("../models/basket");
const response = require("../services/response.service");
const Product = require("../models/product");

//Sepete Ürün Ekleme
router.post("/add", async (req, res)=>{
    response(res, async ()=>{
        const basket = new Basket(req.body);
        basket._id = uuidv4();        
        basket.createdDate = new Date();

        const product = await Product.findOne({_id: basket.productId});
        if(basket.quantity > 0 && product.stock >= basket.quantity){
            await basket.save();

            product.stock = product.stock - basket.quantity;
            if(product.stock == 0){
                product.isActive = false;
            }
            await Product.findByIdAndUpdate(basket.productId, product);

            res.json({message: "Ürün başarıyla sepete eklendi!"});  
        }else{
            res.status(500).json({message: "Sepete eklemeye çalıştığınız adet stok adedinden fazla!"});
        }              
    })
});

//Sepetteki ürün sayısını
router.post("/getCount", async (req, res)=>{
    response(res, async() => {
        const {userId} = req.body;
        const count = await Basket.find({userId: userId}).count();
        res.json({data: count});
    });
});

//Sepetteki ürünlerin listesi
router.post("/getAll", async(req, res)=>{
    response(res, async()=>{
        const {userId} = req.body;
        const baskets = await Basket.aggregate([
            {
                $match: {userId: userId}
            },
            {
                $lookup:
                {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "product"
                }
            }
        ]);

        res.json({data: baskets});
    });
})


//Sepetteki ürünün adet sayısını değiştir
router.post("/changeQuantity", async (req, res)=>{
    response(res, async ()=>{
        const {_id, quantity} = req.body;
        const basket = await Basket.findOne({_id: _id});         

        const product = await Product.findOne({_id: basket.productId});
        
        if(product.stock + basket.quantity < quantity){
            res.status(500).json({message: "Stok adedinden fazla adedi sepete ekleyemezsiniz!"});
        }else{
            product.quantity = product.quantity + basket.quantity - quantity;
            await Product.findByIdAndUpdate(product._id, product);

            basket.quantity = quantity;
            await Basket.findByIdAndUpdate(_id, basket);

            res.json({message: "Sepetteki ürün adedi başarıyla güncellendi!"});
        }
    });
});

//Sepetteki ürünü silme
router.post("/removeById", async(req,res)=>{
    response(res, async()=>{
        const {_id} = req.body;
        const basket = await Basket.findOne({_id: _id});         

        const product = await Product.findOne({_id: basket.productId});
        product.stock += basket.quantity;
        await Product.findByIdAndUpdate(product._id, product);

        res.json({message: "Sepetteki ürün başarıyla silindi!"});

        await Basket.findByIdAndRemove(_id);  
    })
})


module.exports = router;