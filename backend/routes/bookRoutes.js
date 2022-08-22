const express = require('express')
const router = express.Router()
const {addBook,updateBookDetails} = require('../controllers/bookControllers')

router.post('/addBook', addBook)
router.route('/books/:id').put(updateBookDetails)


module.exports = router