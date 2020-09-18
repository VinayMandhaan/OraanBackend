const mongoose = require('mongoose')
const InstallmentSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    payment_date:{
        type: Date,
        default : Date.now
    },
    installment_date:{
        type: Date,
        default : Date.now
    },
    installment_amount:{
        type:Number,
        required:true
    },
    payment_method:{
        type:String,
        required:true
    }
})

module.exports = Installment = mongoose.model('installment',InstallmentSchema)