const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authenticate')

const {getAllPosts,getAllPostsByUserId,createPost,getPost,updatePost,deletePost} = require('../controllers/posts')

router.get('/',getAllPosts).get('/getAllPostsByUserId/:id',getAllPostsByUserId).post('/',authenticate,createPost)
router.get('/:id',authenticate,getPost).patch('/:id',authenticate,updatePost).delete('/:id',authenticate,deletePost)

module.exports = router