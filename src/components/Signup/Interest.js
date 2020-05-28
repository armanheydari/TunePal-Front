import React from 'react';
import Cars from '../../assets/InterestItems/car.png';
import Fashion from '../../assets/InterestItems/birthday-and-party.png';
import Books from '../../assets/InterestItems/book.png';
import Travel from '../../assets/InterestItems/plane.png';
import Sports from '../../assets/InterestItems/volleyball.png';
import Gaming from '../../assets/InterestItems/gamepad.png';
import Cooking from '../../assets/InterestItems/chef.png';
import Photography from '../../assets/InterestItems/camera.png';
import History from '../../assets/InterestItems/history.png';
import Singing from '../../assets/InterestItems/singer.png';
import Movies from '../../assets/InterestItems/cinema.png';
import Nature from '../../assets/InterestItems/plant.png';
import Makeup from '../../assets/InterestItems/makeup.png';
import Animation from '../../assets/InterestItems/people.png';
import Art from '../../assets/InterestItems/artist.png';
import Humor from '../../assets/InterestItems/funny.png';
import Science from '../../assets/InterestItems/scientist.png';
import SciFi from '../../assets/InterestItems/alien.png';
import Coding from '../../assets/InterestItems/programmer.png';
import News from '../../assets/InterestItems/live-streaming.png';
import Culture from '../../assets/InterestItems/poem.png';
import './styles/Interest.css';
import Axios from 'axios';
import tokenConfig from '../../utils/tokenConfig';
import serverURL from '../../utils/serverURL';

class Interest extends React.Component {
    state = {
        favorites: this.props.favorites
    }

    componentDidMount() {
        const favorites = this.state.favorites;
        const imgItems = document.getElementsByTagName("img");
        for (let i = 0; i < imgItems.length; i++) {
            if (favorites.includes(imgItems.item(i).id)) {
                imgItems.item(i).nextSibling.className = "ui label selected";
            }
        }
    }

    componentDidUpdate() {
        const favorites = this.state.favorites;
        const imgItems = document.getElementsByTagName("img");
        for (let i = 0; i < imgItems.length; i++) {
            if (favorites.includes(imgItems.item(i).id)) {
                imgItems.item(i).nextSibling.className = "ui label selected";
            }
            else {
                imgItems.item(i).nextSibling.className = "ui label";
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="Interest">
                    <h1 className="ui header">We know you like music! :) besides that, let's get to know you more:</h1>
                    <div>
                        <div onClick={this.onItemClick}>
                            <img id="Cars" src={Cars} alt="" />
                            <label className="ui label">#Cars</label>
                        </div>
                        <div onClick={this.onItemClick}>
                            <img id="Fashion" src={Fashion} alt="" />
                            <label className="ui label">#Fashion</label>
                        </div>
                        <div onClick={this.onItemClick}>
                            <img id="Books" src={Books} alt=""/>
                            <label className="ui label">#Books</label>
                        </div>
                        <div onClick={this.onItemClick}>
                            <img id="Travel" src={Travel} alt="" />
                            <label className="ui label">#Travel</label>
                        </div>
                        <div onClick={this.onItemClick}>
                            <img id="Sports" src={Sports} alt=""/>
                            <label className="ui label">#Sports</label>
                        </div>
                        <div onClick={this.onItemClick}>
                            <img id="Gaming" src={Gaming} alt="" />
                            <label className="ui label">#Gaming</label>
                        </div>
                        <div onClick={this.onItemClick}>
                            <img id="Cooking" src={Cooking} alt=""/>
                            <label className="ui label">#Cooking</label>
                        </div>
                        <div onClick={this.onItemClick}>
                            <img id="Photography" src={Photography} alt=""/>
                            <label className="ui label">#Photography</label>
                        </div>
                        <div onClick={this.onItemClick}>
                            <img id="History" src={History} alt=""/>
                            <label className="ui label">#History</label>
                        </div>
                        <div onClick={this.onItemClick}>
                            <img id="Singing" src={Singing} alt=""/>
                            <label className="ui label">#Singing</label>
                        </div>
                        <div onClick={this.onItemClick}>
                            <img id="Movies" src={Movies} alt=""/>
                            <label className="ui label">#Movies</label>
                        </div>
                        <div onClick={this.onItemClick}>
                            <img id="Nature" src={Nature} alt=""/>
                            <label className="ui label">#Nature</label>
                        </div>
                        <div onClick={this.onItemClick}>
                            <img id="Makeup" src={Makeup} alt=""/>
                            <label className="ui label">#Makeup</label>
                        </div>
                        <div onClick={this.onItemClick}>
                            <img id="Animation" src={Animation} alt=""/>
                            <label className="ui label">#Animation</label>
                        </div>
                        <div onClick={this.onItemClick}>
                            <img id="Art" src={Art} alt=""/>
                            <label className="ui label">#Art</label>
                        </div>
                        <div onClick={this.onItemClick}>
                            <img id="Humor" src={Humor} alt=""/>
                            <label className="ui label">#Humor</label>
                        </div>
                        <div onClick={this.onItemClick}>
                            <img id="Science" src={Science} alt=""/>
                            <label className="ui label">#Science</label>
                        </div>
                        <div onClick={this.onItemClick}>
                            <img id="Sci-Fi" src={SciFi} alt=""/>
                            <label className="ui label">#Sci-Fi</label>
                        </div>
                        <div onClick={this.onItemClick}>
                            <img id="Coding" src={Coding} alt=""/>
                            <label className="ui label">#Coding</label>
                        </div>
                        <div onClick={this.onItemClick}>
                            <img id="News" src={News} alt=""/>
                            <label className="ui label">#News</label>
                        </div>
                        <div onClick={this.onItemClick}>
                            <img id="Culture" src={Culture} alt=""/>
                            <label className="ui label">#Culture</label>
                        </div>
                    </div>
                </div>
                
                <div className="Pagination">
                    <button
                        disabled={true}
                        className="ui labeled icon button link"
                    >
                        Back
                        <i className="left arrow icon"></i>
                    </button>

                    <button
                        onClick={this.nextClick}
                        className="ui right labeled icon button link"
                    >
                        <i className="right arrow icon"></i>
                        Next
                    </button>
                </div>
            </React.Fragment>
        );
    }

    onItemClick = e => {
        if (e.target.id) {
            const itemName = e.target.id;
            const favorites = this.state.favorites;
            if (favorites.includes(itemName)) {
                this.setState(prevState => {
                    return {
                        favorites: prevState.favorites.filter(item => item !== itemName)
                    };
                });
            }
            else {
                this.setState(prevState => {
                    return {
                        favorites: prevState.favorites.concat(itemName)
                    };
                });
            }
        }
    }

    nextClick = () => {
        let interests = "";
        this.state.favorites.forEach(item => {
            interests = interests.concat('#', item, ' ');
        });
        interests = interests.trim(" ");
        const toBackJSON = JSON.stringify({interests});
        Axios.put(`${serverURL()}/account/sign_up/`, toBackJSON, tokenConfig())
        .then(res => {
            this.props.updateFavorites(this.state.favorites);
            this.props.updateStage("location");
        })
        .catch(err => {
            this.props.updateFavorites(this.state.favorites);
            this.props.updateStage("location");
        })
    }
}


export default Interest;