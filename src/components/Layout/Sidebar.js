import React from 'react';
import Axios from 'axios';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart, faAddressCard, faUserCog, faPowerOff, faComments, faQuestion } from '@fortawesome/free-solid-svg-icons';

const tokenConfig = () => {
    return {
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
    }
}

class Sidebar extends React.Component {
    render() {
        return (
            <div className="Sidebar">
                <NavLink exact to="/" activeClassName="Sidebar_active" className="Sidebar_item">
                    <FontAwesomeIcon icon={faHome} />
                    <span className="Sidebar_item-name">Home</span>
                </NavLink> 
                <NavLink to="/match" activeClassName="Sidebar_active" className="Sidebar_item">
                    <FontAwesomeIcon icon={faHeart} />
                    <span className="Sidebar_item-name">Match</span>
                </NavLink> 
                <NavLink to="/chat" activeClassName="Sidebar_active" className="Sidebar_item">
                    <FontAwesomeIcon icon={faComments} />
                    <span className="Sidebar_item-name">Chat</span>
                </NavLink> 
                <NavLink to={`/profile/${this.props.username}`} activeClassName="Sidebar_active" className="Sidebar_item">
                    <FontAwesomeIcon icon={faAddressCard} />
                    <span className="Sidebar_item-name">Profile</span>
                </NavLink> 
                <NavLink to="/setting" activeClassName="Sidebar_active" className="Sidebar_item">
                    <FontAwesomeIcon icon={faUserCog} />
                    <span className="Sidebar_item-name">Setting</span>
                </NavLink>
                <NavLink to="/quiz" activeClassName="Sidebar_active" className="Sidebar_item">
                    <FontAwesomeIcon icon={faQuestion} />
                    <span className="Sidebar_item-name">Quiz</span>
                </NavLink>
                <div className="Sidebar_item" onClick={this.logout}>
                    <FontAwesomeIcon icon={faPowerOff} />
                    <span className="Sidebar_item-name">Logout</span>
                </div>
            </div>
        );
    }

    logout = () => {
        Axios.get('http://tunepal.pythonanywhere.com/account/logout/', tokenConfig())
        .then(res => {
            localStorage.clear();
            window.location.reload(false);
        });
    }
}

export default Sidebar;