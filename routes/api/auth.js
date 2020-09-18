const express = require('express')
const router  = express.Router();
const {check, validationResult} = require('express-validator')
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const config = require('config')



// Login User using Phone Number and Password

router.post("/",[
    check('phone_number', 'phone_number is required').exists(),
    check('passcode', 'password is required').exists()
], async(req,res) => { 
    const errors = validationResult(req)
    
    // Check If Errors
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {phone_number,passcode} = req.body

    //Check If Phone Number Exists
    try{
        let user = await User.findOne({phone_number})
        if(!user){
            return res.status(400).json({errors : [{msg: 'Invalid phone_number or password'}]})
        }

        // Match the encrypted Password with the user provided Password
        const isMatch = await bcrypt.compare(passcode, user.passcode)

        // If Password does not match return error
        if(!isMatch){
            return res.status(400).json({errors : [{msg: 'Invalid email or password'}]})
        }

        // Return user
        res.json({user})

    }catch(err){
        console.log(err.message)
        res.status(500).send("Server error")
    }
})



module.exports = router