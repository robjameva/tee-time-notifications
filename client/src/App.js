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
  );
}

export default App;
