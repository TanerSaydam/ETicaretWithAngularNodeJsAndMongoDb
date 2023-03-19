const mongoose = require("mongoose");

const basketSchema = new mongoose.Schema({
    _id: String,
    productId: String,
    userId: String,
    quantity: Number,
    price: Number,
    createdDate: Date
});

const Basket = mongoose.model("Basket", basketSchema);

module.exports = Basket;