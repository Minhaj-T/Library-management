const asyncHandler = require('express-async-handler');
const Books = require('../model/bookModel');

// @desc    Set goal
// @route   POST /api/addBook
// @access  Public
const addBook = asyncHandler(async (req, res) => {
  const { bookId, name, author, publishedYear, price, status } = req.body;

  if (!name || !bookId || !author || !publishedYear || !price || !status) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // Create
  const bookData = await Books.create({
    bookId,
    name,
    author,
    publishedYear,
    price,
    status,
  });

  if (bookData) {
    res.status(201).json({
      bookId: bookData.bookId,
      name: bookData.name,
      author: bookData.author,
      publishedYear: bookData.publishedYear,
      price: bookData.price,
      status: bookData.status,
    });
  } else {
    res.status(400);
    throw new Error('Invalid bookData data');
  }
});

module.exports = {
  addBook,
};
