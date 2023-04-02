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
    const teetimes = result.checkAvailability.teetimes;

    console.log(result);

    if (teetimes.length) {
      const phoneNum = result.checkAvailability.user.phone_number;
      const message = `${teetimes.join()}`;
      client.messages.create({ body: message, from: '+19734345791', to: `+1${phoneNum}` }).then(message => console.log(message));

      // Increase msg_count by 1
      let count = result.checkAvailability.teeTime.msg_count + 1;
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



