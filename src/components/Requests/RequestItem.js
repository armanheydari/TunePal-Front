import React from 'react';
import ProfilePicture from '../../assets/Default-Profile-Picture.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleArrows, faVenusMars, faMale, faFemale, faBirthdayCake } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';

function tokenConfig() {
    const config = {
      mode: "cors",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    };
    return config;
  }

class RequestItem extends React.Component {
    render() {
        const { name, gender, age, distance, imgURL } = this.props;
        return (
            <li className="Requests_List_Item">

                <div className="Requests_List_Item-main">
                    <img
                        className="Requests_List_Item-img"
                        alt="profile-img"
                        src={imgURL || ProfilePicture}
                    />
                    <h2 className="Requests_List_Item-name">{name}</h2>
                </div>

                <div className="Requests_List_Item-info">
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

                <div className="Requests_List_Item-action ui buttons">
                    <button className="ui positive button" onClick={this.onClickAccept}>Accept</button>
                    <div className="or"></div>
                    <button className="ui button" onClick={this.onClickReject}>Reject</button>
                </div>

            </li>
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