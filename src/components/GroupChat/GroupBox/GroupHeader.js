import React from 'react';
import ProfilePicture from '../../../assets/Default-Profile-Picture.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

class GroupHeader extends React.Component {
    render() {
        return (
            <div className="Group-header clearfix">
                <FontAwesomeIcon icon={faArrowLeft}
                    onClick={this.onOpenGroupList}
                    className="Group_header-back"
                    style={{
                        float: "left",
                        marginRight: '3rem',
                        marginLeft: '1rem',
                        fontSize: '2rem',
                        cursor: 'pointer'
                    }}
                />
                    <Link to={`/profile/${this.props.username}`}>
                        <img
                            src={this.props.picture || ProfilePicture}
                            alt=""
                            width="55px"
                            height="55px"
                        />
                    </Link>
                    <div className="Group-about">
                        <div className="Group-with">{this.props.name}</div>
                    </div>
                
            </div>
        );
    }

    onOpenGroupList = () => {
        document.getElementById("Group").style.display = "none";
        document.getElementById("Group_list-overlay").style.display = "block";
        this.props.removeGroup();
    }
}

export default GroupHeader;