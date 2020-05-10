import React from 'react';

class CarouselItem extends React.Component {
    state = {
        playIcon: false,
        playPause: true
    }
    render() {
        const { index, title, subtitle, imgURL } = this.props;
        return (
            <div className="Carousel_item-override" onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} >
                {(this.state.playIcon == false) ?
                    <img className="Carousel-img-override" src={imgURL} alt="" />
                    :
                    subtitle ?
                        <div style={{ width: "100%", height: "16rem" }}>
                            <img className="Carousel_imgp-override" src={imgURL} alt="" />
                            <button className="Carousel_play-button-override" onClick={this.playClicked}>{this.state.playPause == true ? <i className="play icon" /> : <i className="stop icon" />}</button>
                        </div>
                        :
                        <iframe src="https://open.spotify.com/follow/1/?uri=spotify:artist:6sFIWsNpZYqfjUpaCgueju&size=detail&theme=light" scrolling="no" width="100%" frameBorder="0" style={{ border: "none", overflow: "hidden" }} allowTransparency="true"></iframe>
                }

                <div className="Carousel_item-text-override">
                    <p>{index + 1}: {title}</p>
                    {subtitle && <p>{subtitle}</p>}
                </div>
            </div>
        );
    }

    playClicked = () => {
        this.setState((prevState) => {
            return {
                playPause: !prevState.playPause
            };
        });
    }

    mouseEnter = () => {
        this.setState(() => {
            return {
                playIcon: true
            };
        });
    }

    mouseLeave = () => {
        this.setState(() => {
            return {
                playIcon: false
            };
        });
    }
}

export default CarouselItem;