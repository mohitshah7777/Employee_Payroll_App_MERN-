const mongoose = require('mongoose');

const empSchema = mongoose.Schema({
    name: {
        type: String,
        required : true      
    },
    gender: {
        type: String,
        required: true 
    },
    department: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('EmpApp', empSchema);