const mongoose = require('mongoose')
const bookSchema = mongoose.Schema(
    {
        bookId: {
        type: String,
        required: [true, 'Please add a Id'],
        unique: true,
      },
      name: {
        type: String,
        required: [true, 'Please add an name'],
      },
      author: {
        type: String,
        required: [true, 'Please add a author name'],
      },
      publishedYear: {
        type: Number,
        required: [true, 'Please add a published Year'],
      },
      price : {
        type: Number,
        required: [true, 'Please add a price'],
      },
      status : {
        type: Number,
        required: [true, 'Please add a status'],
      },
    },
    {
      timestamps: true,
    }
  )
  
  module.exports = mongoose.model('Books', bookSchema)