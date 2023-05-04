const express = require('express')
const router = express.Router()
const authenticate =  require('../middlewares/authenticate')


const updateFriendsReq = require('../controllers/user')


router.patch('/:id',authenticate,updateFriendsReq)

module.exports = router