import React from 'react';
import Axios from 'axios';
import General from './General';
import About from './About';
import TopArtists from './TopArtists';
import TopSongs from './TopSongs';
import serverURL from '../../utils/serverURL';
import Picture from './Picture';

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
        const username = this.props.match.params.username;
        Axios.get(`${serverURL()}/account/get_user_info/?username=${username}`)
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
            const username = this.props.match.params.username;
            return (
                <div className="Profile">
                    <div className="Profile_left">
                        <Picture images={imgURL} />
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
                            <TopArtists
                                username={username}
                            />
                            <TopSongs
                                username={username}
                            />
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className="Homepage_load">
                <div className="ui active centered inline text loader massive">Loading</div>
            </div>
        );
    };
}

export default Profile;