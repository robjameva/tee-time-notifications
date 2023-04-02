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
            }).sort('priority').lean()

            let resultArr = result.map(({ _id }) => _id)

            return resultArr
        },
        checkAvailability: async (parent, { _id }) => {
            const teeTime = await TeeTime.findOne({ _id })
                .select('-__v')
                .populate('user')

            const { course_id, number_of_players, start_time, end_time, user } = teeTime;
            const date = start_time.toJSON().split('T')[0];

            const teeTimesAvailable = await scrape(date, course_id, number_of_players)

            let smsMessage = teeTimesAvailable.filter(time => {
                return time >= start_time && time <= end_time;
            }).map(time => {
                let split = time.toString().split(' ');
                let timeSplit = split[4].split(':')
                let formatted_time = format_hours(timeSplit[0], timeSplit[1])
                let formatted_date = `${split[0]} ${split[1]} ${split[2]} at ${formatted_time}`
                let course_name = get_course_name(course_id)
                return format_text(formatted_date, course_name);
            }).join('\n\n');

            let course_link = get_course_link(date, course_id, number_of_players)
            smsMessage.length ? smsMessage += `\n\nBook your tee time here: ${course_link}` : smsMessage

            return { user, teeTime, smsMessage };
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
