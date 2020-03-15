import React from 'react';
import {Link} from 'react-router-dom';

import '../../style/Header.css';


function Header() {

    return (
        <React.Fragment>
            <header>
                <h1>TunePal</h1>
                <p>Description!</p>
                <Link style={linkStyle} to = "/">Home</Link> | <Link style={linkStyle} to = "/signup">Signup</Link> | <Link style={linkStyle} to = "/login">Login</Link> | <Link style={linkStyle} to = "/about">About</Link>
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