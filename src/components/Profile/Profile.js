import React from 'react';
import Axios from 'axios';
import General from './General';
import About from './About';
import TopArtists from './TopArtists';
import TopSongs from './TopSongs';
import ProfilePicture from '../../assets/Default-Profile-Picture.jpg';

const tokenConfig = () => {
    return {
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
    }
}

const locationToString = (location) => {
    if (location) {
        return `${location.country} ${location.province} ${location.neighbourhood}`;
    }
    return "Undefined";
}

class Profile extends React.Component {
    state = {
        render: false,

        imgURL: undefined,
        name: undefined,
        gender: undefined,
        birthdate: undefined,
        location: undefined,
        score: undefined,
        biography: undefined,
        favorites: undefined,
    }

    componentDidMount() {
        Axios.get("http://tunepal.pythonanywhere.com/account/get_user_info/", tokenConfig())
        .then(res => {
            const {
                user_avatar: imgURL,
                nickname: name,
                gender,
                birthdate,
                location,
                score,
                biography,
                interests: favorites
            } = res.data
            this.setState(prevState => {
                return {
                    imgURL,
                    name,
                    gender,
                    birthdate,
                    location: locationToString(location),
                    score,
                    biography,
                    favorites,

                    render: true
                };
            });
        })
        .catch(err => {
        });
    }

    render() {
        if (this.state.render) {
            const {imgURL, name, gender, birthdate, location, score, biography, favorites} = this.state;
            return (
                <div className="Profile">
                    <div className="Profile_left">
                        <img src={imgURL || ProfilePicture} alt="" className="Profile_picture" />
                        <General
                            name={name}
                            gender={gender}
                            birthdate={birthdate}
                            location={location}
                            score={score}
                        />
                    </div>
                    <div className="Profile_right">
                        <About
                            biography={biography}
                            favorites={favorites}
                        />
                        <div className="Profile_carousel">
                            <TopArtists />
                            <TopSongs />
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };
}

export default Profile;