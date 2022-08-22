const express = require('express');
const router = express.Router();
const {
  addBook,
  updateBookDetails,
  deleteBook,
} = require('../controllers/bookControllers');

router.post('/addBook', addBook);
router.route('/books/:id').put(updateBookDetails).delete(deleteBook);

module.exports = router;
