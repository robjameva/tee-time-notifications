const { AuthenticationError } = require('apollo-server-express');
const { User, TeeTime } = require('../models');
const { signToken } = require('../utils/auth');
const scrape = require('../scrapper');
const { format_hours } = require('../utils/helpers');

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

            return result
        },
        getWatchlist: async () => {
            const result = await TeeTime.find({})
                .select('-__v')

            let today = new Date().toJSON();

            let fiteredResults = result.filter(event => event.start_time.toJSON() > today)

            let resultArr = fiteredResults.map(({ _id }) => _id)

            return resultArr
        },
        checkAvailability: async (parent, { _id }) => {
            const teeTime = await TeeTime.findOne({ _id })
                .select('-__v')
                .populate('user')


            const course = teeTime.course_id;
            const number_of_players = teeTime.number_of_players.join();
            const date = teeTime.start_time.toJSON().split('T')[0];
            const start = teeTime.start_time;
            const end = teeTime.end_time;
            const user = teeTime.user;

            const teeTimesAvailable = await scrape(date, course, number_of_players)

            const teetimes = [];


            // console.log('Following Tee Times are adjusted - 4 hours: ');
            // console.log('teeTimesAvailable: ', teeTimesAvailable);
            // console.log('Checking for tee times...');
            // console.log('=========================');
            teeTimesAvailable.forEach((time, index) => {
                if (time >= start && time <= end) {
                    // time.setHours(time.getHours() + 4);
                    let split = time.toString().split(' ');
                    let timeSplit = split[4].split(':')
                    let formatted_time = format_hours(timeSplit[0], timeSplit[1])
                    let formatted_date = `${split[0]} ${split[1]} ${split[2]} at ${formatted_time}`
                    teetimes.push(`✅ ${formatted_date} is available`)
                }
            })

            return { user, teetimes }
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
