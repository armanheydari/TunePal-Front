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
                        <div className="name">{this.props.name}</div>
                        <div className="lastMessage">
                            Hi ali How are you ? i m not good why you hate me ?
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
}

export default ChatItem;