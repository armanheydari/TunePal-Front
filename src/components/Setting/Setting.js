import React from 'react';
import Axios from 'axios';
import Picture from './Picture';
import General from './General';
import Location from './Location';
import Spotify from './Spotify';
import Security from './Security';
import Password from './Password';

const tokenConfig = () => {
    return {
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
    }
}

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
        return null;
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