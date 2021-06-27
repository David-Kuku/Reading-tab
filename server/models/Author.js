const mongoose = require('mongoose')
const schema = mongoose.Schema

const authorschema = new schema({
    name: String,
    age: Number
})

const Author = mongoose.model('author', authorschema)

module.exports = Author