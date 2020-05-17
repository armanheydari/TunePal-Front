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
import Axios from 'axios';
import tokenConfig from '../../utils/tokenConfig';
import serverURL from '../../utils/serverURL';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

const stringToArray = (string) => {
    return string.split(' ');
}

const isObjectEmpty = (obj) => {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}

class Interest extends React.Component {
    state = {
        favorites: stringToArray(this.props.favorites),
        uploading: false,
        isSucceed: false,
        showResult: false
    }

    componentDidMount() {
        const favorites = this.state.favorites;
        const imgItems = document.getElementsByClassName("interest-img");
        for (let i = 0; i < imgItems.length; i++) {
            if (favorites.includes('#' + imgItems.item(i).id)) {
                imgItems.item(i).nextSibling.className = "ui label selected";
            }
        }
    }

    componentDidUpdate() {
        const favorites = this.state.favorites;
        const imgItems = document.getElementsByClassName("interest-img");
        for (let i = 0; i < imgItems.length; i++) {
            if (favorites.includes('#' + imgItems.item(i).id)) {
                imgItems.item(i).nextSibling.className = "ui label selected";
            }
            else {
                imgItems.item(i).nextSibling.className = "ui label";
            }
        }
    }

    render() {
        return (
            <div className="Setting_section">
                <div className="Setting_section-title">Interests</div>
                <div className="Interest" style={{margin: '0 1rem'}}>
                    <div style={{
                        width: '100%',
                        boxShadow: 'none',
                        borderRadius: '0',
                        backgroundColor: '#fcfcfc'
                    }}>
                        <div onClick={this.onItemClick}>
                            <img id="Cars" src={Cars} alt="" className="interest-img" />
                            <label className="ui label">#Cars</label>
                        </div>
                        <div onClick={this.onItemClick}>
                            <img id="Fashion" src={Fashion} alt="" className="interest-img"/>
                            <label className="ui label">#Fashion</label>
                        </div>
                        <div onClick={this.onItemClick}>
                            <img id="Books" src={Books} alt="" className="interest-img" />
                            <label className="ui label">#Books</label>
                        </div>
                        <div onClick={this.onItemClick}>
                            <img id="Travel" src={Travel} alt="" className="interest-img" />
                            <label className="ui label">#Travel</label>
                        </div>
                        <div onClick={this.onItemClick}>
                            <img id="Sports" src={Sports} alt="" className="interest-img" />
                            <label className="ui label">#Sports</label>
                        </div>
                        <div onClick={this.onItemClick}>
                            <img id="Gaming" src={Gaming} alt="" className="interest-img" />
                            <label className="ui label">#Gaming</label>
                        </div>
                        <div onClick={this.onItemClick}>
                            <img id="Cooking" src={Cooking} alt="" className="interest-img" />
                            <label className="ui label">#Cooking</label>
                        </div>
                        <div onClick={this.onItemClick}>
                            <img id="Photography" src={Photography} alt="" className="interest-img" />
                            <label className="ui label">#Photography</label>
                        </div>
                        <div onClick={this.onItemClick}>
                            <img id="History" src={History} alt="" className="interest-img" />
                            <label className="ui label">#History</label>
                        </div>
                        <div onClick={this.onItemClick}>
                            <img id="Singing" src={Singing} alt="" className="interest-img" />
                            <label className="ui label">#Singing</label>
                        </div>
                        <div onClick={this.onItemClick}>
                            <img id="Movies" src={Movies} alt="" className="interest-img" />
                            <label className="ui label">#Movies</label>
                        </div>
                        <div onClick={this.onItemClick}>
                            <img id="Nature" src={Nature} alt="" className="interest-img" />
                            <label className="ui label">#Nature</label>
                        </div>
                        <div onClick={this.onItemClick}>
                            <img id="Makeup" src={Makeup} alt="" className="interest-img" />
                            <label className="ui label">#Makeup</label>
                        </div>
                        <div onClick={this.onItemClick}>
                            <img id="Animation" src={Animation} alt="" className="interest-img" />
                            <label className="ui label">#Animation</label>
                        </div>
                        <div onClick={this.onItemClick}>
                            <img id="Art" src={Art} alt="" className="interest-img" />
                            <label className="ui label">#Art</label>
                        </div>
                        <div onClick={this.onItemClick}>
                            <img id="Humor" src={Humor} alt="" className="interest-img" />
                            <label className="ui label">#Humor</label>
                        </div>
                        <div onClick={this.onItemClick}>
                            <img id="Science" src={Science} alt="" className="interest-img" />
                            <label className="ui label">#Science</label>
                        </div>
                        <div onClick={this.onItemClick}>
                            <img id="Sci-Fi" src={SciFi} alt="" className="interest-img" />
                            <label className="ui label">#Sci-Fi</label>
                        </div>
                        <div onClick={this.onItemClick}>
                            <img id="Coding" src={Coding} alt="" className="interest-img" />
                            <label className="ui label">#Coding</label>
                        </div>
                        <div onClick={this.onItemClick}>
                            <img id="News" src={News} alt="" className="interest-img" />
                            <label className="ui label">#News</label>
                        </div>
                        <div onClick={this.onItemClick}>
                            <img id="Culture" src={Culture} alt="" className="interest-img" />
                            <label className="ui label">#Culture</label>
                        </div>
                    </div>
                </div>
                <div style={{
                    margin: '2rem 0 2rem 4rem'
                }}>
                    <Button
                        type="primary"
                        loading={this.state.uploading}
                        disabled={isObjectEmpty(this.changes())}
                        onClick={this.onSubmit}
                    >
                        Submit
                    </Button>

                    <Button htmlType="button" onClick={this.onReset}>
                        Reset
                    </Button>
                </div>
                    {
                        (this.state.showResult && this.state.isSucceed) && (
                            <div className="Setting_result-pass" style={{margin: '1rem 2rem 2rem 2rem'}}>
                                <FontAwesomeIcon icon={faCheck} className="Setting_result-icon" />
                                Your info successfully updated.
                            </div>
                        )
                    }

                    {
                        (this.state.showResult && !this.state.isSucceed) && (
                            <div className="Setting_result-fail" style={{margin: '1rem 2rem 2rem 2rem'}}>
                                <FontAwesomeIcon icon={faTimes} className="Setting_result-icon" />
                                There was a problem updating your info.
                            </div>
                        )
                    }
            </div>
        );
    }

