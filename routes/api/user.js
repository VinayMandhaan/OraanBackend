const express = require('express')
const router  = express.Router();
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const config = require('config')

const User = require('../../models/User')

router.post("/",[
    check('phone_number', 'phone_number is required').not().isEmpty().isNumeric(),
    check('username', 'username is required').not().isEmpty(),
    check('passcode', 'enter passcode with 6 or more characters').isLength({min:6})
], async(req,res) => { 
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {phone_number,username,passcode} = req.body
    try{
        let user = await User.findOne({phone_number})
        if(user){
            return res.status(400).json({errors : [{msg: 'User already exist'}]})
        }

         user = new User({
             phone_number,
             username,
             passcode,
         })
         
         const salt = await bcrypt.genSalt(10);
         user.passcode = await bcrypt.hash(passcode,salt)
         await user.save();
         res.json({user})

    }catch(err){
        console.log(err.message)
        res.status(500).send("Server error")
    }


})


module.exports = router