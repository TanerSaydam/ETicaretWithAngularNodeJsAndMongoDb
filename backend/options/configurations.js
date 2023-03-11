const User = require("../models/user");
const {v4:uuidv4} = require("uuid");


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
            isAdmin: true,
            forgotPasswordCode: "000000",
            isForgotPasswordCodeActive: false
        });

        await newUser.save();
    }
}

module.exports = createAdminUser;