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
        msg_count: {
            type: Number,
            default: 0
        },
        start_time: {
            type: Date
        },
        end_time: {
            type: Date
        },
        number_of_players: {
            type: Array
        }
    }
);


const TeeTime = model('TeeTime', teeTimeSchema);

module.exports = TeeTime;