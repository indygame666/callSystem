const jwt = require('jsonwebtoken')
const config = require('config')

module.exports=(req,res,next) =>{
    if (req.method === 'OPTIONS' ){
        return next()
    }

    try{
        const token = req.headers.authorization.split(' ')[1]
        if (!token){
          return res.status(401).json({message:'Нет прав доступа'})
        }
        
        const decoded = jwt.verify(token, config.get('jwtSecret'))

        //console.log(decoded)

        if (decoded.user === 'client' || decoded.user === 'admin') {

        req.user = decoded

        next()
        }
        else{
            return res.status(401).json({message:'Нет прав доступа'})
        }

    }catch (e){
        return res.status(401).json({message:'Нет прав доступа'})
    }
}