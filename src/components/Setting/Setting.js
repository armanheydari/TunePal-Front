import React from 'react';
import Axios from 'axios';
import Picture from './Picture';
import General from './General';
import Location from './Location';
import Spotify from './Spotify';
import Security from './Security';
import Password from './Password';
import tokenConfig from '../../utils/tokenConfig';

class Setting extends React.Component {
    state = {
        show: false,
        imgURL: null ,
        name: "",
        gender: "",
        birthdate: "",
        biography: "",
        favorites: "",
        username: "",
        email: "",
        location: null
    }

    componentDidMount() {
        this.getUserInfo();
    }

    render() {
        if (this.state.show) {
            const {
                imgURL,
                name,
                gender,
                birthdate,
                biography,
                favorites,
                username,
                email,
                location
            } = this.state;
            return (
                <div className="Setting">
                    <Picture
                        imgURL={imgURL}
                    />
                    <General
                        name={name}
                        gender={gender}
                        birthdate={birthdate}
                        biography={biography}
                        favorites={favorites}
                        updateState={this.updateState}
                    />
                    <Location
                        location={location}
                    />
                    <Spotify
    
                    />
                    <Security
                        username={username}
                        email={email}
                        updateState={this.updateState}
                    />
                    <Password

                    />
                </div>
            );
        }
        return (
            <div className="Homepage_load">
                <div class="ui active centered inline text loader massive">Loading</div>
            </div>
        );
    }

    getUserInfo = () => {
        Axios.get('http://tunepal.pythonanywhere.com/account/get_user_info/', tokenConfig())
        .then(res => {
            const {
                user_avatar: imgURL,
                nickname: name,
                gender,
                birthdate,
                biography,
                interests: favorites,
                location,
                username,
                email
            } = res.data;
            this.setState(prevState => {
                return {
                    imgURL,
                    name,
                    gender,
                    birthdate,
                    biography,
                    favorites,
                    location,
                    username,
                    email,
                    show: true
                };
            });
        })
        .catch(err => {

        });
    }

    updateState = () => {
        this.getUserInfo();
    }
}

export default Setting;