const {Router} = require ('express')
const router = Router()
const Admin = require('../models/Admin')
const Notification = require('../models/Notification')
const User = require('../models/User')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcryptjs')
const admin = require('../middleware/admin.middleware')


router.post(
    '/login',
    [
       // check('email', 'Pls enter the correct email').normalizeEmail().isEmail(),
       check('login', 'Введите имя пользователя').exists(), 
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
     
            const {login, password} = req.body
            
           const user = await Admin.findOne({login})
            
            if (!user) {
                return res.status(400).json({ message:'Неправильный логин или пароль' })
            }

            const isMatch = await bcrypt.compare(password, user.password)


            if (!isMatch) {
                return res.status(400).json({ message: 'Неправильный логин или пароль'})
            }

            const token = jwt.sign(
                { user: 'admin' },
                config.get('jwtSecret'),
                {   expiresIn: '1h' }

            )
            res.json({token, userId: user.id,})

        }catch(e){
        res.status(500).json({message: 'Ошибка, попробуйте снова'})    
        }
})



// api/admin/register
router.post(
    '/register',
    [
        //check('email', "Invalid email").isEmail(),
        //check('wardNumber', "палата должна быть прописана числом").,
        check('password', "пароль должен состоят минимум из 6 символов").isLength({ min:6}),
    ], 
    admin,
    async (req,res) => {
    try{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: "Неправильные данные"
            })
        }

       const {fullName, password,wardNumber,gender,diagnoses, treatment} =  req.body 
       const candidate = await User.findOne({wardNumber})
       
       if (candidate) {
         return  res.status(400). json({message: "Место уже занято другим пользователем"})
       }


    const hashedPassword = await bcrypt.hash(password, 12)

       const user = new User({fullName, password: hashedPassword,wardNumber,gender,diagnoses,treatment})

       await user.save()

       res.status(201).json({ message: "Пользователь успешно записан"})


    }catch(e){

        console.log(e)
        res.status(500).json({message: 'Ошибка, попытайтесь снова'})    
    
    }
})

router.get('/getNotifications', admin, async (req,res)=>{
    try {
        const collection = await Notification.find()
        res.json(collection)
    } catch(e){
        res.status(500).json({message: 'Ошибка, попытайтесь снова'}) 
    }
})

router.post('/delete', admin, async (req,res)=>{
    try {
        
    const response = await Notification.deleteOne({wardNumber: req.body.notification})

        res.json('пользователен удалён')
    } catch(e){
        res.status(500).json({message: 'Ошибка, попытайтесь снова'}) 
    }
})

/*
router.post('/update', admin, async (req,res)=>{
    try {

        lastClientNotification = req.body

        const lastServerNotification = Notification.find().limit(1).sort({$natural:-1}).pretty()
        
        console.log(lastServerNotification)

        res.json('test')
        
    } catch(e){
        res.status(500).json({message: 'Ошибка, попытайтесь снова'}) 
    }
})
*/





module.exports = router