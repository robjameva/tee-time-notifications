const { AuthenticationError } = require('apollo-server-express');
const { User, TeeTime } = require('../models');
const { signToken } = require('../utils/auth');
// const { group_assets, extract_coin_data, currency_formatter } = require('../utils/helpers');

const resolvers = {
    Query: {
        // Returns user information based on provided user ID
        getUser: async (parent, { userId }) => {
            return User.findOne({ _id: userId })
                .select('-__v')
        },
        // Method used for dev purposes only - not needed in prod
        getAllUsers: async () => {
            return User.find({})
                .select('-__v')
        },
        // Method used for dev purposes only - not needed in prod
        getAllTeeTimes: async () => {
            const result = await TeeTime.find({})
                .select('-__v')
                .populate('user')

            console.log(result)
            return result
        },
    },
    Mutation: {
        createUser: async (parent, { input }) => {
            const user = await User.create(input);
            const token = signToken(user);

            return { token, user };
        },
        deleteUser: async (parent, { _id }) => {
            const user = await User.findOneAndDelete({ _id })

            return user;
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },
        createTeeTime: async (parent, { input }) => {
            const teeTime = await (await TeeTime.create(input)).populate('user');


            return teeTime;
        },
        deleteTeeTime: async (parent, { _id }) => {
            const teeTime = await TeeTime.findOneAndDelete({ _id })

            return teeTime;
        },
    }
};

module.exports = resolvers;
