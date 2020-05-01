import React from 'react';
import ProfilePicture from '../../../assets/Default-Profile-Picture.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

class ChatHeader extends React.Component {
    render() {
        return (
            <div className="chat-header clearfix">
                <FontAwesomeIcon icon={faArrowLeft}
                    onClick={this.onOpenChatList}
                    className="Chat_header-back"
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
                    <div className="chat-about">
                        <div className="chat-with">{this.props.name}</div>
                    </div>
                </Link>
            </div>
        );
    }

    onOpenChatList = () => {
        document.getElementById("chat").style.display = "none";
        document.getElementById("Chat_list-overlay").style.display = "block";
        this.props.removeChat();
    }
}

export default ChatHeader;