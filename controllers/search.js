const NotFound = require('../errors/NotFound')
const User = require('../models/User')
const BadRequest = require('../errors/BadRequest')

const createdBy = async(req,res,next)=>{
    try{
        const {createdBy} = req.body
        const user = await User.findById({_id:createdBy})

        if(!user)
            throw NotFound(`No user with with ${createdBy}`)

        res.status(200).json(user)
    }
    catch(error){
        next(error)
    }
}


const searchUser = async(req,res,next)=>{
    try {
     const {username} = req.query

     if(!username){
        throw new BadRequest('Provide an username!')
    }
        
     const user = await User.find({username:{$regex:username,$options:'i'}})

     if(user.length===0)
            throw new NotFound('No users found !')

    res.status(200).json(user)
     
    }catch (error){
        next(error)
    }
}

const decodeByUserId = async(req,res,next)=>{
    try{
        const {id} = req.params

        const user = await User.findById({_id:id})

        if(!user)
            throw new BadRequest(`No user with id:${id}`)

        res.status(200).json({user,ok:true})
    }
    catch(error)
    {
        next(error)
    }
}

module.exports = {createdBy,searchUser,decodeByUserId}