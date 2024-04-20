const mongoose = require('mongoose')
const tasksSchems = new mongoose.Schema({
    task:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    assigned_to:{
        type:String,
        default: "none",
    },
}, { timestamps: true })
const Tasks =  mongoose.model('Tasks',tasksSchems)
module.exports = Tasks