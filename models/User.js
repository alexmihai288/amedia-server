const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'You must provide an username'],
        minlength:2,
        maxlength:20,
        unique:true
    },
    firstName:{
        type:String,
        required:[true,'You should provide your first name'],
        minlength:3
    },
    lastName:{
        type:String,
        required:[true,'You should provide your last name'],
        minlength:3
    },
    email:{
        type:String,
        required:[true,'You must provide an email'],
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide email'
        ],
        unique:true  
    },
    password:{
        type:String,
        required:[true,'You must provide a password'],
        minlength:4
    },
    photo:{
        type:String,
        default:"https://media.discordapp.net/attachments/724220064223592541/1092840802721480804/user.jpg?width=662&height=662"
    }
},{timestamps:true})

UserSchema.pre('save',async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})

UserSchema.statics.createJWT = function(payload){
    return jwt.sign({userId:payload.userId},process.env.JWT_ENCRYPTION,{expiresIn:process.env.JWT_LIFETIME})
}

UserSchema.statics.comparePassword = async function(canditatedPass,password) {
    isMatch = await bcrypt.compare(canditatedPass,password)
    return isMatch
}

module.exports = mongoose.model('User',UserSchema)