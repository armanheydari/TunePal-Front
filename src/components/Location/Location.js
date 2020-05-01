import React from 'react';
import axios from 'axios';
import Spotify from '../Spotify/Spotify.js';
import LocationPhoto from '../../assets/Location.jpg';

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
            const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${this.state.latitude}&lon=${this.state.longitude}`;
            axios.get(url)
            .then(res => {
                this.setState(() => {
                    return {
                        country: res.data.address.country,
                        province: res.data.address.city,
                        neighbourhood: res.data.address.suburb,
                        message: `${res.data.address.country} , ${res.data.address.city} , ${res.data.address.suburb}`,
                        showMessage: true,
                        readyToPost: true
                    };
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