import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';
import BottmNav from './components/BottomNav'
import AddTeeTime from './pages/AddTeeTime';
import TeeTimes from './pages/TeeTimes';
import Account from './pages/Account';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Router>
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
          <BottmNav />
        </header>
      </Router>
    </div>
  );
}

export default App;
