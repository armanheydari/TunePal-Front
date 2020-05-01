import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import 'semantic-ui-css/semantic.min.css';
import 'antd/dist/antd.css';
import './style-container.scss';
 import Main from './components/Main.js';
import * as serviceWorker from "./serviceWorker";
import LandingPage from './components/LandingPage/LandingPage.js';

ReactDOM.render(<Main />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
