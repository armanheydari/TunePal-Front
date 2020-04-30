import React from 'react';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { Button } from 'antd';

const tokenConfig = () => {
    return {
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
    }
}

class Spotify extends React.Component {
    render() {
        return (
            <div className="Setting_section">
                <div className="Setting_section-title">Spotify</div>
                <div className="Setting_form-spotify">
                    <div>
                        <p>You can connect another Spotify account to TunePal.</p>
                        <p>You just need to click below.</p>
                    </div>
                    <Button
                        type="primary"
                        icon={<FontAwesomeIcon icon={faSpotify} className="Setting_spotify-btn" />}
                        style={{marginTop: "1rem"}}
                        onClick={this.onClick}
                    >
                        Renew your Spotify token.
                    </Button>
                </div>
                
            </div>
        );
    }

    onClick = () => {
        Axios.get('http://tunepal.pythonanywhere.com/spotify/auth/', tokenConfig())
        .then(res => {
            window.open(res.data.spotifyurl, '_blank', "width=600,height=600");
        })
        .catch(err => {
            //if the user wasn't able to connect to sptify
        });
    }
}

export default Spotify;