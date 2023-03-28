require('dotenv').config();
const { request } = require('graphql-request')
const cron = require('node-cron');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);
const endpoint = process.env.NODE_ENV === 'production' ? 'https://tee-time-alerts.herokuapp.com/graphql' : 'http://localhost:3001/graphql';

const getWatchList = async () => {
  const query = `query Query {
        getWatchlist
      }`;

  return await request(endpoint, query)
}

// Run GraphQL queries/mutations using a static function
let task = async () => {
  const watchList = await getWatchList()

  const query = `query checkAvailability($id: ID!) {
        checkAvailability(_id: $id) {
            user {
            _id
            first_name
            last_name
            phone_number
            email
            }
            teetimes
        }
    }`;

  const itmeQuery = `query checkAvailability($id: ID!) {
        checkAvailability(_id: $id) {
            user {
            _id
            first_name
            last_name
            phone_number
            email
            }
            teetimes
        }
    }`;

  const ids = watchList.getWatchlist;
  const idCount = ids.length
  let item;
  if (idCount > 0) {
    item = await request(endpoint, itmeQuery, { "id": ids[0] });
  }

  for (let i = 0; i < idCount; i++) {
    const result = await request(endpoint, query, { "id": ids[i] });
    console.log('results : ', result);

    if (result.checkAvailability.teetimes.length > 0) {
      let phoneNum = result.checkAvailability.user.phone_number;
      client.messages.create({
        body:
          `${result.checkAvailability.teetimes.join()}`,
        from: '+19734345791',
        to: `+1${phoneNum}`
      }).then(message => console.log(message))
        .done();
    }
  }
};

task();



