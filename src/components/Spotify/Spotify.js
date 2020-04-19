import React from 'react';
import axios from 'axios';
import SpotifyPhoto from '../../assets/Spotify.png';

class Spotify extends React.Component {

    onClick = () => {
        const config = {
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        }
        axios.get('http://tunepal.pythonanywhere.com/spotify/auth/', config)
        .then(res => {
            window.open(res.data.spotifyurl, '_self');
        })
        .catch(err => {
            //if the user wasn't able to connect to sptify
        });
    }

    render() {
        return (
            <div className="Spotify_container">
                <div className="Spotify_title">Spotify</div>
                <img alt="app-logo-img" src={SpotifyPhoto}></img>
                <div className="Spotify_greeting">{`Finally ${this.props.name}.`}</div>
                <div className="Spotify_description">
                    For matching we need your most played songs.<br/>
                    We will sugest you people with same music taste. 
                </div>
                <button className="Spotify_button" onClick={this.onClick}><span>Link To Spotify </span></button>
            </div>
        );
    }
}

export default Spotify;