const { Schema, model } = require('mongoose');

const teeTimeSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        course_id: {
            type: Number
        },
        date: {
            type: Date
        },
        start_time: {
            type: Number
        },
        end_time: {
            type: Number
        },
        number_of_players: {
            type: Array
        },
        expiration: {
            type: Date
        }
    }
);


const TeeTime = model('TeeTime', teeTimeSchema);

module.exports = TeeTime;