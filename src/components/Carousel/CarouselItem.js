import React from 'react';

class CarouselItem extends React.Component {
    render() {
        const { index, title, subtitle, imgURL } = this.props;
        return (
            <div className="Carousel_item">
                <img width="95%" src={imgURL} alt="" />
                <div className="Carousel_item-text">
                    <p>{index + 1}: {title}</p>
                    <p>{subtitle}</p>
                </div>
            </div>
        );
    }
}

export default CarouselItem;