const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://jar:Kushina4@auth-app.88raa.mongodb.net/?retryWrites=true&w=majority&appName=auth-app')
.then(()=> {
    console.log('connected to the database')
})
.catch(() => {
    console.log('connection failed')
})

const loginSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
})

module.exports = mongoose.model('login',loginSchema)
