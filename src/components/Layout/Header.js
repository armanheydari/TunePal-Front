import React from 'react';
import AppLogo from '../../assets/app-logo.png';

const Header = (props) => {
    return (
        <header className="Header_container">
            <div className="Header-app-info-container">
                <img className="Header_logo" alt="app-logo-img" src={AppLogo}></img>
                <div>
                    <h1 className="Header_title">TunePal</h1>
                    <h2 className="Header_subtitle">Music + Dating</h2>
                </div>
            </div>
            <p className="Header_name">{props.name}</p>
        </header>
    );
}

export default Header;