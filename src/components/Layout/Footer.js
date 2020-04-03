import React from 'react';
import AppLogo from '../../assets/app-logo.png';

const Footer = () => {
    return (
        <footer className="Footer_container">
            <div className="Footer_app-container">
                <img className="Footer_logo" alt="app-logo-img" src={AppLogo}></img>
                <h3 className="Footer_app">TunePal</h3>
            </div>
            <div className="Footer_develop-team">
                <h3 className="Footer_title">Development Team</h3>
                <p>Masoud</p>
                <p>Arman</p>
                <p>Reza</p>
                <p>Saba</p>
                <p>Ali</p>
            </div>
            <div className="Footer_po">
                <h3 className="Footer_title">Product Owner</h3>
                <p>Mobina</p>
            </div>
            <div className="Footer_scrum">
                <h3 className="Footer_title">Scrum Master</h3>
                <p>Abbas</p>
            </div>
        </footer>
    );
}

export default Footer;