import React from 'react';
import { Link } from 'react-router-dom';
import './styles/w3.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart, faAddressCard, faUserCog, faPowerOff } from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
    return (   
        <div className="Sidebar_container w3-sidebar w3-bar-block w3-black w3-xxlarge">
            <Link to="/" className="w3-bar-item w3-button"><FontAwesomeIcon icon={faHome} /></Link> 
            <Link to="/match" className="w3-bar-item w3-button"><FontAwesomeIcon icon={faHeart} /></Link> 
            <Link to="/profile" className="w3-bar-item w3-button"><FontAwesomeIcon icon={faAddressCard} /></Link> 
            <Link to="/setting" className="w3-bar-item w3-button"><FontAwesomeIcon icon={faUserCog} /></Link>
            <Link to="/logout" className="w3-bar-item w3-button"><FontAwesomeIcon icon={faPowerOff} /></Link> 
        </div>
        
    );
}

export default Sidebar;