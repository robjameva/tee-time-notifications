const checkAvailability = `query checkAvailability($id: ID!) {
    checkAvailability(_id: $id) {
        user {
            _id
            first_name
            last_name
            phone_number
            email
        }
        teeTime {
            _id
            course_id
            msg_count
            start_time
            end_time
            number_of_players
          }
        teetimes
    }
}`;

const getWatchlist = `query Query {
    getWatchlist
  }`;

module.exports = { checkAvailability, getWatchlist };