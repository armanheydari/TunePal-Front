import React from 'react';
import Axios from 'axios';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Header from './Layout/Header.js';
import Footer from './Layout/Footer.js';
import Sidebar from './Layout/Sidebar.js';
import LoginSignup from './LoginSignup/LoginSignup.js';
import SpotifyResult from './Spotify/SpotifyResult.js';
import Profile from './Profile/Profile.js';
import Setting from './Setting/Setting.js';
import Requests from './Requests/Requests';
import Match from './Match/Match';
import Quiz from './Quiz/Quiz.js';
import Chat from './Chat/Chat';
import SidebarOverlay from './Layout/SidebarOverlay';

const tokenConfig = () => {
    return {
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
    }
}


class Main extends React.Component {
    state = {
        username: "",
        show: false,
        isLoggedIn: false,
    };

    componentDidMount() {
        if (localStorage.getItem('token')) {
            Axios.get('http://tunepal.pythonanywhere.com/account/get_user_info/', tokenConfig())
            .then(res => {
                this.setState(prevState => {
                    return {
                        username: res.data.username,
                        show: true,
                        isLoggedIn: true
                    };
                });
            })
            .catch(err => {
                this.setState(prevState => {
                    return {
                        show: true,
                        isLoggedIn: false
                    };
                });
            });
        }
        else {
            this.setState(() => {
                return {
                    show: true,
                    isLoggedIn: false
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
                    <Header username={this.state.username} />
                    <div className="Main_row">
                        <div className="Main_sidebar">
                            <SidebarOverlay username={this.state.username} />
                        </div>
                        <div className="Main_sidebar">
                            <Sidebar username={this.state.username} />
                        </div>
                        <div className="Main_content-container">
                            <Switch>
                                <Route
                                    exact
                                    path="/"
                                    component={Requests}
                                />
                                <Route
                                    path="/match"
                                    component={Match}
                                />
                                <Route
                                    path="/chat"
                                    component={Chat}
                                />
                                <Route
                                    path="/profile/:username"
                                    component={Profile}
                                />
                                <Route
                                    path="/setting"
                                    component={Setting}
                                />
                                <Route
                                    path="/quiz"
                                    component={Quiz}
                                />
                                <Route path="/spotifyresult">
                                    <SpotifyResult name={this.state.username} />
                                </Route>
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
}

export default Main;