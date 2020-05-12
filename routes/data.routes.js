const {Router} = require ('express')
const User = require('../models/User')
const Notification = require('../models/Notification')
const router = Router()
const auth = require('../middleware/auth.middleware')
const jwt = require('jsonwebtoken')
const config = require('config')
const admin = require('../middleware/admin.middleware')


router.post('/generate', auth, async(req,res)=>{
    try {

        const {name,wardNumber,gender,diagnoses,treatment} = req.body
        
        const existing = await Notification.findOne({ wardNumber})

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


router.post(`/verify`, async (req,res)=>{
    
    try {

        const decoded = jwt.verify(req.body.temp, config.get('jwtSecret'))

       res.json(decoded)

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

router.put(`/update/:wardNumber`,admin, async (req,res)=>{
    try {
        

            const user = await User.findOne({wardNumber: req.params.wardNumber}) 

            if (!user){
                return res.status(400).json({message:'Пользователь не найден'})
            }

            const result = await User.updateOne(user, req.body)

            res.json({message:"Пользователь изменен"})

    } catch(e){

        res.status(500).json({message: 'Ошибка, попытайтесь снова'}) 
    }
})

router.post(`/delete/:wardNumber`, async (req,res)=>{
    
    try {

        const response = await User.deleteOne({wardNumber:req.params.wardNumber})

        res.json({message:"Пользователь удален"})

    } catch(e){
        res.status(500).json({message: 'Ошибка, попытайтесь снова'}) 
    }
})

module.exports = router