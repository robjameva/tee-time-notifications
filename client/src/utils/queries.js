import { gql } from '@apollo/client';

export const QUERY_WATCHLIST_BY_USER = gql`
	query GetReservationsByUser($userId: ID!) {
		getReservationsByUser(userID: $userId) {
			_id
			party_size
			time_slot
			user {
				_id
				first_name
				last_name
				phone_number
				email
			}
			restaurant {
				_id
				business_name
				business_address
				business_phone
				business_website
				business_image
			}
		}
	}
`;

export const QUERY_RESERVATION_BY_OWNER = gql`
query GetReservationsByOwner($ownerId: ID!) {
	getReservationsByOwner(ownerID: $ownerId) {
	  _id
	  party_size
	  time_slot
	  user {
		_id
		first_name
		last_name
	  }
	  restaurant {
		_id
		business_name
		owner {
		  _id
		}
	  }
	}
  }
`;

export const GET_TEE_TIMES_BY_USER = gql`
	query GetTeeTimesByUser($userId: ID!) {
		getTeeTimesByUser(userId: $userId) {
		_id
		user {
			_id
			first_name
			last_name
			phone_number
			email
		}
		course_id
		start_time
		end_time
		number_of_players
		}
	}
`;

