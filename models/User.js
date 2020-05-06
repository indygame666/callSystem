const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    fullName: {type: String, required:true, },
    password: {type:String, required:true},
    wardNumber: {type: Number, required:true, unique:true},
    gender: {type:String, required:true},
    diagnoses: {type:String, required:true},
    treatment: {type: String}
})

module.exports = model('User', schema)