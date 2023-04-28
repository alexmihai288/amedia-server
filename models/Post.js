const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    description:{
        type:String,
        maxlength:150
    },
    imageUrl:{
        type:String,
        required:[true,'Please provide an image URL in order to continue']
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    upVotes:[
        {
            type:mongoose.Types.ObjectId,
            ref:'User'
        }
    ],
    downVotes:[
       { 
        type:mongoose.Types.ObjectId,
        ref:'User'
       }
        
    ],
    comments:[
        {
            userId:mongoose.Types.ObjectId,
            comment:{
                type:String,
                required:[true,'Please enter your comment']
            }
        }
    ]
},{timestamps:true})

module.exports = mongoose.model('Post',PostSchema)