const graphql = require("graphql");
const _ = require("lodash");
const Book = require('../models/Book')
const Author = require('../models/Author')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} = graphql;

//types

//entry point (what it gets==the type) and the args used in getting it
//const rootquery = new gplobjtype({ name,  //field:{},{}})


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author:{
            type:AuthorType,
            resolve(parent, args){
                //return _.find(authors, {id: parent.authorId})
                return Author.findById(parent.authorId)
            }
        }
    })
});


const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: ()=>({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return Book.find({authorId: parent.id})
                //return _.filter(books, {authorId: parent.id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // const b = books.find((book) =>{
                //     if (book.id === args.id)
                //         return true

                // })
                // return b
                return Book.findById(args.id)

               // return _.find(books, { id: args.id })
            }
        },
        author:{
            type: AuthorType,
            args:{ id : {type: GraphQLID}},
            resolve(parent,args){
               // return _.find(authors,{id: args.id})
               return Author.findById(args.id)
            }
        },
        Books:{
            type: new GraphQLList(BookType),
            resolve(parent, args){
               // return books
               return Book.find({})
            }
        },
        Authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                //return authors
                return Author.find({})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields:{
        addAuthor:{
            type: AuthorType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parents,args){
                let first = new Author({
                    name: args.name,
                    age: args.age
                })
                return first.save()
            }
        },
        addBook:{
            type: BookType,
            args:{
                name:{ type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                })
                return book.save()
            }

        }
    }
})
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
