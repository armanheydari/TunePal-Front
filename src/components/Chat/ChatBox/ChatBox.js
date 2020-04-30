import React from 'react';
import ChatHeader from './ChatHeader';
import ChatHistory from './ChatHistory';
import ChatSend from './ChatSend';

class ChatBox extends React.Component {
    render() {
        if (Object.keys(this.props.header).length) {
            return (
                <div id="chat" className="chat">
                    <ChatHeader
                        picture={this.props.header.picture}
                        name={this.props.header.name}
                        description="Description"
                        removeChat={this.props.removeChat}
                    />
                    <ChatHistory messages={this.props.messages} />
                    <ChatSend send={this.props.send} />
                </div>
            );
        }
        return (
            <div id="chat" className="chat">
                <div className="Chat_noChatSelected">
                    <p>Please select a chat to start messaging.</p>
                </div>
            </div>
        );
    }

    
}

export default ChatBox;