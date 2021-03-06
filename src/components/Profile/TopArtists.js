import React from 'react';
import Axios from 'axios';
import CarouselList from './Carousel/CarouselList';
import serverURL from '../../utils/serverURL';

class TopArtists extends React.Component {
    state = {
        isLoading: true,
        isEmpty: false,
        items: []
    }
    componentDidMount() {
        Axios.get(`${serverURL()}/spotify/topartist/?username=${this.props.username}`)
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
                        items: [...prevState.items, temp]
                    };
                });
            });
            this.setState(prevState => {
                return {
                    isLoading: false
                };
            });
        })
        .catch(err => {
            this.setState(prevState => {
                return {
                    isLoading: false,
                    isEmpty: true
                };
            });
        });
    }

    render() {
        return (
            <div className="Profile_Carousel-artist">
                <h3 className="Profile_Carousel-title">Top Artists</h3>
                <CarouselList
                    // style={background="linear-gradient(to left, rgb(192, 188, 204), rgb(250, 248, 252));"}
                    title=""
                    isLoading={this.state.isLoading}
                    isEmpty={this.state.isEmpty}
                    items={this.state.items}
                />
            </div>
        );
    }
}

export default TopArtists;