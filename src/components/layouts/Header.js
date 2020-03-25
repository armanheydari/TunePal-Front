import React from './node_modules/react';
import {Link} from './node_modules/react-router-dom';
// import Signup from '../pages/Signup';
// import Login from '../pages/Login';
// import About from '../pages/About';


import '../../style/Header.css';


function Header() {

    return (
        <React.Fragment>
            <header>
                <h1>TunePal</h1>
                <p>Description!</p>
                <Link style={linkStyle} to = "/">Home</Link> | <Link style={linkStyle} to = "/about">About</Link>
            </header>
        </React.Fragment>

    )
}

// const headerStyle = {
//     backgroundColor: '#481380',
//     color: '#ffe2ff',
//     textAlign: 'center',
//     padding: '10px',
// }

const linkStyle = {
    color: '#efb1ff',
    textDecoration: 'none'
}



export default Header;