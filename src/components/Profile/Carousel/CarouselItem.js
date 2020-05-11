import React from 'react';

class CarouselItem extends React.Component {
    state = {
        isMouseOnItem: false,
    }
    render() {
        const { index, title, subtitle, imgURL, playIndex } = this.props;
        return (
            <div className="Carousel_item-override" onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} >
                {(this.state.isMouseOnItem == false) ?
                    <img className="Carousel-img-override" src={imgURL} alt="" />
                    :
                    subtitle ?
                        <div style={{ width: "100%", height: "16rem" }}>
                            <img className="Carousel_imgp-override" src={imgURL} alt="" />
                            <button className="Carousel_play-button-override" onClick={this.playClicked}>{playIndex !== index ? <i className="play icon" /> : <i className="stop icon" />}</button>
                        </div>
                        :
                        <div style={{ width: "100%", height: "16rem" }}>
                            <img className="Carousel_imgp-override" src={imgURL} alt="" />
                            <iframe className="Carousel_artist-iframe" src="https://open.spotify.com/follow/1/?uri=spotify:artist:6sFIWsNpZYqfjUpaCgueju&size=detail&theme=light" scrolling="no" width="100%" frameBorder="0" style={{ border: "none", overflow: "hidden" }} allowTransparency="true"></iframe>
                        </div>
                }

                <div className="Carousel_item-text-override">
                    <p>{index + 1}: {title}</p>
                    {subtitle && <p>{subtitle}</p>}
                </div>
            </div>
        );
    }

    playClicked = () => {
        if (this.props.playIndex === this.props.index) {
            this.props.updatePlay(null, "");
        }
        else {
            this.props.updatePlay(this.props.index, "https://p.scdn.co/mp3-preview/83090a4db6899eaca689ae35f69126dbe65d94c9?cid=null");
        }
    }

    mouseEnter = () => {
        this.setState(() => {
            return {
                isMouseOnItem: true
            };
        });
    }

    mouseLeave = () => {
        this.setState(() => {
            return {
                isMouseOnItem: false
            };
        });
    }
}

export default CarouselItem;