import React from 'react';
import ChatMessageList from './ChatMessageList';

class ChatHistory extends React.Component {
    render() {
        return (
            <div className="chat-history">
                <ChatMessageList messages={this.props.messages} />
            </div>
        );
    }
}

export default ChatHistory;