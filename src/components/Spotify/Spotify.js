import React from 'react';
import axios from 'axios';
import './styles/Spotify.css';

class Spotify extends React.Component {
    state = {
    }

    onClick = () => {
        const config = {
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        }
        axios.get('http://tunepal.pythonanywhere.com/spotify/auth/', config)
        .then(res => {
            console.log(res);
            window.open(res.data.spotifyurl, '_self');
        })
        .catch(err => {
            //if the user wasn't able to connect to sptify
        });
    }

    render() {
        return (
            <div>
                <p>{this.props.name}</p>
                <button onClick={this.onClick}>Link To Spotify</button>
            </div>
        );
    }
}

export default Spotify;