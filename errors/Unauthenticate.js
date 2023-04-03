const CustomAPIError = require("./CustomAPIError")

class Unauthenticate extends CustomAPIError{
    constructor(message){
        super(message)
        this.statusCode = 401
    }
}

module.exports = Unauthenticate