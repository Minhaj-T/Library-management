const express = require('express');
const router = express.Router();
const {
  addBook,
  updateBookDetails,
  deleteBook,
  fetchAllBooks
} = require('../controllers/bookControllers');

router.post('/addBook', addBook);
router.route('/books/:id').put(updateBookDetails).delete(deleteBook);
router.get('/fetch-books', fetchAllBooks);

module.exports = router;
