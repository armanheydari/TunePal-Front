import React from 'react';
import Axios from 'axios';
import SingerPicture from '../../assets/Homepage/Singer.png';
import SongPicture from '../../assets/Homepage/Song.png';
import CarouselList from './Carousel/CarouselList';
import RequestList from '../Requests/RequestList';
import RequestPicture from '../../assets/Homepage/Request.png';


const tokenConfig = () => {
    return {
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
    }
}

const requestJSX = () => {
    return (
        <div className="Homepage_section">
            <div className="Homepage_pic">
                <img src={RequestPicture} className="Homepage_img" alt="" />
            </div>
            <div className="Homepage_text">
                <h3 className="Homepage_title">Friend Request</h3>
                    <p>Here you can see your friendship requests from other users.</p>
                    <p>You can accept or reject.</p>
                    <p>When you accept a request a new chat wil be open with that person.</p>
                    <p>Right now you don't have any request but be sure you'll get lot.</p>
            </div>
        </div>
    )
}

const artistJSX = () => {
    return (
        <div className="Homepage_section" style={{justifyContent: "flex-end"}}>
            <div className="Homepage_text">
                <h3 className="Homepage_title">Top Artists</h3>
                    <p>Here you can see singers you listened most.</p>
                    <p>We will use this in finding similar people to you.</p>
                    <p>We give you this data by your spotify account.</p>
                    <p>You can connect your Spotify account to TunePal in setting.</p>
            </div>
            <div className="Homepage_pic">
                <img src={SingerPicture} className="Homepage_img" alt="" />
            </div>
        </div>
    );
}

const songJSX = () => {
    return (
        <div className="Homepage_section">
            <div className="Homepage_text">
                <h3 className="Homepage_title">Top Songs</h3>
                    <p>Here you can see songs you listened most.</p>
                    <p>We will use this in finding similar people to you.</p>
                    <p>We give you this data by your spotify account.</p>
                    <p>You can connect your Spotify account to TunePal in setting.</p>
            </div>
            <div className="Homepage_pic">
                <img src={SongPicture} className="Homepage_img" alt="" />
            </div>
        </div>
    );
}

class Homepage extends React.Component {
    state = {
        requests: [],
        isRequestsReady: false,

        topArtists: [],
        isTopArtistsEmpty: false,
        isArtistSectionReady: false,

        topSongs: [],
        isTopSongsEmpty: false,
        isSongSectionReady: false
    }

    componentDidMount() {
        Axios.get("http://tunepal.pythonanywhere.com/spotify/friend_list/", tokenConfig())
        .then(res => {
            this.setState(prevState => {
                return {
                    requests: res.data,
                    isRequestsReady: true
                };
            });
        })
        .catch(err => {
            this.setState(prevState => {
                return {
                    isRequestsReady: true
                };
            });
        });

        Axios.get(`http://tunepal.pythonanywhere.com/spotify/topartist/`, tokenConfig())
        .then(res => {
            res.data.forEach(item => {
                const temp = {
                    title: item.artist_name,
                    subtitle: "",
                    imgURL: item.image_url
                };
                this.setState(prevState => {
                    return {
                        topArtists: [...prevState.topArtists, temp]
                    };
                });
            });
            this.setState(prevState => {
                return {
                    isTopArtistsEmpty: false,
                    isArtistSectionReady: true
                };
            });
        })
        .catch(err => {
            this.setState(prevState => {
                return {
                    isTopArtistsEmpty: true,
                    isArtistSectionReady: true
                };
            });
        });

        Axios.get(`http://tunepal.pythonanywhere.com/spotify/topsong/`, tokenConfig())
        .then(res => {
            res.data.forEach(item => {
                const temp = {
                    title: item.track_name,
                    subtitle: item.artist_name,
                    imgURL: item.image_url
                };
                this.setState(prevState => {
                    return {
                        topSongs: [...prevState.topSongs, temp]
                    };
                });
            });
            this.setState(prevState => {
                return {
                    isTopSongsEmpty: false,
                    isSongSectionReady: true
                };
            });
        })
        .catch(err => {
            this.setState(prevState => {
                return {
                    isTopSongsEmpty: true,
                    isSongSectionReady: true
                };
            });
        });
    }


    render() {
        const {
            requests,
            isRequestsReady,
            topArtists,
            isTopArtistsEmpty,
            isArtistSectionReady,
            topSongs,
            isTopSongsEmpty,
            isSongSectionReady
        } = this.state
        if (isRequestsReady && isArtistSectionReady && isSongSectionReady) {
            return (
                <div className="Homepage">
                    {
                        requests.length === 0
                        ? requestJSX()
                        : (
                            <RequestList
                                items={this.state.requests}
                                updateItems={this.updateItems}
                            />
                        )
                    }
                    <hr />
                    {
                        isTopArtistsEmpty
                        ? artistJSX()
                        : (
                            <CarouselList
                                title="Top Artists"
                                isLoading={false}
                                isEmpty={false}
                                items={topArtists}
                            />
                        )
                    }
                    <hr />
                    {
                        isTopSongsEmpty
                        ? songJSX()
                        : (
                            <CarouselList
                                title="Top Songs"
                                isLoading={false}
                                isEmpty={false}
                                items={topSongs}
                            />
                        )
                    }
                </div>
            );
        }
        return (
            <div className="Homepage_load">
                <div class="ui active centered inline text loader massive">Loading</div>
            </div>
        );
    }

    updateItems = (username) => {
        this.setState(prevState => {
            const requests = prevState.requests.filter(item => item.from_user.username !== username);
            return {
                requests
            }
        });
    }
}

export default Homepage;