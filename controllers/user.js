const User = require('../models/User')
const NotFound = require('../errors/NotFound')



const updateFriendsReq = async(req,res,next)=>{
    try{
       const {body:{friendsRequest},params:{id}} = req
       
       const propsObject = {}
       if(friendsRequest)
            propsObject.friendsRequest=friendsRequest
            
       const user = await User.findByIdAndUpdate({_id:id},propsObject,{new:true,runValidators:true})     

        if(!user)
            throw new NotFound(`No user with id ${id}`)

        res.status(200).json(user)    
    }catch (error){
        next(error)
    }
}

const AcceptFriendRequest = async(req,res,next)=>{
    try{
        const {body:{friends},params:{id}} = req

        const propsObject = {}
        if(friends)
            propsObject.friends=friends

        const user = await User.findByIdAndUpdate({_id:id},propsObject,{new:true,runValidators:true})

        if(!user)
            throw new NotFound(`No user with id ${id}`)

        res.status(200).json({user,ok:true})   

    }catch(error){
        next(error)
    }
}

module.exports = {updateFriendsReq,AcceptFriendRequest}