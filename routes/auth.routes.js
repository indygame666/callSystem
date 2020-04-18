const {Router} = require ('express')
const router = Router()
const User = require('../models/User')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcryptjs')

// api/auth/register
router.post(
    '/register',
    [
        //check('email', "Invalid email").isEmail(),
        //check('wardNumber', "палата должна быть прописана числом").,
        check('password', "пароль должен состоят минимум из 6 символов").isLength({ min:6}),
    ], 
    async (req,res) => {
    try{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: "Неправильные данные"
            })
        }

       const {fullName, password,wardNumber,gender,diagnoses} =  req.body 
       const candidate = await User.findOne({wardNumber})
       
       if (candidate) {
         return  res.status(400). json({message: "Место уже занято другим пользователем"})
       }

       const hashedPassword = await bcrypt.hash(password, 12)
       const user = new User({fullName, password: hashedPassword,wardNumber,gender,diagnoses})

       await user.save()

       res.status(201).json({ message: "Пользователь успешно записан"})


    }catch(e){

        res.status(500).json({message: 'Ошибка, попытайтесь снова'})    
    
    }
})

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
            const fullName = user.fullName
            
            if (!user) {
                return res.status(400).json({ message:'Неправильный логин или пароль' })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({ message: 'Неправильный пароль'})
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                {   expiresIn: '1h' }

            )
            res.json({token, userId: user.id,})

        }catch(e){
        res.status(500).json({message: 'Ошибка, попробуйте снова'})    
        }
})

module.exports = router