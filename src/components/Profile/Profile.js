import React from 'react';
import General from './General';

class Profile extends React.Component {
    state = {

    };

    render() {
        return (
            <React.Fragment>
                <General />
                <div className="Profile_tables-container">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <h3>Song</h3>
                        </div>

                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <h3>Artist</h3>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <h3>Album</h3>
                        </div>

                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <h3>Genre</h3>
                        </div>

                    </div>
                </div>
            </React.Fragment>
        );
    };
}

export default Profile;