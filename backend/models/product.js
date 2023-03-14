const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    _id: String,
    name: String,
    description: String,
    imageUrls: Array,
    stock: Number,    
    price: Number,
    createdDate: Date,
    updatedDate: Date,
    categories: [{type: String, ref: 'Category'}]
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;