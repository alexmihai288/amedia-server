const NotFound = require('../errors/NotFound')
const User = require('../models/User')

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

module.exports = {createdBy}