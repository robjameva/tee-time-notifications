const { Schema, model } = require('mongoose');

const queueSchema = new Schema(
    {
        tee_time_id: {
            type: Schema.Types.ObjectId,
            ref: 'TeeTime'
        },
        status: {
            type: String
        },
        job_start: {
            type: Date
        },
        job_end: {
            type: Date
        }
    }
);


const Queue = model('Queue', queueSchema);

module.exports = Queue;