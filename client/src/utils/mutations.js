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

export const CREATE_TEETIME = gql`
	mutation CreateTeeTime($input: TeeTimeInput) {
		createTeeTime(input: $input) {
		_id
		user {
			first_name
		}
		start_time
		end_time
		number_of_players
		course_id
		priority
		}
	}
`;
export const DUPLICATE_TEETIME = gql`
	mutation DuplicateTeeTime($id: ID!) {
		duplicateTeeTime(_id: $id) {
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

export const DELETE_TEETIME = gql`
	mutation DeleteTeeTime($id: ID!) {
		deleteTeeTime(_id: $id) {
		_id
		course_id
		start_time
		end_time
		number_of_players
		}
	}
`;


