import React from 'react';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPlus, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../assets/app-logo.png';
import { Button } from 'antd';
import { AimOutlined } from '@ant-design/icons';
import tokenConfig from '../../utils/tokenConfig';
import serverURL from '../../utils/serverURL';

class Location extends React.Component {
    state = {
        latitude: this.props.location ? this.props.location.latitude : "",
        longitude: this.props.location ? this.props.location.longitude : "",
        country: this.props.location ? this.props.location.country : "",
        province: this.props.location ? this.props.location.province : "",
        neighbourhood: this.props.location ? this.props.location.neighbourhood : "",
        isFinding: false,
        showErrorFindining: false,
        errorCoords: false,
        errorAddress: false,
    }

    render() {
        return (
            <React.Fragment>
                <div className="Location-Spotify">
                    <div className="icons">
                        <img src={Logo} alt="" className="icon logo" />
                        <FontAwesomeIcon icon={faPlus} className="icon plus" />
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="icon location" />
                    </div>
                    <p>For finding people near to you we need your location.</p>
                    <Button
                            className="find-btn"
                            icon={<AimOutlined />}
                            loading={this.state.isFinding}
                            onClick={this.getLocation}
                    >
                        Find Me!
                    </ Button>
                    
                    {
                        this.locationToString().trim(" ") &&
                        <div className="result">
                            <FontAwesomeIcon icon={faCheck} className="icon" />
                            {this.locationToString()}
                        </div>
                    }

                    {
                        (this.state.showErrorFindining && this.state.errorCoords) && (
                            <div className="result fail">
                                <FontAwesomeIcon icon={faTimes} className="icon" />
                                There was a problem getting your coordinates.
                            </div>
                        )
                    }

                    {
                        (this.state.showErrorFindining && this.state.errorAddress) && (
                            <div className="result fail">
                                <FontAwesomeIcon icon={faTimes} className="icon" />
                                There was a problem getting your address.
                            </div>
                        )
                    }
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

    locationToString = () => {
        const {country, province, neighbourhood} = this.state;
        return `${country} ${province} ${neighbourhood}`;
    }

    getLocation = () => {
        this.setState(prevState => {
            return {
                isFinding: true,
                showErrorFindining: false,
                errorCoords: false,
                errorAddress: false,
                showSubmitMessage: false,
                latitude: "",
                longitude: "",
                country: "",
                province: "",
                neighbourhood: "",
            };
        });
        navigator.geolocation.getCurrentPosition(this.allow, this.block);
    }

    allow = (point) => {
        this.setState(() => {
            return {
                latitude: point.coords.latitude,
                longitude: point.coords.longitude,
            }
        });
        this.getAddress();
    }

    block = () => {
        this.setState(() => {
            return {
                showErrorFindining: true,
                errorCoords: true,
                isFinding: false
            }
        });
    }

    getAddress = () => {
        const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${this.state.latitude}&lon=${this.state.longitude}`;
        Axios.get(url)
        .then(res => {
            const {country, state, city, suburb, village, municipality, province} = res.data.address;
            this.setState(prevState => {
                return {
                    country,
                    province: state || city || province,
                    neighbourhood: suburb || municipality || village,
                    isFinding: false
                };
            });
        })
        .catch(err => {
            this.setState(prevState => {
                return {
                    isFinding: false,
                    showErrorFindining: true,
                    errorAddress: true  
                };
            });
        });
    }

    backClick = () => {
        this.props.updateStage("favorites");
    }

    nextClick = () => {
        const location = {
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            country: this.state.country,
            province: this.state.province,
            neighbourhood: this.state.neighbourhood
        };
        const toBackJSON = JSON.stringify(location);
        Axios.post(`${serverURL()}/account/get_location/`, toBackJSON, tokenConfig())
        .then(res => {
            this.props.updateLocation(location);
            this.props.updateStage("spotify");
        })
        .catch(err => {
            this.props.updateLocation(location);
            this.props.updateStage("spotify");
        });
    }
}

export default Location;