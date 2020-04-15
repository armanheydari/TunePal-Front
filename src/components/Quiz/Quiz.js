import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

class Quiz extends React.Component {
    state = {};
    render() {
        return (
            <div style={{ backgroundColor: 'white' }}>
                <ReactCSSTransitionGroup transitionName="example"
                    transitionAppear={true} transitionAppearTimeout={500}
                    transitionEnter={false} transitionLeave={true}>
                    <h1>this is quiz page</h1>
                    <button class="semantic-ui small-green-button">
                        <i class="download icon"></i>
                        Download
                    </button>
                </ReactCSSTransitionGroup>
            </div>
        );
    };
}
export default Quiz;