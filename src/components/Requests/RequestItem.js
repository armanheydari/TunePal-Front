import React from 'react';
import ProfilePicture from '../../assets/Default-Profile-Picture.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleArrows, faVenusMars, faMale, faFemale, faBirthdayCake } from '@fortawesome/free-solid-svg-icons';

class RequestItem extends React.Component {
    render() {
        const { username, name, gender, age, distance } = this.props;
        return (
            <li className="Requests_List_Item">

                <div className="Requests_List_Item-main">
                    <img
                        className="Requests_List_Item-img"
                        alt="profile-img"
                        src={this.props.picture || ProfilePicture}
                    />
                    <h2 className="Requests_List_Item-name">{name}</h2>
                </div>

                <div className="Requests_List_Item-info">
                    <div className="ui label">
                        <FontAwesomeIcon icon={faVenusMars} />
                        <div className="detail">
                            {gender === "male" ? <FontAwesomeIcon icon={faMale} /> : <FontAwesomeIcon icon={faFemale} />}
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

    }

    onClickReject = () => {

    }
}

export default RequestItem;