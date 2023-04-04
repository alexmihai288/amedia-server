const User = require('../models/User')
const BadRequest = require('../errors/BadRequest')
const Unauthenticate = require('../errors/Unauthenticate')

const register = async (req,res,next)=>{
    try {
        const user = await User.create(req.body)
        res.status(201).json({msg:'Account succesfully created !',ok:true})
    } catch (error) {
        next(error)
    }
}

const login = async (req,res,next)=>{
    try {
        const {email,password} = req.body

        if(!email || !password)
            throw new BadRequest('Please fill in the fields')
        
        const user = await User.findOne({email})

        if(!user)
            throw new Unauthenticate('Invalid credentials')

        isPasswordCorrect = await User.comparePassword(password,user.password)

        if(!isPasswordCorrect)
            throw new Unauthenticate('Invalid credentials')

        const token = User.createJWT({userId:user._id,username:user.username,photo:user.photo}) 


        res.status(200).json({msg:'Succesfully logged in !',token,ok:true})
    } catch (error) {
        next(error)
    }

}

module.exports = {register,login}