import React from 'react';
import ChatHeader from './ChatHeader';
import ChatHistory from './ChatHistory';
import ChatSend from './ChatSend';

class ChatBox extends React.Component {
    render() {
        return (
            <div className="chat">
                <ChatHeader
                    picture={this.props.header.picture}
                    name={this.props.header.name}
                    description="Description"
                />
                <ChatHistory messages={this.props.messages} />
                <ChatSend send={this.props.send} />
            </div>
        );
    }

    
}

export default ChatBox;