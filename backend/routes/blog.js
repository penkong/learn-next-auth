const express = require('express')
const { time } = require('../controllers/blog.controller')

const router = express.Router()

router.get('/', time)

module.exports = router
