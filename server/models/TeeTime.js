const { Schema, model } = require('mongoose');

const teeTimeSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        course_id: {
            type: Array
        },
        date: {
            type: Date
        },
        start_time: {
            type: Date
        },
        end_time: {
            type: Date
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