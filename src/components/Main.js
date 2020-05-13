import React from 'react';
import Axios from 'axios';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Header from './Layout/Header.js';
import Footer from './Layout/Footer.js';
import Sidebar from './Layout/Sidebar.js';
import SpotifyResult from './Spotify/SpotifyResult.js';
import Profile from './Profile/Profile.js';
import Setting from './Setting/Setting.js';
import Match from './Match/Match';
import Quiz from './Quiz/Quiz.js';
import Chat from './Chat/Chat';
import SidebarOverlay from './Layout/SidebarOverlay';
import LandingPage from './LandingPage/LandingPage.js';
import Homepage from './Homepage/Homepage';
import Signup from './Signup/Signup';
import tokenConfig from '../utils/tokenConfig';
import serverURL from '../utils/serverURL';


class Main extends React.Component {
    state = {
        username: "",
        show: false,
        isLoggedIn: false,
        onAfterSignup: false
    };

    componentDidMount() {
        if (localStorage.getItem('token')) {
            Axios.get(`${serverURL()}/account/get_user_info/`, tokenConfig())
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
            const authToken = localStorage.getItem('token');

                document.cookie = 'Authorization:' + "Token " + authToken + '; path=/';
                console.log(document.cookie);

                const ws = new WebSocket(
                    'ws://'
                    + 'localhost:8002'
                    + '/ws/chat/'
                    + '1'
                    + '/'
                );
                console.log(ws)
                ws.onopen = () => {
                    console.log('opened');
                    ws.send(JSON.stringify({
                        'message': "kosssss"
                    }));
                }

                ws.onmessage = evt => {
                    console.log(evt);
                }

                ws.onclose = () => {
                    console.log('closed');
                }
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
        if (this.state.onAfterSignup) {
            return (
                <Signup />
            );
        }

        if (this.state.isLoggedIn && this.state.show) {
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
                                    component={Homepage}
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
                                <Route path='/'><Homepage /></Route>
                                <Redirect to='/' />
                            </Switch>
                        </div>
                    </div>
                    <Footer />
                </Router>
            );
        }

        if (!this.state.isLoggedIn  && this.state.show) {
            return (
                <Router>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            component={LandingPage}
                        />
                        <Redirect from='*' to='/' />
                    </Switch>
                </Router>
            );
        }

        if (!this.state.show) {
            return null;
        }
    }

    isOnAfterSignup = (bool) => {
        this.setState(prevState => {
            return {
                onAfterSignup: bool
            };
        });
    }
}

export default Main;