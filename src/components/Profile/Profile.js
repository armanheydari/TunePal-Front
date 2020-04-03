import React from 'react';
import General from './General';

class Profile extends React.Component {
    state = {

    };

    render() {
        return (
            <div className="Profile_container">
                <h1 className="Profile_title">Profile</h1>
                <General user={this.props.user} />
                {/* <div className="Profile_tables-container">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <h3>Song</h3>
                            <SongTable />
                        </div>

                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <h3>Artist</h3>
                            <ArtistTable />
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <h3>Album</h3>
                            <AlbumTable />
                        </div>

                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <h3>Genre</h3>
                            <GenreTable />
                        </div>

                    </div>
                </div> */}
            </div>
        );
    };
}

export default Profile;