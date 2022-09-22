import React, { useState } from 'react';
import { setContext } from '@apollo/client/link/context';
import auth from './utils/auth'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BottomNav from './components/BottomNav'
import HeaderBar from './components/HeaderBar'
import AddTeeTime from './pages/AddTeeTime';
import TeeTimes from './pages/TeeTimes';
import Account from './pages/Account';
import Home from './pages/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const isLoggedIn = auth.loggedIn();
  const profile = isLoggedIn ? auth.getProfile() : null;
  const name = profile ? profile.data.first_name : 'To Tee Times';
  console.log(profile)

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <HeaderBar username={name} />
          <div>
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path="/create-tee-time"
                element={<AddTeeTime />}
              />
              <Route
                path="/tee-times"
                element={<TeeTimes />}
              />
              <Route
                path="/account"
                element={<Account />}
              />
              <Route
                path="/sign-in"
                element={<SignIn />}
              />
              <Route
                path="/sign-up"
                element={<SignUp />}
              />
            </Routes>
          </div>
          <header className="App-header">
            <BottomNav />
          </header>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
