import React from 'react';

class General extends React.Component {
    state = {
    }

    location = () => {
        return `${this.props.user.country} , ${this.props.user.province} , ${this.props.user.neighbourhood}`
    }

    render() {
        return (
            <div className="Profile_General_container">
                <div className="Profile_General_info-container">
                    <h2>General Info</h2>
                    <div className="Profile_General_info-field">
                        <span className="Profile_General_info-label">Name</span>
                        <span>{this.props.user.name}</span>
                    </div>
                    <div className="Profile_General_info-field">
                        <span className="Profile_General_info-label">Gender</span>
                        <span>{this.props.user.gender}</span>
                    </div>
                    <div className="Profile_General_info-field">
                        <span className="Profile_General_info-label">Birthday</span>
                        <span>{this.props.user.birthday}</span>
                    </div>
                    <div className="Profile_General_info-field">
                        <span className="Profile_General_info-label">Location</span>
                        <span>{this.location()}</span>
                    </div>
                    <div className="Profile_General_info-field">
                        <span className="Profile_General_info-label">Username</span>
                        <span>{this.props.user.username}</span>
                    </div>
                </div>

                <div className="Profile_General_bio-container">
                    <h2>Biography</h2>
                    <div className="Profile_General_bio">
                        {this.props.user.bio}
                    </div>
                </div>

                <div className="Profile_General_fav-container">
                    <h2>Favourites</h2>
                    <div className="Profile_General_fav">
                        {this.props.user.favorites}
                    </div>
                </div>

            </div>
        )
    }
}

export default General;