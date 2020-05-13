import React from 'react';
import LoginSignup from '../LoginSignup/LoginSignup';

const onClickDim = (e) => {
    if (e.target !== this) {
        return;
    }
    const joinOverlay = document.getElementById("Join_overlay");
    joinOverlay.style.display = "none";
}

class Join extends React.Component {
    render() {
        return (
            <div id="Join_overlay" className="Join_overlay" onClick={onClickDim}>
                <LoginSignup />
            </div>
        );
    }
}

export default Join;