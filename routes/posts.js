const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authenticate')

const {getAllPosts,createPost,getPost,updatePost,deletePost} = require('../controllers/posts')

router.get('/',getAllPosts).post('/',authenticate,createPost)
router.get('/:id',authenticate,getPost).patch('/:id',authenticate,updatePost).delete('/:id',authenticate,deletePost)

module.exports = router