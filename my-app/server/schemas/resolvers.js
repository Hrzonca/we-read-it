const { AuthenticationError } = require('apollo-server-express');
const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');

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
        login: async(parent, { email, password }) => {
            const user = await User.findOne({ email });
            
            if (!user) {
                throw new AuthenticationError("wrong email")
            }

            const correctPass = await user.isCorrectPass(password);

            if (!correctPass) {
                throw new AuthenticationError("Wrong password.")
            }

            const token = signToken(user);
            return { token, user };
        },
        addUser: async(parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        saveBook: async(parent, { bookData }, context) => {
            if (context.user) {
                const updateUserBooks = await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    {$push: {savedBooks: bookData}},
                    {new: true}
                );

                return updateUserBooks;
            }
            throw new AuthenticationError("Please login to save this book.")
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId } } },
                { new: true }
              );
      
              return updatedUser;
            }
      
            throw new AuthenticationError("You need to be logged in!");
          },
        },
    };

    module.exports = resolvers;
