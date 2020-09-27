const express = require('express')
const router  = express.Router();
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const config = require('config')
const mongoose = require('mongoose')
const Installment = require('../../models/Installment')
const User = require('../../models/User')
var ObjectId = require('mongodb').ObjectID;
const auth = require('../../middleware/auth')

// Create Transactions

// User has to provide the installment amount and payment method, user can provide the date too, If the date is not provided it will take the default date.
router.post("/",[auth,[
    check('installment_amount', 'installment_amount is required').not().isEmpty(),
    check('payment_method', 'payment_method is required').not().isEmpty(),
]], async(req,res) => { 
    const errors = validationResult(req)

    // Check for errors
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }


    const {installment_amount,payment_method,payment_date,installment_date } = req.body
    try{
        // Check if the given userId is valid
        if(mongoose.Types.ObjectId.isValid(req.user.id)) {
            console.log(req.user.id)
            // const subs = await User.findOne(new ObjectId(userId))

            const subs = await User.findById(req.user.id) 
            // If Id is valid create installment
            if(subs){
                installment = new Installment({
                    payment_date,
                    installment_date,
                    installment_amount,
                    payment_method,
                    user:req.user.id
                })
                await installment.save();
                res.json({installment})
            
            // If UserId is not Valid return error
            }else{
                return res.status(400).json({msg:"No Profile for this user"})
            }
        // If UserId is not Valid return error
        }else{
            return res.status(400).json({msg:"No Profile for this user"})
        }
    }catch(err){
        console.log(err)
    }
})


//Get User Savings
router.post("/user" , auth, async(req,res) => { 
    try{
        // Get UserId
        const {userId} = req.body

        //Check if UserId is Valid
        if(mongoose.Types.ObjectId.isValid(req.user.id)) {
            
            // Used Aggregation to Sum the installment amounts of the given user
            Installment.aggregate([
                { 
                  $match: {
                    user: {
                      $eq: new ObjectId(req.user.id),
                    }    
                  }
                }, {
                  $group: {
                    _id:null,
                    total: {
                      $sum: "$installment_amount"
                    }
                  }
                }
              ]).then(response=>{  
                return res.json(response.map(val=>"YOU HAVE SAVED "+val.total+ "PKR"))
              })
        }else{
            return res.status(400).json({msg:"No Profile for this user"})
        }
    }catch(err){
        console.log(err)
    }
})





module.exports = router