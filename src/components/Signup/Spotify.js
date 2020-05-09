import React from 'react';
import Axios from 'axios';
import Logo from '../../assets/app-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { Button } from 'antd';
import tokenConfig from '../../utils/tokenConfig';

class Spotify extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="Location-Spotify">
                    <div className="icons">
                        <img src={Logo} alt="" className="icon logo" />
                        <FontAwesomeIcon icon={faPlus} className="icon plus" />
                        <FontAwesomeIcon icon={faSpotify} className="icon spotify" />
                    </div>
                    <p>For finding people with similar music taste to you we need your spotify data.</p>
                    <Button
                            className="connect-btn"
                            onClick={this.onClick}
                            icon={<FontAwesomeIcon icon={faSpotify} className="spotify" />}
                    >
                        Connect to Spotify!
                    </ Button>
                </div>
                <div className="Pagination">
                    <button
                        onClick={this.backClick}
                        className="ui labeled icon button link"
                    >
                        Back
                        <i className="left arrow icon"></i>
                    </button>

                    <button
                        onClick={this.nextClick}
                        className="ui right labeled icon button link"
                    >
                        <i className="right arrow icon"></i>
                        Next
                    </button>
                </div>
            </React.Fragment>
        );
    }

    onClick = () => {
        Axios.get('http://tunepal.pythonanywhere.com/spotify/auth/', tokenConfig())
        .then(res => {
            window.open(res.data.spotifyurl, '_blank', "width=600,height=600");
        });
    }

    backClick = () => {
        this.props.updateStage('location');
    }

    nextClick = () => {
        window.location.reload(true);
    }
}

export default Spotify;