    onItemClick = e => {
        const itemName = e.target.id;
        const favorites = this.state.favorites;
        if (favorites.includes('#' + itemName)) {
            this.setState(prevState => {
                return {
                    favorites: prevState.favorites.filter(item => item !== '#' + itemName)
                };
            });
        }
        else {
            this.setState(prevState => {
                return {
                    favorites: prevState.favorites.concat('#' + itemName)
                };
            });
        }
    }

    changes = () => {
        let changes = {};
        let interests = "";
        this.state.favorites.forEach(item => {
            interests = interests.concat(item, ' ');
        });
        interests = interests.trim(" ");
        if (interests !== this.props.favorites) {
            changes.interests = interests;
        }
        return changes;
    }

    onSubmit = () => {
        this.setState(prevState => {
            return {
                uploading: true,
                showResult: false
            };
        });
        let interests = "";
        this.state.favorites.forEach(item => {
            interests = interests.concat(item, ' ');
        });
        interests = interests.trim(" ");
        const toBackJSON = JSON.stringify({interests});
        Axios.put(`${serverURL()}/account/sign_up/`, toBackJSON, tokenConfig())
        .then(res => {
            this.setState(prevState => {
                return {
                    showResult: true,
                    isSucceed: true,
                    uploading: false
                };
            });
            this.props.updateFavorites(interests);
        })
        .catch(err => {
            this.setState(prevState => {
                return {
                    showResult: true,
                    isSucceed: false,
                    uploading: false
                };
            });
        })
    }

    onReset = () => {
        this.setState(prevState => {
            return {
                favorites: stringToArray(this.props.favorites)
            };
        });
    }
}

export default Interest;