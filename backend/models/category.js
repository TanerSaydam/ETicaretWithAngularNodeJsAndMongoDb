const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    _id: String,
    name: {
        type: String,
        unique: true,
        required: true
    },
    createdDate: String
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;