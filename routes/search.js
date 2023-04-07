const express = require('express')
const router = express.Router()

const {createdBy} = require('../controllers/search')

router.post('/createdBy',createdBy)

module.exports = router