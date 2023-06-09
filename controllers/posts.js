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

const getAllPostsByUserId = async(req,res,next)=>{
    try{
        const userId = req.params.id
        const post = await Post.find({createdBy:userId})
        if(!post){
            res.status(200).json({msg:"User doesn't have any posts yet !"})
            return
        }
        res.status(200).json({post,count:post.length,ok:true})
    }catch(error) {
        next(error)
    }
}

const createPost = async(req,res,next)=>{
    try{
        req.body.createdBy = req.user.userId
        const {description,imageUrl} = req.body
        if(!description || !imageUrl)
            throw new BadRequest('Please fill all the fields !')
        const post = await Post.create(req.body)
        res.status(201).json({msg:'Post succesfully created !',ok:true})
    }catch(error){
        next(error)
    }
}

const getPost = async(req,res,next)=>{
    try{
        const {params:{id:postId}} = req
        const post = await Post.findOne({_id:postId})
        if(!post)
            throw new NotFound(`No post with id ${postId}`) 

        res.status(200).json({post,ok:true})
    }
    catch(error){
        next(error)
    }
   
}

const updatePost =  async(req,res,next)=>{
    try{
        const {body:{description,imageUrl,upVotes,downVotes,comments},user:{userId},params:{id:postId}} = req

        const propsObject = {};

        if(description){
            if(description.trim()==='')
                throw new BadRequest('You must fill all the inputs')
            propsObject.description=description
        }
        if(imageUrl){
            if(!imageUrl)
                throw new BadRequest('You must fill all the inputs')
            propsObject.imageUrl=imageUrl
        }
        if(upVotes)
            propsObject.upVotes=upVotes
        if(downVotes)
            propsObject.downVotes=downVotes

        if(comments)
            propsObject.comments=comments

        const post = await Post.findByIdAndUpdate({_id:postId,createdBy:userId},propsObject,{new:true,runValidators:true})
    
        if(!post)
            throw new NotFound(`No post with the id ${postId}`)
    
        res.status(200).json(post)
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

        res.status(200).json(post)
    }
    catch(error){
        next(error)
    }

}


module.exports = {getAllPosts,getAllPostsByUserId,createPost,getPost,updatePost,deletePost}