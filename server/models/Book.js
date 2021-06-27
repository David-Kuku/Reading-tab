const mongoose = require('mongoose')
const schema = mongoose.Schema

const bookschema = new schema({
    name: String,
    genre: String,
    authorId: String
})

const Book = mongoose.model('book', bookschema)

module.exports = Book