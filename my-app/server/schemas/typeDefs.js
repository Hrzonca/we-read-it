const { gql } = require("apolloe-server-express");

const typeDefs = gql`
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