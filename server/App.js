const express = require("express");
const { graphqlHTTP } = require("express-graphql")
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors= require('cors')

const app = express();
app.use(cors())
mongoose.connect(
    "mongodb+srv://Database1:David99*@*@cluster0.nop4b.mongodb.net/Database1?retryWrites=true&w=majority", 
{ useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once('open', ()=>{
    console.log('connected to database')
})
.on('error', function (error) {
    console.log('error: ' + error)
})

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))
app.listen(4000, ()=>{
    console.log("listening for request on port 4000")
})

