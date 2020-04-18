import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';

class SpotifyResult extends React.Component {
    state = {
        show: false,
        succeed: false
    }
    componentDidMount() {
        const code = window.location.href.split("spotifyresult/")[1];
        const serverURL = `http://tunepal.pythonanywhere.com/spotify/get_url/${code}`;
        const config = {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
            }
        }
        axios.get(serverURL, config)
        .then(res => {
            console.log(res);
            this.setState(() => {
                return {
                    show: true,
                    succeed: true
                };
            });
        })
        .catch(err => {
            this.setState(() => {
                return {
                    show: true,
                };
            });
        });
    }
    render() {
        if (!this.state.show) {
            return null;
        }
        if (this.state.succeed) {
            return (
                <div className="SpotifyResult">
                    <FontAwesomeIcon icon={faSpotify}  className="SpotifyResult-icon-success" />
                    <h1>Hey {this.props.name},</h1>
                    <p className="SpotifyResult-text-success">Connected your <strong>Spotify</strong> account to <strong>TunePal</strong></p>
                </div>
            );
        }
        return (
            <div className="SpotifyResult">
            <FontAwesomeIcon icon={faSpotify}  className="SpotifyResult-icon-failed" />
            <h1>Hey {this.props.name},</h1>
            <p className="SpotifyResult-text-failed">Failed to connect your <strong>Spotify</strong> account to <strong>TunePal</strong></p>
        </div>
        );
    }
}

export default SpotifyResult;