import React from 'react';
class CarouselItem extends React.Component {
    state = {
        isMouseOnItem: false,
    }
    render() {
        const { index, title, subtitle, imgURL, playIndex } = this.props;
        return (
            <div className="Carousel_item" onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                <div className="Carousel_pic">
                    {(this.state.isMouseOnItem === false) ?
                        <img className="Carousel_img" src={imgURL} alt="" />
                        :
                        subtitle ?
                            <div style={{ width: "100%", height: "20rem" }}>
                                <img className="Carousel_imgp" src={imgURL} alt="" />
                                <button className="Carousel_play-button" onClick={this.playClicked}>{playIndex !== index ? <i className="play icon" /> : <i className="stop icon" />}</button>
                            </div>
                            :
                            <div style={{ width: "100%", height: "20rem" }}>
                                <img className="Carousel_imgp" src={imgURL} alt="" />
                                <iframe title="HomepageIframe" className="Carousel_artist-iframe" src={this.makeArtistFollowLink()} scrolling="no" width="100%" frameBorder="0" style={{ border: "none", overflow: "hidden" }}></iframe>
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

    makeArtistFollowLink = () => {
        var newLink = this.props.spotifyURL.replace("https://open.spotify.com/artist/", "https://open.spotify.com/follow/1/?uri=spotify:artist:");
        newLink = newLink.concat("&size=detail&theme=light");
        return newLink;
    }

    playClicked = () => {
        if (this.props.playIndex !== this.props.index && this.props.playIndex !== null) {
            this.props.updatePlay(this.props.index, this.props.previewURL);
        }
        if (this.props.playIndex === this.props.index) {
            this.props.updatePlay(null, "");
        }
        if (this.props.playIndex === null) {
            this.props.updatePlay(this.props.index, this.props.previewURL);
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