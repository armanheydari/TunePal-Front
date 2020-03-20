import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

//import logo from './logo.svg';
import './App.css';


import Header from './components/layouts/Header';
// import Signup from './components/pages/Signup';
// import Login from './components/pages/Login';
import About from './components/pages/About';
import Login_Signup from './components/pages/Login_Signup'

// import Sidebar from './components/layouts/Sidebar';
import Home from './components/pages/Home';
import Chat from './components/pages/Chat';
import Match from './components/pages/Match';
import Quiz from './components/pages/Quiz';
import Profile from './components/pages/Profile';
import Setting from './components/pages/Setting';


function App() {
  return (
    <Router>

      <div className="App">
        <Header />
        {/* <Sidebar /> */}
      </div>

      {/* <Route path = "/signup" component = {Signup} /> */}
      <Route exact path="/" component={Login_Signup}/>
      <Route path="/about" component={About}/>

      <Route path="/home" component={Home}/>
      <Route path="/chat" component={Chat}/>
      <Route path="/match" component={Match}/>
      <Route path="/quiz" component={Quiz}/>
      <Route path="/profile" component={Profile}/>
      <Route path="/setting" component={Setting}/>

    </Router>
  );
}

export default App;
