const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')
const webpush = require('web-push')
const fs = require('fs')

var PUBLIC_VAPID_KEY = 'BKLFGADANebBaZrF7cvRxSgKsOnYT3CDsmjlCuJT9P1gn5ZiQRAUyzd6VRael3Zbmc67TrjyXM-DjQUeewPAUbg'

var PRIVATE_VAPID_KEY = 'KhzZKG_0I_ou8_6YXlwJiwSaXSNdy6gNmTZb-7uI0r8'

var WEB_PUSH_CONTACT="mailto: contact@my-site.com"

webpush.setVapidDetails(WEB_PUSH_CONTACT, PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY)


const app = express()

app.use(express.json({extended:true}))

app.use('/api/client', require('./routes/client.routes'))
app.use('/api/data', require('./routes/data.routes'))
app.use('/api/admin', require('./routes/admin.routes'))


/*
app.post('/notifications/subscribe', (req, res) => {
    
    const subscription = req.body

    //console.log(subscription)
  
    const payload = JSON.stringify({
      title: 'Hello!',
      body: 'It works.',
    })
  
    webpush.sendNotification(subscription, payload)
      .then(result => console.log(result))
      .catch(e => console.log(e.stack))
      
  
    res.status(200).json({'success': true})
  });

*/

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


