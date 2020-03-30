import React from 'react';
import './styles/General.css';
import ProfilePicture from '../../assets/maxresdefault.jpg';

class General extends React.Component {
    state = {
        //Profile Picture
        name: 'Fati Komando',
        status: 'Online',
        age: '20',
        gender: 'Female',
        location: 'Iran, Tehran, Navvab',
        username: '@ftikmnd',
        bio: "Lorem ipsum dolor sit ameolor sit amet Lorem ipsumum Lorem ipsum dolor.",
        //Lorem ipsum dolor sit ameolor sit amet Lorem ipsum Lorem ipsum dolor sit ameolor sit amet Lorem ipsum Lorem ipsum dolor.
        favorites: '#Music #TV #biglittlelies'
    }

    render() {
        return (
            <div className="Profile_General_container">
                <div className="row">

                    <div className="col-lg-3 col-md-6 col-sm-12 Profile_General_image-container">
                        {/* <div className="Profile_General_status">{this.state.status}</div> */}
                        <img className="Profile_General_image" alt="profile-img" src={ProfilePicture}></img>
                    </div>

                    <div className="col-lg-3 col-md-6 col-sm-12 Profile_General_info-container">
                        <table className="Profile_General_table">
                            <tbody>
                                <tr className="Profile_Genral_table-row">
                                    <th className="Profile_Genral_table-head">Name</th>
                                    <td className="Profile_Genral_table-data">{this.state.name}</td>
                                </tr>

                                <tr className="Profile_Genral_table-row">
                                    <th className="Profile_Genral_table-head">Gender</th>
                                    <td className="Profile_Genral_table-data">{this.state.gender}</td>
                                </tr>

                                <tr className="Profile_Genral_table-row">
                                    <th className="Profile_Genral_table-head">Age</th>
                                    <td className="Profile_Genral_table-data">{this.state.age}</td>
                                </tr>

                                <tr className="Profile_Genral_table-row">
                                    <th className="Profile_Genral_table-head">Location</th>
                                    <td className="Profile_Genral_table-data">{this.state.location}</td>
                                </tr>

                                <tr className="Profile_Genral_table-row">
                                    <th className="Profile_Genral_table-head">Username</th>
                                    <td className="Profile_Genral_table-data">{this.state.username}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="col-lg-3 col-md-6 col-sm-12 Profile_General_bio-container">
                        <div className="Profile_General_bio">
                            <label className="Profile_General_label">Biography</label>
                            {this.state.bio}
                        </div>

                    </div>

                    <div className="col-lg-3 col-md-6 col-sm-12 Profile_General_fav-container">
                        <div className="Profile_General_fav">
                            <label className="Profile_General_label">Favourite</label>
                            {this.state.favorites}
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default General;