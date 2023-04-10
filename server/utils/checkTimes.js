require('dotenv').config();
const { request } = require('graphql-request')
const cron = require('node-cron');
const { checkAvailability, getWatchlist } = require('./queries');
const { editTeeTime } = require('./mutations');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const endpoint = process.env.NODE_ENV === 'production' ? 'https://tee-time-alerts.herokuapp.com/graphql' : 'http://localhost:3001/graphql';


const task = async () => {
  const watchList = await request(endpoint, getWatchlist);
  const ids = watchList.getWatchlist;

  for (const id of ids) {
    const result = await request(endpoint, checkAvailability, { "id": id });
    let { smsMessage, user, teeTime } = result.checkAvailability;

    console.log(result);

    if (smsMessage.length) {
      const phoneNum = user.phone_number;
      smsMessage = teeTime.msg_count === 2 ? 'Warning this is the 3rd and final alert: This search is now inactive\n\n' + smsMessage : smsMessage;

      client.messages.create({ body: smsMessage, from: '+19734345791', to: `+1${phoneNum}` }).then(message => console.log(message));

      // Increase msg_count by 1
      let count = teeTime.msg_count + 1;
      await request(endpoint, editTeeTime, {
        "input": {
          "_id": id,
          "msg_count": count,
        }
      });
    }
  }
};

task();



