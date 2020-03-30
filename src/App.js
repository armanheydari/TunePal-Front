import React from 'react';
import './App.css';
import './components/Layout/styles/Layout.css';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Sidebar />
        <Route exact path="/" />
        <Route exact path="/match" />
        <Route exact path="/profile" />
        <Route exact path="/setting" />
        <Route exact path="/logout" />
      </div>
    </Router>

  );
}

export default App;
