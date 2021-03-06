import React from 'react';
import { Link } from 'react-router-dom';
import ProfilePicture from '../../../assets/Default-Profile-Picture.jpg';

class ChatItem extends React.Component {
    render() {
        return (
            <Link to={`/chat/${this.props.id}`} onClick={this.onClick}>
                <li className="clearfix" style={this.styleChatListItem()}>
                    <img
                        style={this.styleOnline()}
                        src={this.props.picture || ProfilePicture}
                        alt=""
                        width="55px"
                        height="55px"
                    />
                    <div className="about">
                        <div className="name">{this.props.name}
                            {this.props.newMessages > 0 && <span className="Chat_newMessages">{this.props.newMessages}</span>}
                        </div>
                        <div className="lastMessage">
                            {this.props.lastMessage.text ? `${this.senderName()}: ${this.props.lastMessage.text}` : "No messages yet"}
                        </div>
                    </div>
                </li>
            </Link>
        );
    }

    styleChatListItem = () => {
        if (this.props.id === this.props.chatID) {
            return {
                background: "linear-gradient(to right, #ff2053, #ff310d)"
            };
        }
    }

    styleOnline = () => {
        if (this.props.status === "Online") {
            return {
                borderRadius: "100%",
                border: "4px solid green"
            }
        }

        else {
            return {
                borderRadius: "100%",
                border: "4px solid #73788c"
            }
        }
    }

    onClick = () => {
        const header = {
            picture: this.props.picture,
            name: this.props.name,
            conversationID: this.props.id,
            username: this.props.username
        }
        this.props.openChat(header);
        document.getElementById("Chat_list-overlay").style.display = "none";
        document.getElementById("chat").style.display = "block";
    }

    senderName = () => {
        if (this.props.lastMessage.nickname !== this.props.name) {
            return "You";
        }
        return this.props.lastMessage.nickname;
    }
}

export default ChatItem;