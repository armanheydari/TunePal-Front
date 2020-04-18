import React from 'react';
import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSpotify } from '@fortawesome/free-brands-svg-icons';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';
// import AppLogo from '../../assets/app-logo.png';
import SpotifyPhoto from '../../assets/Spotify.png';

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
            window.open(res.data.spotifyurl, '_self');
        })
        .catch(err => {
            //if the user wasn't able to connect to sptify
        });
    }

    render() {
        return (
            // <div>
            //     <img className="Location_logo" alt="app-logo-img" width="80px" height="80px" src={AppLogo}></img>
            //     <div className="Location_plus">
            //         <FontAwesomeIcon icon={faPlus} />
            //     </div>
            //     <div className="Location_marker">
            //         <FontAwesomeIcon className="Location_marker" icon={faSpotify} />
            //     </div>
            // </div>
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


{/* <img className="Location_logo" alt="app-logo-img" width="80px" height="80px" src={AppLogo}></img>
<div className="Location_plus">
    <FontAwesomeIcon icon={faPlus} />
</div>
<div className="Location_marker">
    <FontAwesomeIcon icon={faMapMarkerAlt} />
</div> */}


 {/* <p>{this.props.name}</p>
<button onClick={this.onClick}>Link To Spotify</button> */}