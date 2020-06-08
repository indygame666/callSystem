const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')


const app = express()


app.use(express.json({extended:true}))

app.use('/api/client', require('./routes/client.routes'))
app.use('/api/data', require('./routes/data.routes'))
app.use('/api/admin', require('./routes/admin.routes'))

if (process.env.NODE_ENV === 'production') {
    app.use('/',express.static(path.join(__dirname,'front','build')))

    app.get('*', (req,res)=>{
        req.sendFile(path.resolve(__dirname,'front','build','index.html'))
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


