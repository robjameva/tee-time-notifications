const editTeeTime = `mutation EditTeeTime($input: editTeeTimeInput) {
    editTeeTime(input: $input) {
      _id
      user {
        _id
        first_name
        last_name
        phone_number
        email
      }
      course_id
      msg_count
      start_time
      end_time
      number_of_players
    }
  }`;


module.exports = { editTeeTime, };