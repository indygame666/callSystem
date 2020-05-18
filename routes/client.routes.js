const {Router} = require ('express')
const router = Router()
const User = require('../models/User')
const Notification = require('../models/Notification')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcryptjs')
const auth = require('../middleware/auth.middleware')

// api/auth/login
router.post(
    '/login',
    [
       // check('email', 'Pls enter the correct email').normalizeEmail().isEmail(),
       check('wardNumber', 'Введите номер места').exists(), 
       check('password', 'Введите пароль').exists(),
      
    ],
    async (req,res) => {
    try{
            const errors = validationResult(req)
            
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Ошибка данных"
                    
                })
            }
     
            const {wardNumber, password} = req.body
            
            const user = await User.findOne({wardNumber})
            
            if (!user) {
                return res.status(400).json({ message:'Неправильный логин или пароль' })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({ message: 'Неправильный пароль'})
            }

            const token = jwt.sign(
                { user: 'client',
                    id: user.id
             },
                config.get('jwtSecret'),
                {   expiresIn: '1h' }
            )
            res.json({token, userId: user.id})

        }catch(e){
        
        res.status(500).json({message: 'Ошибка, попробуйте снова'})    
        }
})

router.post('/generate', auth, async(req,res)=>{
    try {

        const {name,wardNumber,gender,diagnoses,treatment} = req.body
        
        const existing = await Notification.findOne({wardNumber})

        if (existing) {
            return res.json ({message: 'Уведомление уже было создано'})
        }

        const notification = new Notification({
            name,
            wardNumber,
            gender,
            diagnoses,
            treatment
        })

        await notification.save()
        
        res.status(201).json({message: 'Уведомление создано'})
        
    } catch(e){
        res.status(500).json({message: 'Ошибка, попытайтесь снова'}) 
    }
})

module.exports = router