import React from 'react';
import Axios from 'axios';
import CarouselList from './Carousel/CarouselList';

const tokenConfig = () => {
    return {
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
    }
}

class TopSongs extends React.Component {
    state = {
        isLoading: true,
        isEmpty: false,
        items: []
    }
    componentDidMount() {
        Axios.get("http://tunepal.pythonanywhere.com/spotify/topsong/", tokenConfig())
        .then(res => {
            res.data.forEach(item => {
                const temp = {
                    title: item.track_name,
                    subtitle: item.artist_name,
                    imgURL: item.image_url
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
            <div className="Profile_Carousel-song">
                <h3 className="Profile_Carousel-title">Top Songs</h3>
                <CarouselList
                    title=""
                    isLoading={this.state.isLoading}
                    isEmpty={this.state.isEmpty}
                    items={this.state.items}
                />
            </div>

        );
    }
}

export default TopSongs;