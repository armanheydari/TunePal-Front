import React from 'react';

class CarouselItem extends React.Component {
    state = {
        play: false
    }
    render() {
        const { index, title, subtitle, imgURL } = this.props;
        return (
            <div className="Carousel_item" onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                <div className="Carousel_pic">
                    {(this.state.play == false)
                        ?<img className="Carousel_img" src={imgURL} alt="" />
                        :<div style={{width:"100%",height:"20rem"}}>
                        <img className="Carousel_imgp" src={imgURL} alt="" />
                        <button className="Carousel_play-button" onClick={this.openSpotify}><i className="play icon"/></button>
                        </div>
                    }
                </div>
                <div className="Carousel_item-text">
                    <p>{index + 1}: {title}</p>
                    <p>{subtitle}</p>
                </div>
            </div>
        );
    }

    mouseEnter = () => {
        this.setState(() => {
            return {
                play: true
            };
        });
    }

    mouseLeave = () => {
        this.setState(() => {
            return {
                play: false
            };
        });
    }

    openSpotify = () => {
        window.open(`${this.props.spotifyURL}`, '_blank');
    }
}

export default CarouselItem;