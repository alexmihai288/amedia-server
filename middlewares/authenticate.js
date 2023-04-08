const jwt = require('jsonwebtoken')
const Unauthenticate = require('../errors/Unauthenticate')

const auth = async (req,res,next)=>{
    try{
         //check header
        const authHeader = req.headers.authorization

        if(!authHeader || !authHeader.startsWith('Bearer '))
            throw new Unauthenticate('authentication invalid')

        const token = authHeader.split(' ')[1]
        
        const payload = await jwt.verify(token,process.env.JWT_ENCRYPTION);

        //atatch the user to to req.user
        req.user = {userId:payload.userId}

        next()
    }
    catch(error){
        next(error)
    }
   
}

module.exports = auth