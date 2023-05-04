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

module.exports = updateFriendsReq