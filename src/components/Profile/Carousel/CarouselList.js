import React from 'react';
import CarouselItem from './CarouselItem';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';


class CarouselList extends React.Component {
    render() {
        const settings = {
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: false,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4,
                        initialSlide: 4
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 380,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        if (this.props.isLoading) {
            return (
                <div className="Carousel-override">
                    <div className="Carousel_loading">
                        <div className="ui active centered inline loader Carousel_loading-icon"></div>
                        <p className="Carousel_loading-text" style={{color: "black"}}>Loading</p>
                    </div>
                </div>
            );
        }
        if (this.props.isEmpty) {
            return (
                <div className="Carousel-override">
                    <div className="Carousel_fail">
                        <FontAwesomeIcon icon={faExclamationTriangle} className="Carousel_fail-icon" />
                        <p className="Carousel_fail-text" style={{color: "black"}}>There was a problem connecting to Spotify</p>
                    </div>
                </div>
            );
        }
        return (
            <div className="Carousel-override">
                <Slider {...settings}>
                {
                    this.props.items.map((item, index) => {
                        return (
                            <CarouselItem
                                key={index}
                                index={index}
                                title={item.title}
                                subtitle={item.subtitle}
                                imgURL={item.imgURL}
                            />
                        );
                    })
                }
                </Slider>
            </div>
        );
    }
    
}

export default CarouselList;

