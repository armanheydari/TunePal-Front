import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart, faAddressCard, faUserCog, faPowerOff, faComments, faQuestion } from '@fortawesome/free-solid-svg-icons';
import ProfilePicture from '../../assets/maxresdefault.jpg';

function Sidebar(props) {
    return (   
        <div className="Sidebar_container w3-sidebar w3-bar-block w3-xxlarge">
            {/* <div className="w3-bar-item Sidebar_photo-container"><img className="Sidebar_photo" alt="profile-img" src={ProfilePicture}></img></div> */}
            <Link to="/" className="w3-bar-item w3-button Sidebar_item"><FontAwesomeIcon icon={faHome} /><span className="Sidebar_item-name">Home</span></Link> 
            <Link to="/match" className="w3-bar-item w3-button Sidebar_item"><FontAwesomeIcon icon={faHeart} /><span className="Sidebar_item-name">Match</span></Link> 
            <Link to="/chat" className="w3-bar-item w3-button Sidebar_item"><FontAwesomeIcon icon={faComments} /><span className="Sidebar_item-name">Chat</span></Link> 
            <Link to="/profile" className="w3-bar-item w3-button Sidebar_item"><FontAwesomeIcon icon={faAddressCard} /><span className="Sidebar_item-name">Profile</span></Link> 
            <Link to="/setting" className="w3-bar-item w3-button Sidebar_item"><FontAwesomeIcon icon={faUserCog} /><span className="Sidebar_item-name">Setting</span></Link>
            <Link to="/quiz" className="w3-bar-item w3-button Sidebar_item"><FontAwesomeIcon icon={faQuestion} /><span className="Sidebar_item-name">Quiz</span></Link>
            <button className="w3-bar-item w3-button Sidebar_item" onClick={props.logout}><FontAwesomeIcon icon={faPowerOff} /><span className="Sidebar_item-name">Logout</span></button>
        </div>
        
    );
}

export default Sidebar;