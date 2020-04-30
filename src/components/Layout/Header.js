import React from 'react';
import AppLogo from '../../assets/app-logo.png';

const makeSidebarOn = () => {
    const sidebarOverlay = document.getElementById("SidebarOverlay");
    sidebarOverlay.style.display = "block";
    const headerToggler = document.getElementById("Header_toggle");
    headerToggler.style.display = "none";
}

class Header extends React.Component {
    render() {
        return (
            <header className="Header">
                <div id="Header_toggle" className="Header_toggle" onClick={makeSidebarOn}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className="Header_logo">
                    <img className="Header_logo-img" alt="" src={AppLogo} />
                    <div>
                        <h1 className="Header_title">TunePal</h1>
                        <h2 className="Header_subtitle">Music + Dating</h2>
                    </div>
                </div>
                <p className="Header_name">{this.props.username}</p>
            </header>
        );
    }
}

export default Header;