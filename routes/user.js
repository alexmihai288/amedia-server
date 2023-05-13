const express = require('express')
const router = express.Router()
const authenticate =  require('../middlewares/authenticate')


const {updateFriendsReq,AcceptFriendRequest} = require('../controllers/user')

router.patch('/:id',authenticate,updateFriendsReq)
router.patch('/me/:id',authenticate,AcceptFriendRequest)

module.exports = router