const {Router} = require ('express')
const User = require('../models/User')
const Notification = require('../models/Notification')
const Admin = require('../models/Admin')
const router = Router()
const auth = require('../middleware/auth.middleware')
const jwt = require('jsonwebtoken')
const config = require('config')
const admin = require('../middleware/admin.middleware')

router.get(`/getData/:id`,auth, async (req,res)=>{
    try {

        if (req.user.id == req.params.id)
        {
            const user = await User.findById(req.params.id) 

            if (!user){
                return res.status(400).json({message:'Пользователь не найден'})
            }

            res.json(user)
        }
        else
        {
                res.status(400).json ({message: 'Ошибка, нет прав доступа'})
        }

    } catch(e){
        res.status(500).json({message: 'Ошибка, попытайтесь снова'}) 
    }
})


router.get(`/getClient/:wardNumber`,admin, async (req,res)=>{
    try {
            
            const user = await User.findOne({wardNumber: req.params.wardNumber})

            if (!user){
                return res.status(400).json({message:'Пользователь не найден'})
            }

            res.json(user)

    } catch(e){

        res.status(500).json({message: 'Ошибка, попытайтесь снова'}) 
    }
})

router.post(`/getAdmin`,admin, async (req,res)=>{
    try {
            
            const user = await Admin.findOne({login: req.body.login})

            if (!user){
                return res.status(400).json({message:'Пользователь не найден'})
            }

            res.json(user)

    } catch(e){

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

router.get('/getNotification/:id', admin, async (req,res)=>{
    try {
        
        const notification = await Notification.findOne({_id: req.params.id})

        res.json(notification)


    } catch(e){
        res.status(500).json({message: 'Ошибка, попытайтесь снова'}) 
    }
})

router.post(`/verify`, async (req,res)=>{
    
    try {

        const decoded = jwt.verify(req.body.temp, config.get('jwtSecret'))

       res.json(decoded)

    } catch(e){
        res.status(500).json({message: 'Ошибка, попытайтесь снова'}) 
    }
})

module.exports = router