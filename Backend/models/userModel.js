const mongoose = require('mongoose')
const userSchems = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
})
const User =  mongoose.model('User',userSchems)
module.exports = User