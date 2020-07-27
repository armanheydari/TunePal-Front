import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVenusMars, faBirthdayCake, faMapMarker, faMale, faFemale, faTrophy } from '@fortawesome/free-solid-svg-icons';

class General extends React.Component {
    render() {
        const {name, gender, birthdate, location, score} = this.props;
        return (
            <div className="Profile_General">
                <p className="Profile_General-name">{name}</p>
                <div className="ui label">
                    <FontAwesomeIcon icon={faVenusMars} className="Profile_General-icon" />
                    <div className="detail">
                        {
                            gender === "Male"
                            ? <FontAwesomeIcon icon={faMale} className="Profile_General-icon" />
                            : <FontAwesomeIcon icon={faFemale} className="Profile_General-icon" />
                        }
                    </div>
                </div>
                <div className="ui label">
                        <FontAwesomeIcon icon={faBirthdayCake} className="Profile_General-icon" />
                        <div className="detail">{birthdate}</div>
                </div>
                <div className="ui label">
                    <FontAwesomeIcon icon={faMapMarker} className="Profile_General-icon" />
                    <div className="detail">{location}</div>
                </div>
                <div className="ui label">
                    <FontAwesomeIcon icon={faTrophy} className="Profile_General-icon" />
                    <div className="detail">{score}</div>
                </div>
            </div>
        );
    }
}

export default General;