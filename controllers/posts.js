const getAllPosts = async(req,res)=>{
    res.send('allposts')
}
const createPost = async(req,res)=>{
    res.send('created')
}

const getPost = async(req,res)=>{
    res.send('single post')
}

const updatePost =  async(req,res)=>{
    res.send('updated post')
}

const deletePost = async(req,res)=>{
    res.send('deleted post')
}


module.exports = {getAllPosts,createPost,getPost,updatePost,deletePost}