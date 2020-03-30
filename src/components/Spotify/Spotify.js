import React from 'react';
import axios from 'axios';

const config = {
    headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
}

class Spotify extends React.Component {
    state = {

    }

    onClick = () => {
        console.log(localStorage.getItem('token'));
        axios.get('http://tunepal.pythonanywhere.com/spotify/auth/', config)
        .then(res => {

            window.open(res.data.spotifyurl, '_blank');
            console.log(res);
        })
    }

    render() {
        return (
            <button onClick={this.onClick}>Link To Spotify</button>
        );
    }
}

export default Spotify;