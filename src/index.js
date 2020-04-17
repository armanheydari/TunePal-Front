import React from 'react';
import ReactDOM from 'react-dom';
//import semantic from 'semantic';
//import { DatePicker, message } from 'antd';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'normalize.css';
import './style-container.css';
import Main from './components/Main.js';
//import Quiz from './components/Quiz/Quiz.js';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Main />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
