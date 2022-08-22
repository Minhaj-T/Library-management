const asyncHandler = require('express-async-handler');
const Books = require('../model/bookModel');

// @desc    add Books
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

// @desc    Update books
// @route   PUT /api/books/:id
// @access  Public
const updateBookDetails = asyncHandler(async (req, res) => {
  const book = await Books.findOne({ bookId: req.params.id });

  if (!book) {
    res.status(400);
    throw new Error('book not found');
  }
  const newData = {
    bookId: req.body.bookId,
    name: req.body.name,
    author: req.body.author,
    publishedYear: req.body.publishedYear,
    price: req.body.price,
    status: req.body.status,
  };

  const filter = { bookId: req.params.id };
  const updatedData = await Books.findOneAndUpdate(filter, newData, {
    new: true,
  });

  res.status(200).json(updatedData);
});

// @desc    Delete book
// @route   DELETE /api/books/:id
// @access  Public
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Books.findOne({ bookId: req.params.id });

  if (!book) {
    res.status(400);
    throw new Error('Goal not found');
  }

  await book.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  addBook,
  updateBookDetails,
  deleteBook,
};
