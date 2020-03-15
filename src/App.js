import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

//import logo from './logo.svg';
import './App.css';

import Header from './components/layouts/Header';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';
import About from './components/pages/About';


function App() {
  return (

    <Router>

      <div className="App">
      <Header />
      <Route path = "/signup" component = {Signup} />
      <Route path = "/login" component = {Login} />
      <Route path = "/about" component = {About} />
      </div>

    </Router>

  );
}

export default App;
