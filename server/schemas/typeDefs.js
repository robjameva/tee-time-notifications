// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`

	type User {
		_id: ID
		first_name: String
		last_name: String
		phone_number: String
		email: String
	}

	type TeeTime {
		_id: ID
		user: User
		course_id: Int
		date: String
		start_time: Int
		end_time: Int
		number_of_players:[Int]
		expiration: String
	}

	input UserInput {
		first_name: String!
		last_name: String!
		phone_number: String!
		password: String!
		email: String!
	}

	input TeeTimeInput {
		user: ID
		course_id: Int
		date: String
		start_time: Int
		end_time: Int
		number_of_players:[Int]
		expiration: String
	}

	type Auth {
		token: ID!
		user: User
	}
	
	type Query {
		getUser(userId: ID!): User
		getAllUsers: [User]
		getAllTeeTimes: [TeeTime]
	}
  
	type Mutation {
		login(email: String!, password: String!): Auth
		createUser(input: UserInput): Auth
		deleteUser(_id: ID!): User
		createTeeTime(input: TeeTimeInput): TeeTime
		deleteTeeTime(_id: ID!): TeeTime
	}	
`;

module.exports = typeDefs;