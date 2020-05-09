import React from 'react';
import Axios from 'axios';
import { Button, Input } from 'antd';
import { AimOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
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
        isSubmiting: false,
        showSubmitMessage: false,
        errorSubmit: false
    }

    render() {
        return (
            <div className="Setting_section">
                <div className="Setting_section-title">Location</div>
                <div className="Setting_form-location">
                    <div className="Setting_location">
                        <Button
                            type="primary"
                            icon={<AimOutlined />}
                            onClick={this.getLocation}
                            disabled={this.state.isSubmiting}
                            loading={this.state.isFinding} 
                        />
                        <Input disabled={true} value={this.locationToString()} className="Setting_location-text" />
                        <Button
                            type="primary"
                            onClick={this.onSubmit}
                            disabled={this.state.showErrorFindining || this.state.isFinding}
                            loading={this.state.isSubmiting}
                        >
                            Submit
                        </Button>
                    </div>

                    {
                        (this.state.showErrorFindining && this.state.errorCoords) && (
                            <div className="Setting_result-fail">
                                <FontAwesomeIcon icon={faTimes} className="Setting_result-icon" />
                                There was a problem getting your coordinates.
                                Try to allow us to get your location.
                            </div>
                        )
                    }

                    {
                        (this.state.showErrorFindining && this.state.errorAddress) && (
                            <div className="Setting_result-fail">
                                <FontAwesomeIcon icon={faTimes} className="Setting_result-icon" />
                                There was a problem getting your address.
                            </div>
                        )
                    }

                    {
                        (this.state.showSubmitMessage && this.state.errorSubmit) && (
                            <div className="Setting_result-fail">
                                <FontAwesomeIcon icon={faTimes} className="Setting_result-icon" />
                                There was a problem submitting your location.
                            </div>
                        )
                    }

                    {
                        (this.state.showSubmitMessage && !this.state.errorSubmit) && (
                            <div className="Setting_result-pass">
                                <FontAwesomeIcon icon={faCheck} className="Setting_result-icon" />
                                Your info successfully updated.
                            </div>
                        )
                    }
                </div>
            </div>
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
                showSubmitMessage: false
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

    onSubmit = () => {
        this.setState(prevState => {
            return {
                isSubmiting: true
            };
        });
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
            this.setState(prevState => {
                return {
                    isSubmiting: false,
                    showSubmitMessage: true,
                    errorSubmit: false
                };
            });
        })
        .catch(err => {
            this.setState(prevState => {
                return {
                    isSubmiting: false,
                    showSubmitMessage: true,
                    errorSubmit: true
                };
            });
        })
    }
    
}

export default Location;