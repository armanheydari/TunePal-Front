import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faMicrophone, faTrophy } from '@fortawesome/free-solid-svg-icons';
import TopSongItem from './TopSongItem';
import ProfilePicture from '../../assets/Default-Profile-Picture.jpg';

class General extends React.Component {
    location = () => {
        return `${this.props.user.country} , ${this.props.user.province} , ${this.props.user.neighbourhood}`
    }

    render() {
        return (
            <div className="Profile_General_container">
                <div className="Profile_General-Picture-container">
                    <img className="General_Picture" alt="" src={this.props.user.avatar || ProfilePicture} />
                </div>
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
                    <div className="Profile_General_info-field">
                        <span className="Profile_General_info-label">Score <FontAwesomeIcon icon={faTrophy} /></span>
                        <span>{this.props.user.score}</span>
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

                <div className="Profile_General_artist-container">
                    <h2>Favourite Artists <FontAwesomeIcon icon={faMusic} /> </h2>
                    <div className="Profile_General_artist">
                        {
                            this.props.topArtist &&
                            `${this.props.topArtist[0].name} , ${this.props.topArtist[1].name} , ${this.props.topArtist[2].name}`
                        }
                        
                    </div>
                </div>

                <div className="Profile_General_song-container">
                    <h2>Top Songs <FontAwesomeIcon icon={faMicrophone} /></h2>
                    <div className="Profile_General_song">
                        <table className="Profile_General_song-table">
                            <thead>
                                <tr>
                                    <th className="Profile_General_song-table-header">Song</th>
                                    <th className="Profile_General_song-table-header">Artist</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                
                                this.props.topSong.map((e, index) => {
                                    return (
                                        
                                            <TopSongItem
                                                key={index}
                                                artist={e.artist_name}
                                                song={e.music_name}
                                            />
                                        
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default General;