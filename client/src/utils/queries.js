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

export const GET_ALL_RESTAURANTS = gql`
	query Query {
		getAllRestaurants {
			_id
			occupancy
			business_name
			business_address
			business_phone
			business_hours_open
			business_hours_close
			business_website
			business_image
		}
	}
`;

export const GET_RESTAURANTS_BY_OWNER = gql`
query Query($ownerID: ID!) {
	getRestaurantsByOwner(ownerID: $ownerID) {
	  _id
	  business_address
	  business_hours_close
	  business_hours_open
	  business_image
	  business_name
	  business_phone
	  business_website
	  occupancy
	}
  }
`;

export const GET_RESTAURANT_BY_ID = gql`
query Query($restaurantId: ID!) {
	getRestaurant(restaurantId: $restaurantId) {
	  restaurant {
		_id
		occupancy
		business_name
		business_address
		business_phone
		business_hours_open
		business_hours_close
		business_website
		business_image
	  }
	  hours
	}
  }
`;

export const GET_RESERVATION_BY_RESTAURANT = gql`
query GetReservationsByRestaurant($restaurantId: ID!) {
	getReservationsByRestaurant(restaurantID: $restaurantId) {
	  _id
	  party_size
	  time_slot
	  user {
		_id
	  }
	  restaurant {
		_id
	  }
	}
  }
`;

export const GET_USER_INFO = gql`
query Query($userId: ID!) {
	getUser(userId: $userId) {
	  _id
	  email
	  first_name
	  isOwner
	  last_name
	  phone_number
	}
  }
`;
