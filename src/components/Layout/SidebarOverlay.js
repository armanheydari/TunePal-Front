import React from 'react';
import Axios from 'axios';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faHome, faHeart, faAddressCard, faUserCog, faPowerOff, faComments, faQuestion, faUsers } from '@fortawesome/free-solid-svg-icons';
import tokenConfig from '../../utils/tokenConfig';
import serverURL from '../../utils/serverURL';

const makeSidebarOff = () => {
    const sidebarOverlay = document.getElementById("SidebarOverlay");
    sidebarOverlay.style.display = "none";
    const headerToggler = document.getElementById("Header_toggle");
    headerToggler.style.display = "flex";
}

class Sidebar extends React.Component {
    render() {
        return (
            <div id="SidebarOverlay" className="SidebarOverlay" onClick={makeSidebarOff}>
                <div className="SidebarOverlay_sidebar" id="SidebarOverlay_sidebar">
                    <FontAwesomeIcon icon={faArrowLeft} className="SidebarOverlay_close" />
                    <NavLink exact to="/" activeClassName="Sidebar_active" className="SidebarOverlay_item">
                        <FontAwesomeIcon icon={faHome} />
                        <span className="SidebarOverlay_item-name">Home</span>
                    </NavLink> 
                    <NavLink to="/match" activeClassName="Sidebar_active" className="SidebarOverlay_item">
                        <FontAwesomeIcon icon={faHeart} />
                        <span className="SidebarOverlay_item-name">Match</span>
                    </NavLink> 
                    <NavLink to="/chat" activeClassName="Sidebar_active" className="SidebarOverlay_item">
                        <FontAwesomeIcon icon={faComments} />
                        <span className="SidebarOverlay_item-name">Chat</span>
                    </NavLink>
                    <NavLink to="/Group" activeClassName="Sidebar_active" className="SidebarOverlay_item">
                        <FontAwesomeIcon icon={faUsers} />
                        <span className="SidebarOverlay_item-name">Group</span>
                    </NavLink>  
                    <NavLink to={`/profile/${this.props.username}`} activeClassName="Sidebar_active" className="SidebarOverlay_item">
                        <FontAwesomeIcon icon={faAddressCard} />
                        <span className="SidebarOverlay_item-name">Profile</span>
                    </NavLink> 
                    <NavLink to="/setting" activeClassName="Sidebar_active" className="SidebarOverlay_item">
                        <FontAwesomeIcon icon={faUserCog} />
                        <span className="SidebarOverlay_item-name">Setting</span>
                    </NavLink>
                    <NavLink to="/quiz" activeClassName="Sidebar_active" className="SidebarOverlay_item">
                        <FontAwesomeIcon icon={faQuestion} />
                        <span className="SidebarOverlay_item-name">Quiz</span>
                    </NavLink>
                    <div className="SidebarOverlay_item" onClick={this.logout}>
                        <FontAwesomeIcon icon={faPowerOff} />
                        <span className="SidebarOverlay_item-name">Logout</span>
                    </div>
                </div>
            </div>
        );
    }

    logout = () => {
        Axios.get(`${serverURL()}/account/logout/`, tokenConfig())
        .then(res => {
            localStorage.clear();
            window.location.reload(true);
        });
    }
}

export default Sidebar;