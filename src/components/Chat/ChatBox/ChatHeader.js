import React from 'react';
import ProfilePicture from '../../../assets/Default-Profile-Picture.jpg';

class ChatHeader extends React.Component {
    render() {
        return (
            <div className="chat-header clearfix">
                <img
                    src={this.props.picture || ProfilePicture}
                    alt={`${this.props.name}-avatar`}
                    width="55px"
                    height="55px"
                />
                <div className="chat-about">
                    <div className="chat-with">{this.props.name}</div>
                    <div className="chat-num-messages">{this.props.description}</div>
                </div>
            </div>
        );
    }
}

export default ChatHeader;