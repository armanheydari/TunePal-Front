import React from 'react';

class CarouselItem extends React.Component {
    render() {
        const { index, title, subtitle, imgURL } = this.props;
        return (
            <div className="Carousel_item" onClick={this.openSpotify} >
                <div className="Carousel_pic">
                    <img className="Carousel_img" src={imgURL} alt="" />
                </div>
                <div className="Carousel_item-text">
                    <p>{index + 1}: {title}</p>
                    <p>{subtitle}</p>
                </div>
            </div>
        );
    }

    openSpotify = () => {
        window.open(`${this.props.spotifyURL}`,'_blank');
    }
}

export default CarouselItem;