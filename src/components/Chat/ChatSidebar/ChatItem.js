import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import ProfilePicture from '../../../assets/Default-Profile-Picture.jpg';

class ChatItem extends React.Component {
    render() {
        return (
            <Link to={`/chat/${this.props.id}`} onClick={this.onClick}>
                <li className="clearfix" style={this.styleChatListItem()}>
                    <img
                        src={this.props.picture || ProfilePicture}
                        alt={`${this.props.name}-avatar`}
                        width="55px"
                        height="55px"
                    />
                    <div className="about">
                        <div className="name">{this.props.name}</div>
                        <div className="status">
                            <FontAwesomeIcon icon={faCircle} className="online" /> {this.props.status}
                        </div>
                    </div>
                </li>
            </Link>
        );
    }

    styleChatListItem = () => {
        if (this.props.id === this.props.chatID) {
            return {
                backgroundColor: "#c4c6ce"
            };
        }
    }

    onClick = () => {
        const header = {
            picture: this.props.picture,
            name: this.props.name,
            conversationID: this.props.id
        }
        this.props.openChat(header);
    }
}

export default ChatItem;