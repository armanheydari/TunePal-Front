import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Header from './Layout/Header.js';
import Footer from './Layout/Footer.js';
import Sidebar from './Layout/Sidebar.js';
import LoginSignup from './LoginSignup/LoginSignup.js';
import SpotifyResult from './Spotify/SpotifyResult.js';
import Profile from './Profile/Profile.js';
import Setting from './Setting/Setting.js';
import Requests from './Requests/Requests';


class Main extends React.Component {
    state = {
        show: false,
        isLoggedIn: false,
        userInfo: {
            name: undefined,
            gender: undefined,
            birthday: undefined,
            email: undefined,
            username: undefined,
            latitude: undefined,
            longitude: undefined,
            country: undefined,
            province: undefined,
            neighbourhood: undefined,
            bio: undefined,
            favorites: undefined
        }
    };

    componentDidMount() {
        if (localStorage.getItem('token')) {
            const config = {
                mode: "cors",
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
                }
            }
            axios.get('http://tunepal.pythonanywhere.com/account/get_user_info/', config)
            .then(res => {
                const userInfo = {
                    name: res.data.nickname,
                    gender: res.data.gender,
                    birthday: res.data.birthdate,
                    email: res.data.email,
                    username: res.data.username,
                    latitude: res.data.location ? res.data.location.latitude : undefined,
                    longitude: res.data.location ? res.data.location.longitude : undefined,
                    country: res.data.location ? res.data.location.country : undefined,
                    province: res.data.location ? res.data.location.province : undefined,
                    neighbourhood: res.data.location ? res.data.location.neighbourhood : undefined,
                    bio: res.data.biography,
                    favorites: res.data.interests
                };
                this.setUserInfo(userInfo);
                this.setState(() => {
                    return {
                        show: true,
                    };
                });
            })
            .catch(err => {
                this.setState(() => {
                    return {
                        show: true
                    };
                });
            });
        }
        else {
            this.setState(() => {
                return {
                    show: true
                };
            });
        }
    }

    render() {
        if (!this.state.show) {
            return null;
        }
        if (this.state.isLoggedIn) {
            return (
                <Router>
                    <Header name={this.state.userInfo.name} />
                    <div className="Main_row">
                        <div className="Main_sidebar">
                            <Sidebar logout={this.logout} />
                        </div>
                        <div className="Main_content-container">
                            <Switch>
                                <Route exact path="/"><Requests /></Route>
                                <Route path="/match"></Route>
                                <Route path="/profile"><Profile user={this.state.userInfo} /></Route>
                                <Route path="/setting"><Setting user={this.state.userInfo} /></Route>
                                <Route path="/logout"></Route>
                                <Route path="/spotifyresult"><SpotifyResult name={this.state.userInfo.name} /></Route>
                                <Route path='/404'>404</Route>
                                <Redirect to='/404' />
                            </Switch>
                        </div>
                    </div>
                    <Footer />
                </Router>
            );
        }
        else {
            return (
                <Router>
                    <Route exact path="/"><LoginSignup setUserInfo={this.setUserInfo} /></Route>
                    <Redirect from='*' to='/' />
                </Router>
            );
        }
    }

    getUserInfo = () => {
        
    }

    setUserInfo = (userInfo) => {
        this.setState(() => {
            return {
                isLoggedIn: true,
                userInfo
            };
        });
    }

    logout = () => {
        const config = {
            mode: "cors",
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
            }
        }
        axios.get('http://tunepal.pythonanywhere.com/account/logout/', config)
        .then(() => {
            
        })
        localStorage.clear();
        this.setState(() => {
            return {
                isLoggedIn: false,
                userInfo: {
                    name: undefined,
                    gender: undefined,
                    birthday: undefined,
                    email: undefined,
                    username: undefined,
                    latitude: undefined,
                    longitude: undefined,
                    country: undefined,
                    province: undefined,
                    neighbourhood: undefined,
                    bio: undefined,
                    favorites: undefined
                }
            }
        });
    }
    
}

export default Main;