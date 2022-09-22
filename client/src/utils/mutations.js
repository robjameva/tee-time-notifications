import { gql } from '@apollo/client';

export const CREATE_USER = gql`
    mutation CreateUser($input: UserInput) {
        createUser(input: $input) {
        token
        user {
            _id
            first_name
            last_name
            phone_number
            email
        }
        }
    }
`;

export const LOGIN_USER = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
        token
        user {
            _id
            first_name
            last_name
            phone_number
            email
        }
        }
    }
`;

export const MAKE_RESERVATION = gql`
	mutation Mutation($input: ReservationCreateInput) {
		createReservation(input: $input) {
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

export const EDIT_RESERVATION = gql`
mutation Mutation($input: ReservationUpdateInput) {
	updateReservation(input: $input) {
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

export const DELETE_RESERVATION = gql`
	mutation Mutation($id: ID!) {
		deleteReservation(_id: $id) {
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

export const DELETE_RESTAURANT = gql`
	mutation DeleteRestaurant($id: ID!) {
		deleteRestaurant(_id: $id) {
			_id
		}
	}
`;

export const CREATE_RESTAURANT = gql`
mutation CreateRestaurant($input: RestaurantInput) {
	createRestaurant(input: $input) {
	  _id
	}
  }
`;

export const EDIT_USER = gql`
	mutation UpdateUser($input: UserUpdateInput) {
		updateUser(input: $input) {
			_id
			first_name
			last_name
			phone_number
			email
			isOwner
		}
	}
`;
