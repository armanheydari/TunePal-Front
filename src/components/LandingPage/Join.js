import React from 'react';
import LoginSignup from '../LoginSignup/LoginSignup';
import MobileJoin from './MobileJoin';

const onClickDim = (e) => {
    if (e.target.id === "Join_overlay") {
        const joinOverlay = document.getElementById("Join_overlay");
        joinOverlay.style.display = "none";
    }
}

class Join extends React.Component {
    render() {
        return (
            <div id="Join_overlay" className="Join_overlay" onClick={onClickDim}>
                <div className="desktop">
                    <LoginSignup isOnAfterSignup={this.props.isOnAfterSignup} />
                </div>
                <div className="mobile">
                    <MobileJoin isOnAfterSignup={this.props.isOnAfterSignup} />
                </div>
            </div>
        );
    }
}

export default Join;