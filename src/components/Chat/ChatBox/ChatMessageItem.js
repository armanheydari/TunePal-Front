import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

class ChatMessageItem extends React.Component {
    render() {
        if (this.props.isMe) {
            return (
                <li className="clearfix">
                <div className="message-data align-right">
                    <span className="message-data-time">{this.props.date}</span> &nbsp; &nbsp;
                    <span className="message-data-name">{this.props.name} </span>
                    <FontAwesomeIcon icon={faCircle} className="me" />
                </div>
                <div className="message other-message float-right">{this.props.message}</div>
            </li>
            );
        }

        return (
            <li>
                <div className="message-data">
                    <span className="message-data-name"><FontAwesomeIcon icon={faCircle} className="online" /> {this.props.name}</span>
                    <span className="message-data-time">{this.props.date}</span>
                </div>

                <div className="message my-message">{this.props.message}</div>
            </li>
        );
    }
} 

export default ChatMessageItem;

function liStyle(isMe) {
    if (isMe) {
        return "clearfix";
    }
    return "";
}

function divStyle(isMe) {
    if (isMe) {
        return "message-data align-right";
    }
    return "message-data";
}

function divMessageStyle(isMe) {
    if (isMe) {
        return "message my-message";
    }
    return "message other-message float-right";
}




function messageStyle(isMe) {
    if (isMe) {
        return {
            color: "red"
        };
    }
    else {
        return {
            color: "blue"
        };
    }
}
