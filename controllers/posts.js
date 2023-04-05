const Post = require('../models/Post')
const BadRequest = require('../errors/BadRequest')
const NotFound = require('../errors/NotFound')

const getAllPosts = async(req,res,next)=>{
    try{
        const post = await Post.find({}).sort('createdAt')
        res.status(200).json({post,count:post.length})
    }catch(error){
        next(error)
    }
}
const createPost = async(req,res,next)=>{
    try{
        req.body.createdBy = req.user.userId
        const post = await Post.create(req.body)
        res.status(201).json({post})
    }catch(error){
        next(error)
    }
}

const getPost = async(req,res,next)=>{
    try{
        const {user:{userId},params:{id:postId}} = req
        const post = await Post.findOne({_id:postId,createdBy:userId})
        if(!post)
            throw new NotFound(`No post with id ${postId}`) 

        res.status(200).json({post})
    }
    catch(error){
        next(error)
    }
   
}

const updatePost =  async(req,res,next)=>{
    try{
        const {body:{description,imageUrl},user:{userId},params:{id:postId}} = req

        if(description.trim()==='' || !imageUrl)
            throw new BadRequest('You must fill all the inputs')
    
        const post = await Post.findByIdAndUpdate({_id:postId,createdBy:userId},req.body,{new:true,runValidators:true})
    
        if(!post)
            throw new NotFound(`No job with the id ${postId}`)
    
        res.status(200).json({post})
    }
    catch(error)
    {
        next(error)
    }
    
}

const deletePost = async(req,res,next)=>{
    try{
        const {user:{userId},params:{id:postId}} = req
        const post = await Post.findOneAndRemove({_id:postId,createdBy:userId})
        
        if(!post)
            throw new NotFound(`No post with id ${postId}`)

        res.status(200).json({post})
    }
    catch(error){
        next(error)
    }

}


module.exports = {getAllPosts,createPost,getPost,updatePost,deletePost}