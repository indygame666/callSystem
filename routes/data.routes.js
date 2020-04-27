const {Router} = require ('express')
const User = require('../models/User')
const Notification = require('../models/Notification')
const router = Router()
const auth = require('../middleware/auth.middleware')
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcryptjs')



router.post('/generate', auth, async(req,res)=>{
    try {

        const {user} = req.body

        const name = user[Object.keys(user)[1]]
        const wardNumber = user[Object.keys(user)[3]]
        const gender = user[Object.keys(user)[4]]
        const diagnoses = user[Object.keys(user)[5]]

        
        const existing = await Notification.findOne({ wardNumber})

        if (existing) {
            return res.json ({message: 'Уведомление уже было создано'})
        }

        const notification = new Notification({
            name,
            wardNumber,
            gender,
            diagnoses
        })

        await notification.save()
        
        res.status(201).json({message: 'Уведомление создано'})
        
    } catch(e){
        res.status(500).json({message: 'Ошибка, попытайтесь снова'}) 
    }
})


router.get('/getData',auth, async (req,res)=>{
    try {
        const user = await User.find({owner: req.user.userId}) /// ???
        res.json(user)
    } catch(e){
        res.status(500).json({message: 'Ошибка, попытайтесь снова'}) 
    }
})

router.get(`/getData/:id`,auth, async (req,res)=>{
    try {
        const user = await User.findById(req.params.id) /// ???
        res.json(user)
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