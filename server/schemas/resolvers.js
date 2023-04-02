const { AuthenticationError } = require('apollo-server-express');
const { User, TeeTime, Queue } = require('../models');
const { signToken } = require('../utils/auth');
const scrape = require('../scrapper');
const { format_hours, get_course_name, get_course_link, format_text } = require('../utils/helpers');

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
        readQueue: async () => {
            return Queue.find({})
                .select('-__v')
                .populate({
                    path: 'tee_time_id',
                    populate: {
                        path: 'user',
                        model: 'User'
                    }
                })
        },
        // Method used for dev purposes only - not needed in prod
        getAllTeeTimes: async () => {
            const result = await TeeTime.find({})
                .select('-__v')
                .populate('user')

            return result
        },
        getTeeTimesByUser: async (parent, { userId }) => {
            const result = await TeeTime.find({
                user: userId,
                start_time: {
                    $gt: new Date()
                }
            })
                .select('-__v')
                .populate('user')

            return result
        },
        getTeeTimeById: async (parent, { _id }) => {
            return TeeTime.findOne({ _id: _id })
                .select('-__v')
        },
        getWatchlist: async () => {
            const result = await TeeTime.find({
                start_time: {
                    $gt: new Date()
                },
                msg_count: {
                    $lt: 3
                },
            }).select('-__v')


            let resultArr = result.map(({ _id }) => _id)

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
                    let course_name = get_course_name(course)
                    let course_link = get_course_link(date, course, number_of_players)
                    teetimes.push(format_text(formatted_date, course_name, course_link))
                }
            })

            return { user, teeTime, teetimes }
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
            const teeTime = await TeeTime.create(input);


            return teeTime;
        },
        duplicateTeeTime: async (parent, { _id }) => {
            const teeTime = await TeeTime.findOne({ _id });
            const duplicatedTeeTime = await TeeTime.create({
                "course_id": teeTime.course_id,
                "start_time": teeTime.start_time,
                "end_time": teeTime.end_time,
                "number_of_players": teeTime.number_of_players,
                "user": teeTime.user,
            });

            return duplicatedTeeTime;
        },
        editTeeTime: async (parent, { input }) => {
            const updatedTeeTime = await TeeTime.findOneAndUpdate(
                { _id: input._id },
                input,
                { new: true, runValidators: true }
            );

            return updatedTeeTime;
        },
        deleteTeeTime: async (parent, { _id }) => {
            const teeTime = await TeeTime.findOneAndDelete({ _id })

            return teeTime;
        },
        deleteAllTeeTimes: async (parent) => {
            const teeTime = await TeeTime.deleteMany()

            return 'All Tee Times Deleted';
        },
    }
};

module.exports = resolvers;
