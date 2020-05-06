const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
//const socketio = require('socket.io');
//const http = require('http');

const app = express()

//const server = http.createServer(app);

//const io = socketio(server);

app.use(express.json({extended:true}))

app.use('/api/client', require('./routes/client.routes'))
app.use('/api/data', require('./routes/data.routes'))
app.use('/api/admin', require('./routes/admin.routes'))

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


