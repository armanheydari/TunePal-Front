import React from 'react';

class CarouselItem extends React.Component {
    render() {
        const { index, title, subtitle, imgURL } = this.props;
        return (
            <div className="Carousel_item-override" style={{cursor: 'pointer'}} onClick={this.openSpotify} >
                <img className="Carousel-img-override" src={imgURL} alt="" />
                <div className="Carousel_item-text-override">
                    <p>{index + 1}: {title}</p>
                    { subtitle && <p>{subtitle}</p> }
                </div>
            </div>
        );
    }

    openSpotify = () => {
        window.open(`${this.props.spotifyURL}`, '_blank');
    }
}

export default CarouselItem;