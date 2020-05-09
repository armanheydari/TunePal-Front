import React from 'react';
import Axios from 'axios';
import SingerPicture from '../../assets/Homepage/Singer.png';
import SongPicture from '../../assets/Homepage/Song.png';
import CarouselList from './Carousel/CarouselList';
import RequestList from '../Requests/RequestList';
import RequestPicture from '../../assets/Homepage/Request.png';
import tokenConfig from '../../utils/tokenConfig';
import serverURL from '../../utils/serverURL';

const requestJSX = () => {
    return (
        <div className="Homepage_section">
            <div className="Homepage_pic">
                <img src={RequestPicture} className="Homepage_img" alt="" />
            </div>
            <div className="Homepage_text">
                <h3 className="Homepage_title">Friend Request</h3>
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
                    <p>We will use your top artists to find similar people to you.</p>
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
                    <p>We will use your top songs to find similar people to you..</p>
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
        Axios.get(`${serverURL()}/spotify/friend_list/`, tokenConfig())
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

        Axios.get(`${serverURL()}/spotify/topartist/`, tokenConfig())
        .then(res => {
            res.data.forEach(item => {
                const temp = {
                    title: item.artist_name,
                    subtitle: "",
                    imgURL: item.image_url,
                    spotifyURL: item.spotify_url
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

        Axios.get(`${serverURL}/spotify/topsong/`, tokenConfig())
        .then(res => {
            res.data.forEach(item => {
                const temp = {
                    title: item.track_name,
                    subtitle: item.artist_name,
                    imgURL: item.image_url,
                    spotifyURL: item.spotify_url
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