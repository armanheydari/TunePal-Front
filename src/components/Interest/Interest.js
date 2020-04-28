import React from 'react';
import axios from 'axios';
import './styles/Interest.css'
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
import Anime from '../../assets/InterestItems/rickandmorty.jpg';
import Art from '../../assets/InterestItems/artist.png';
import Humor from '../../assets/InterestItems/funny.png';
import Science from '../../assets/InterestItems/scientist.png';
import SciFi from '../../assets/InterestItems/bot.png';
import Coding from '../../assets/InterestItems/programmer.png';
import News from '../../assets/InterestItems/live-streaming.png';
import Culture from '../../assets/InterestItems/poem.png';

class Interest extends React.Component {
    state = {
    };

    onItemClick = () => {
        return null;
    }

    onNextClick = () => {
        const config = {
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        };
        axios.post('', config)
    }

    render() {
        return (
            <div className="Interest">
                <h1 className="ui header">We know you like music! :) besides that, let's get to know you more:</h1>
                <div className="Interest_item-container">
                    <div className="Interest_item">
                        <img className="Interest_item-img" src={Cars} />
                        <label className="ui label">#Cars</label>
                    </div>
                    <div className="Interest_item">
                        <img className="Interest_item-img" src={Fashion} />
                        <label className="ui label">#Fashion</label>
                    </div>
                    <div className="Interest_item">
                        <img className="Interest_item-img" src={Books} />
                        <label className="ui label">#Books</label>
                    </div>
                    <div className="Interest_item">
                        <img className="Interest_item-img" src={Travel} />
                        <label className="ui label">#Travel</label>
                    </div>
                    <div className="Interest_item">
                        <img className="Interest_item-img" src={Sports} />
                        <label className="ui label">#Sports</label>
                    </div>
                    <div className="Interest_item">
                        <img className="Interest_item-img" src={Gaming} />
                        <label className="ui label">#Gaming</label>
                    </div>
                    <div className="Interest_item">
                        <img className="Interest_item-img" src={Cooking} />
                        <label className="ui label">#Cooking</label>
                    </div>
                    <div className="Interest_item">
                        <img className="Interest_item-img" src={Photography} />
                        <label className="ui label">#Photography</label>
                    </div>
                    <div className="Interest_item">
                        <img className="Interest_item-img" src={History} />
                        <label className="ui label">#History</label>
                    </div>
                    <div className="Interest_item">
                        <img className="Interest_item-img" src={Singing} />
                        <label className="ui label">#Singing</label>
                    </div>
                    <div className="Interest_item">
                        <img className="Interest_item-img" src={Movies} />
                        <label className="ui label">#Movies</label>
                    </div>
                    <div className="Interest_item">
                        <img className="Interest_item-img" src={Nature} />
                        <label className="ui label">#Nature</label>
                    </div>
                    <div className="Interest_item">
                        <img className="Interest_item-img" src={Makeup} />
                        <label className="ui label">#Makeup</label>
                    </div>
                    <div className="Interest_item">
                        <img className="Interest_item-img" src={Anime} />
                        <label className="ui label">#Anime</label>
                    </div>
                    <div className="Interest_item">
                        <img className="Interest_item-img" src={Art} />
                        <label className="ui label">#Art</label>
                    </div>
                    <div className="Interest_item">
                        <img className="Interest_item-img" src={Humor} />
                        <label className="ui label">#Humor</label>
                    </div>
                    <div className="Interest_item">
                        <img className="Interest_item-img" src={Science} />
                        <label className="ui label">#Science</label>
                    </div>
                    <div className="Interest_item">
                        <img className="Interest_item-img" src={SciFi} />
                        <label className="ui label">#Sci-fi</label>
                    </div>
                    <div className="Interest_item">
                        <img className="Interest_item-img" src={Coding} />
                        <label className="ui label">#Coding</label>
                    </div>
                    <div className="Interest_item">
                        <img className="Interest_item-img" src={News} />
                        <label className="ui label">#News</label>
                    </div>
                    <div className="Interest_item">
                        <img className="Interest_item-img" src={Culture} />
                        <label className="ui label">#Culture</label>
                    </div>
                </div>
                <button className="ui right labeled icon button" type="submit" onClick={this.onNextClick}><i className="right arrow icon"></i>Next</button>
            </div>
        );
    };
}
export default Interest;