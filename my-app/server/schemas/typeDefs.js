const { gql } = require("apollo-server-express");

const typeDefs = gql`

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User
    removeBook(bookId: ID!): User
}

type Query {
    me: User
}

type User {
    _id: ID!
    username: Stirng!
    email: string
    bookCount: int
    savedBooks: [Book]
}

type Book {
    bookId: ID!
    authors: [Stirng]
    descripton: string
    title: string
    image: string
    link: string
}

type Auth {
    token: ID!
    user: User
}`

module.exports = typeDefs;