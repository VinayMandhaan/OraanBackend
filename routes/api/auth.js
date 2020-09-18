const express = require('express')
const router  = express.Router();
const {check, validationResult} = require('express-validator')
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const config = require('config')




router.post("/",[
    check('phone_number', 'phone_number is required').exists(),
    check('passcode', 'password is required').exists()
], async(req,res) => { 
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {phone_number,passcode} = req.body
    try{
        let user = await User.findOne({phone_number})
        if(!user){
            return res.status(400).json({errors : [{msg: 'Invalid phone_number or password'}]})
        }

        const isMatch = await bcrypt.compare(passcode, user.passcode)

        if(!isMatch){
            return res.status(400).json({errors : [{msg: 'Invalid email or password'}]})
        }
        
        res.json({user})

    }catch(err){
        console.log(err.message)
        res.status(500).send("Server error")
    }


})



module.exports = router