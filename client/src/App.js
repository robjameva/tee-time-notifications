<<<<<<< HEAD
import BottmNav from './components/BottomNav'
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ResponsiveAppBar from './components/AppBar';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

function App() {
  return (
    <Router>
      <ResponsiveAppBar />
      <div className="App">
        <Switch>
          {/* <Route exact path="/" component={SignIn} /> */}
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />


        </Switch>
      </div>
      <BottmNav />
    </Router>
=======
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';
import BottomNav from './components/BottomNav'
import HeaderBar from './components/HeaderBar'
import AddTeeTime from './pages/AddTeeTime';
import TeeTimes from './pages/TeeTimes';
import Account from './pages/Account';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Router>
        {/* TODO: Mark username dynamic */}
        <HeaderBar username={'Mark'} />
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
          </Routes>
        </div>
        <header className="App-header">
          <BottomNav />
        </header>
      </Router>
    </div>
>>>>>>> develop
  );
}

export default App;
