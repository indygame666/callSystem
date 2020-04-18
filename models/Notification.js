const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true},
    wardNumber: {type: Number, required:true, unique:true},
    gender: {type:String, required:true},
    diagnoses: {type:String, required:true}
    
})

module.exports = model('Notification', schema)