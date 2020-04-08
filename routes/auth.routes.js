const {Router} = require ('express')
const router = Router()
const User = require('../models/User')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')

// auth/register
router.post(
    '/register',
    [
        check('email', "Invalid email").isEmail(),
        check('password', "Invalid length").isLength({ min:6})
    ], 
    async (req,res) => {
    try{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid data"
            })
        }

       const {email, password} =  req.body 
       const candidate = await User.findOne({email})
       
       if (candidate) {
         return  res.status(400). json({message: "User already exist, try again"})
       }

       const hashedPassword = await bcrypt.hash(password, 12)
       const user = new User({ email, password: hashedPassword})

       await user.save()

       res.status(201).json({ message: "User has been succesfully created"})


    }catch(e){
    res.status(500).json({message: 'Error, try again'})    
    }
})

// auth/login
router.post(
    '/login',
    [
        check('email', 'Pls enter the correct email').normalizeEmail().isEmail(),
        check('password', 'Enter the password').exists()
    ],
    async (req,res) => {
    try{
            const errors = validationResult(req)
    
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Invalid data"
                })
            }
     
            const {email, password} = req.body
            const user = await User.findOne({email})
            
            if (!user) {
                return res.status(400).json({ message:'Wrong email or password' })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({ message: 'Wrong email or password'})
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                {   expiresIn: '1h' }

            )
            res.json({token, userId: user.id})

        }catch(e){
        res.status(500).json({message: 'Error, try again'})    
        }
})

module.exports = router