import React from 'react';
import CarouselItem from './CarouselItem';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './styles/Carousel.css';

class CarouselList extends React.Component {
    render() {
        var settings = {
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
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
          };
        return (
            <div className="Carousel">
                <h1 className="Carousel_title">Your Top 50 Songs</h1>
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

