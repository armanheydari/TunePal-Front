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
import Group from './GroupChat/Group'
import SidebarOverlay from './Layout/SidebarOverlay';
import LandingPage from './LandingPage/LandingPage.js';
import Homepage from './Homepage/Homepage';
import Signup from './Signup/Signup';
import tokenConfig from '../utils/tokenConfig';
import serverURL from '../utils/serverURL';
import { notification  } from 'antd';

class Main extends React.Component {
    state = {
        username: "",
        show: false,
        isLoggedIn: false,
        onAfterSignup: false,
        ws: undefined,
        newMessages: undefined
    };

    componentDidMount() {
        if (localStorage.getItem('token')) {
            Axios.get(`${serverURL()}/account/get_user_info/`, tokenConfig())
            .then(res => {
                document.cookie = 'Authorization:Token ' + localStorage.getItem('token') + '; path=/';
                this.setState(
                    prevState => {
                        return {
                            username: res.data.username,
                            show: true,
                            isLoggedIn: true,
                            ws: new WebSocket(
                                'wss://'
                                + 'mytunepal.ir'
                                + '/ws/chat/'
                                + `${res.data.username}`
                                + '/'
                            )
                        };
                    },
                    () => {
                        this.state.ws.onopen = () => {
                            Axios.get(`${serverURL()}/chat/inbox/`, tokenConfig())
                            .then(res => {
                                this.setState(prevState => {
                                    return {
                                        newMessages: res.data.new_messages
                                    };
                                });
                            });
                        }
                
                        this.state.ws.onmessage = evt => {
                            const parsedData = JSON.parse(evt.data);
                            if (!parsedData.is_client) {
                                notification.info({
                                    message: parsedData.sender_id.nickname,
                                    description: parsedData.text,
                                    placement: 'bottomRight'
                                });
                                Axios.get(`${serverURL()}/chat/inbox/`, tokenConfig())
                                .then(res => {
                                    this.setState(prevState => {
                                        return {
                                            newMessages: res.data.new_messages
                                        };
                                    });
                                });
                            }
                        }
                
                        this.state.ws.onclose = () => {
                        }
                    }
                );
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
                                    component={() => {
                                        return (
                                            <Chat ws={this.state.ws} />
                                        );
                                    }}
                                />
                                <Route
                                    path="/Group"
                                    component={Group}
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
                            component={() => {
                                return (
                                    <LandingPage isOnAfterSignup={this.isOnAfterSignup} />
                                );
                            }}
                        />
                        <Redirect from='*' to='/' />
                    </Switch>
                </Router>
            );
        }

        if (!this.state.show) {
            return (
                <div className="Homepage_load">
                    <div className="ui active centered inline text loader massive">Loading</div>
                </div>
            );
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