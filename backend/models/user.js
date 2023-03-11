const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    _id: String,
    name: {
        type: String,
        required: true,
        minLength: [3, "Ad soyad kısmı en az 3 karakter olmalıdır!"]
    },
    userName: {
        type: String,
        required: true,
        minLength: [3, "Kullanıcı adı kısmı en az 3 karakter olmalıdır!"],
        unique: true
    },
    email: {
        type: String,
        required: true,
        minLength: [3, "Mail adresi en az 3 karakter olmalıdır!"],
        email: ["Geçerli bir mail adresi yazın!"],
        unique: true
    },
    imageUrl: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
    mailConfirmCode: String,
    isMailConfirm: Boolean,
    createdDate: Date,
    updatedDate: Date,
    isAdmin: Boolean,
    forgotPasswordCode: String,
    isForgotPasswordCodeActive: Boolean
});

const User = mongoose.model("User", userSchema);

module.exports = User;