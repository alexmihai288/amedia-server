const express = require('express')
const router = express.Router()

const {createdBy,searchUser} = require('../controllers/search')
const authenticate = require("../middlewares/authenticate");
const decodeUser = require("../middlewares/decodeUser");

router.post('/createdBy',createdBy)
router.post('/decodeUser',authenticate,decodeUser)
router.get('/username/?',authenticate,searchUser)

module.exports = router