import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginSignup from './components/LoginSignup/LoginSignup.js';
import Match from './components/Match/Match.js';
import Profile from './components/Profile/Profile.js';

function App() {
  return (
    <Router>

      <div className="App">
        <Route exact path="/" component={LoginSignup}/>
        <Route path="/match" component={Match}/>
        <Route path="/profile" component={Profile}/>
      </div>

    </Router>
  );
}

export default App;
