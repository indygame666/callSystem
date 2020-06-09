const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')

/*const webpush = require('web-push')

const vapidKeys = { 
    publicKey:'BNWRfQs5BqX07u1JA5QiXryIr5DHG88cFdwSgHAusEOkzJxg8FLGJ1mc5SKsJuh8WLwOuzL2WDoNye-Rnmp0GVo',
   privateKey: 'f304g2abXlaaEeAD-gAP5k3JtE9SXf7t7sVyRyMyCgk' 
}

webpush.setVapidDetails('mailto:test@test.com', vapidKeys.publicKey,vapidKeys.privateKey)

app.post('/subcribe', (req,res)=>{
    const subscribtion = req.body
    res.status(201).json({})
})
*/

const app = express()

app.use(express.json({extended:true}))

app.use('/api/client', require('./routes/client.routes'))
app.use('/api/data', require('./routes/data.routes'))
app.use('/api/admin', require('./routes/admin.routes'))

if (process.env.NODE_ENV === 'production') {
    app.use('/',express.static(path.join(__dirname,'front','build')))

    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname,'front','build','index.html'))
    })
}

const PORT = config.get('port') || 5000

async function start ()
{
    try{
      await mongoose.connect(config.get('mongoUri'), {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true
       })
      app.listen(PORT, () => console.log('App successfully started on port ' + config.get('port') + '...' ))
    } catch(e){
        console.log ('Server Error', e.message)
        process.exit(1);
    }
}

start()


