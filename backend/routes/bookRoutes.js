const express = require('express')
const router = express.Router()
const {addBook} = require('../controllers/bookControllers')

router.post('/addBook', addBook)

module.exports = router