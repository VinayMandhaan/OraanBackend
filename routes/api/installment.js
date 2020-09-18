const express = require('express')
const router  = express.Router();
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const config = require('config')
const mongoose = require('mongoose')
const Installment = require('../../models/Installment')
const User = require('../../models/User')
var ObjectId = require('mongodb').ObjectID;
router.post("/",[
    check('installment_amount', 'installment_amount is required').not().isEmpty(),
    check('payment_method', 'payment_method is required').not().isEmpty(),
], async(req,res) => { 
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {userId, installment_amount,payment_method,payment_date,installment_date } = req.body
    try{
        if(mongoose.Types.ObjectId.isValid(userId)) {
            console.log(userId)
            const subs = await User.findOne(new ObjectId(userId))
            if(subs){
                installment = new Installment({
                    payment_date,
                    installment_date,
                    installment_amount,
                    payment_method,
                    user:userId
                })
                await installment.save();
                res.json({installment})
            }else{
                return res.status(400).json({msg:"No Profile for this user"})
            }
        }else{
            return res.status(400).json({msg:"No Profile for this user"})
        }
    }catch(err){
        console.log(err)
    }
    


})


module.exports = router