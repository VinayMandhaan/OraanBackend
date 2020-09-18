const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    phone_number : {
        type : Number,
        required : true
    },
    username : {
        type : String,
        required : true,
    },
    passcode: {
        type : String,
        required : true,
    }
})

module.exports = User = mongoose.model('user',UserSchema)
