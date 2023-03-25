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

	type Queue {
		_id: ID
		tee_time_id: TeeTime
		status: String
		job_start: String
		job_end: String
	}

	type TeeTime {
		_id: ID
		user: User
		course_id: Int
		start_time: String
		end_time: String
		number_of_players:[Int]
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
		start_time: String
		end_time: String
		number_of_players:[Int]
	}
	
	input addItemToQueueInput {
		tee_time_id: ID
		status: String
		job_start: String
		job_end: String
	}

	type Auth {
		token: ID!
		user: User
	}

	type TeeTimeResponse {
		user: User
		teetimes: [String]
	}
	
	type Query {
		getUser(userId: ID!): User
		getAllUsers: [User]
		readQueue: [Queue]
		getAllTeeTimes: [TeeTime]
		getTeeTimesByUser(userId: ID!):[TeeTime]
		getWatchlist: [String]
		checkAvailability(_id: ID!): TeeTimeResponse
	}
  
	type Mutation {
		login(email: String!, password: String!): Auth
		createUser(input: UserInput): Auth
		deleteUser(_id: ID!): User
		createTeeTime(input: TeeTimeInput): TeeTime
		addItemToQueue(input: addItemToQueueInput): Queue
		duplicateTeeTime(_id: ID!): TeeTime
		deleteTeeTime(_id: ID!): TeeTime
		deleteAllTeeTimes: String
	}	
`;

module.exports = typeDefs;