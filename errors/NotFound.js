const CustomAPIError = require("./CustomAPIError")

class NotFound extends CustomAPIError{
    constructor(message){
        super(message)
        this.statusCode = 404
    }
}

module.exports = NotFound