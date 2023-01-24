const { Book, User } = require('../models');

const resolvers = {
    Query: {
        me: async() => {
            return User.find({})
        },
        //not sure about book section but following mini project and other activity
        book: async(parent, { _id }) => {
            const params = _id ? { _id } : {};
            return Book.find(params);
        },
    },
    Mutation: {
        //todo login, addUser, saveBook
    }
}