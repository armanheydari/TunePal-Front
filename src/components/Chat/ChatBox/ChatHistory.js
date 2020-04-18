import React from 'react';
import ChatMessageList from './ChatMessageList';

class ChatHistory extends React.Component {
    render() {
        return (
            <div id="chat-history" className="chat-history">
                <ChatMessageList messages={this.props.messages} />
            </div>
        );
    }

    componentDidMount() {
        this.scrollToBottum();
    }

    componentDidUpdate() {
        this.scrollToBottum();
    }

    scrollToBottum = () => {
        let chatHistory = document.getElementById("chat-history");
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }
}

export default ChatHistory;