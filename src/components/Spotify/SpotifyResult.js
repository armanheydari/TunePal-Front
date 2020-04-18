import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
                <div>
                    <p>{this.props.name}</p>
                    <p>TunePal + Spotify = Done</p>
                    <Link to="/">Continue to Homepage.</Link>
                </div>
            );
        }
        return (
            <div>
                <p>{this.props.name}</p>
                <p>There was a problem connecting your Spotify account to TunePal.</p>
                <p>You can connect it any time in Setting.</p>
                <Link to="/">Continue to Homepage.</Link>
            </div>
        );
    }
}

export default SpotifyResult;