import React from 'react';
import ProfilePicture from '../../assets/Default-Profile-Picture.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleArrows, faVenusMars, faMale, faFemale, faBirthdayCake } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import tokenConfig from '../../utils/tokenConfig';

class RequestItem extends React.Component {
    render() {
        const { name, gender, age, distance, imgURL } = this.props;
        return (
            <div className="card Request_item">
                <div className="blurring dimmable image">
                    <div className="Request_image">
                        <Link to={`/profile/${this.props.username}`}><img src={imgURL || ProfilePicture} alt="" className="Request_img"/></Link>
                    </div>
                </div>
                <div className="content">
                    <h1 className="header Request_info">{name}</h1>
                    <div className="meta Request_info">
                        <div className="ui label">
                            <FontAwesomeIcon icon={faVenusMars} />
                            <div className="detail">
                                {gender === "Male" ? <FontAwesomeIcon icon={faMale} /> : <FontAwesomeIcon icon={faFemale} />}
                            </div>
                        </div>

                        <div className="ui label">
                            <FontAwesomeIcon icon={faBirthdayCake} />
                            <div className="detail">{age}</div>
                        </div>

                        <div className="ui label">
                            <FontAwesomeIcon icon={faPeopleArrows} />
                            <div className="detail">{distance}</div>
                        </div>
                    </div>
                </div>
                <div className="content ui buttons">
                    <button className="ui positive button" style={{fontSize: '1.5rem', padding: '1.2rem 0'}} onClick={this.onClickAccept}>Accept</button>
                    <div className="or" style={{fontSize: '1.5rem', padding: '1.2rem 0'}} ></div>
                    <button className="ui button" style={{fontSize: '1.5rem', padding: '1.2rem 0'}} onClick={this.onClickReject}>Reject</button>
                </div>
            </div>
        );
    }

    onClickAccept = () => {
        Axios.get(`http://tunepal.pythonanywhere.com/spotify/response/?verb=accept&username=${this.props.username}`, tokenConfig())
        .then(res => {
            console.log(res);
            this.props.updateItems(this.props.username);
        })
        .catch(err => {
            console.log(err);
        });
    }

    onClickReject = () => {
        Axios.get(`http://tunepal.pythonanywhere.com/spotify/response/?verb=decline&username=${this.props.username}`, tokenConfig())
        .then(res => {
            console.log(res);
            this.props.updateItems(this.props.username);
        })
        .catch(err => {
            console.log(err);
        });
    }
}

export default RequestItem;