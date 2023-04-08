const express = require('express')
const router = express.Router()

const {createdBy} = require('../controllers/search')
const authenticate = require("../middlewares/authenticate");
const decodeUser = require("../middlewares/decodeUser");

router.post('/createdBy',createdBy)
router.post('/decodeUser',authenticate,decodeUser)

module.exports = router