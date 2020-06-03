import React from 'react';
import { Link } from 'react-router-dom';
import ProfilePicture from '../../../assets/Default-Profile-Picture.jpg';

class GroupItem extends React.Component {
    render() {
        return (
            <Link to={`/Group/${this.props.conversationID}`} onClick={this.onClick}>
                <li className="clearfix" style={this.styleGroupListItem()}>
                    <div className="about">
                        <div className="name">{this.props.name}
                        </div>
                        <div className="lastMessage">
                            {this.props.lastMessage.text ? `${this.senderName()}: ${this.props.lastMessage.text}` : "No messages yet"}
                        </div>
                    </div>
                </li>
            </Link>
        );
    }

    styleGroupListItem = () => {
        if (this.props.conversationID === this.props.GroupID) {
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
            conversationID: this.props.conversationID,
            members: this.props.members
        }
        this.props.openGroup(header);
        document.getElementById("Group_list-overlay").style.display = "none";
        document.getElementById("Group").style.display = "block";
    }

    senderName = () => {
        // this.props.members.forEach(member => {
        //     if (this.props.lastMessage.nickname === member.nickname) {
        //         return member.nickname;
        //     }
        // });
        // return 'You';
        return this.props.lastMessage.nickname;
    }
}

export default GroupItem;