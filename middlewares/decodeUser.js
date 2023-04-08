const User = require('../models/User');
const NotFound = require('../errors/NotFound');


const decodeUser = async (req,res,next)=>{
    try{
        const {userId} = req.user;
        const targetUser = await User.findById({_id:userId}).select('-password');

        if(!targetUser)
            throw new NotFound(`Cannot find any user with the id of ${userId}`);

        res.status(200).json(targetUser);
    }catch(err){
        next(err);
    }
}

module.exports = decodeUser;