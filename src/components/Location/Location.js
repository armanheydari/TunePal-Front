import React from 'react';
import axios from 'axios';
import Spotify from './Spotify.js';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMapMarkerAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
// import AppLogo from '../../assets/app-logo.png';
import LocationPhoto from '../../assets/Location.jpg';


const getAddressConfig = {
    mode: "cors",
    headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjdmYzVjNmRlMTY4ZDZiNzdiNWMxMmE2MjEwODEyMjEyNmQ3MzI5YWE1YzFlMDQ4YWNhZTRlN2U2M2Y1NWUzYWYxOTk1YTUzMDNiYjJjY2I5In0.eyJhdWQiOiI4Mzg4IiwianRpIjoiN2ZjNWM2ZGUxNjhkNmI3N2I1YzEyYTYyMTA4MTIyMTI2ZDczMjlhYTVjMWUwNDhhY2FlNGU3ZTYzZjU1ZTNhZjE5OTVhNTMwM2JiMmNjYjkiLCJpYXQiOjE1ODQ5NzQzOTMsIm5iZiI6MTU4NDk3NDM5MywiZXhwIjoxNTg3NTY2MzkzLCJzdWIiOiIiLCJzY29wZXMiOlsiYmFzaWMiXX0.GUpfC8cQ1bWyTcVhz1lW8lR5rWll2wAOSmjxY5sTyEn2iHSsPWMhMMcsbNDTlV_Iz3HctjaAJFny3YdCdFMMSsWshe-gx8CHRQKkjGqgJRs691uPGVeLSOPe4iJjbD0_dkWRUGIiP5NrRyb0ZvJoZUDuNK39l5JGo699LCL66xIUrSlMR4tAD8RCv2bnmES6I_5jtMSRciaM9rN9orcrsy8BRZeit7MJvwuNlFtDZq-sVIHQH9fzRWX3bKeOqcU1LXJh1YtuZnBXA-kdDrHXCRDbGoUV8NexTGEH_Jrtol-CXsLOTniwX3V6YqB3ZtZi-hgdPEJ8lYtwGqY3nTKNng'
    }
};

class Location extends React.Component {
    state = {
        latitude: '',
        longitude: '',
        country: '',
        province: '',
        neighbourhood: '',
        message: '',
        showMessage: false,
        readyToPost: false,
        gotoSpotify: false
    }

    getLocation = (e) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.position);
        }
        else {
            this.setState(() => {
                return {
                    message: "Oops! Look like your browser does not support location",
                    showMessage: true
                }
            });
        }
    }

    position = (point) => {
        this.setState(() => {
            return {
                latitude: point.coords.latitude,
                longitude: point.coords.longitude
            }
        });
        if ((this.state.latitude !== "") && (this.state.longitude !== "")) {
            const url = `https://map.ir/reverse/no?lat=${this.state.latitude}&lon=${this.state.longitude}`;
            axios.get(url, getAddressConfig)
            .then(res => {
                this.setState(() => {
                    return {
                        country: res.data.country,
                        province: res.data.province,
                        neighbourhood: res.data.neighbourhood,
                        message: `${res.data.country} , ${res.data.province} , ${res.data.neighbourhood}`,
                        showMessage: true,
                        readyToPost: true
                    }
                });
            })
            .catch(err => {
                this.setState(() => {
                    return {
                        message: "We've got your coordinate but there was a problem in getting your address.",
                        showMessage: true
                    }
                });
            });
        }
        else {
            this.setState(() => {
                return {
                    message: "Oops! There was a problem in getting your coordinate.",
                    showMessage: true
                }
            });
        }
    }

    onSubmitNext = () => {
        if (this.state.readyToPost) {
            const location = {
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                country: this.state.country,
                province: this.state.province,
                neighbourhood: this.state.neighbourhood
            }
            const jsonLocation = JSON.stringify(location);
            const sendLocationConfig = {
                mode: "cors",
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
                }
            };
            axios.post('http://tunepal.pythonanywhere.com/account/get_location/', jsonLocation, sendLocationConfig)
            .then(res => {
                this.setState(() => {
                    return {
                        gotoSpotify: true
                    }
                });
            })
            .catch(err => {
                console.log(err);
                //handle if there was error in sending location to back
            });
        }
    }

    render() {
        if (this.state.gotoSpotify) {
            return <Spotify name={this.props.name} />
        }
        return (
            <div className="Location_container">
                <div className="Location_title">Location</div>
                {/* <img className="Location_logo" alt="app-logo-img" width="80px" height="80px" src={AppLogo}></img>
                <div className="Location_plus">
                    <FontAwesomeIcon icon={faPlus} />
                </div>
                <div className="Location_marker">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                </div> */}

                <img alt="app-logo-img" src={LocationPhoto}></img>
                <div className="Location_greeting">{`Hi ${this.props.name}.`}</div>
                <div className="Location_description">
                    For finding people near you we need your location. <br/>
                    You can set/hide it from other users in Setting.
                </div>
                <button className="Location_button" onClick={this.getLocation}><span>Find Me </span></button>
                <div>{this.state.showMessage && this.state.message}</div>
                <button className="Location_button" disabled={!this.state.showMessage} style={{display: this.state.showMessage ? "inline-block" : "none"}} onClick={this.onSubmitNext}><span>Next </span></button>
            </div>
        );
    }
}

export default Location;