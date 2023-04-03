const CustomAPIError = require("../errors/CustomAPIError")

const errorHandler = (err,req,res,next)=>{
    console.log(err)


    let defaultError = {
        msg:'Internal server error',
        statusCode:500,
        ok:false
    }

    function setError(msg,statusCode,ok){
        defaultError.msg = msg
        defaultError.statusCode = statusCode
        defaultError.ok = ok
    }

   

    if(err instanceof CustomAPIError){
        setError(err.message,err.statusCode,false)
    }

    //duplicated
    if(err.code === 11000){
        if(err.keyValue.username)
            setError(`Username ${err.keyValue.username} is already taken`,400,false)
        else if(err.keyValue.email)
            setError(`Email ${err.keyValue.email} is already taken`,400,false)
    }

    //mongooseValidation(empty or doesn't follow the rules)
    if(err.errors){
        if(err.errors.username){
            setError(err.errors.username.properties.message,400,false)
        }
        else if(err.errors.firstName){
            setError(err.errors.firstName.properties.message,400,false)
        }
        else if(err.errors.lastName){
            setError(err.errors.lastName.properties.message,400,false)
        }
        else if(err.errors.email){
            setError(err.errors.email.properties.message,400,false)
        }
        else if(err.errors.password){
            setError(err.errors.password.properties.message,400,false)
        }
    }


    res.status(200).json(defaultError)
}

module.exports = errorHandler