const mongoose = require('mongoose')

const Userschema = new mongoose.Schema({
    firstName:{
        type:String,
        required: true,
    },
    lastName:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        required: true,
        type:String
    },
    dateofbirth:{
        required: true,
        type:Date
    },
    phoneNumber:{
        required: true,
        type:Number
    }
})

module.exports=  mongoose.model('User',Userschema);