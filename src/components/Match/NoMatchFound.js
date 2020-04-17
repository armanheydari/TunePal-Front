import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartBroken } from '@fortawesome/free-solid-svg-icons';

class NoMatchFound extends React.Component {
    render() {
        return (
            <div className="Match_NoItem">
                <FontAwesomeIcon icon={faHeartBroken} className="Match_NoItem-icon" />
                <h1 className="Match_NoItem-title">Found Nothing We Have</h1>
                <p className="Match_NoItem-text">SORRY, WE COULDN'T FIND ANY PERSON SIMILAR TO YOU.</p>
            </div>
        );
    }
}

export default NoMatchFound;