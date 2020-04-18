import React from 'react';
import ChatMessageItem from './ChatMessageItem';

class ChatMessageList extends React.Component {
    render() {
        return (
            <ul>
                {
                    this.props.messages.map((message, index) => {
                        return (
                            <ChatMessageItem
                                key={index}
                                isMe={message.is_client}
                                name={message.sender_id.nickname}
                                date={message.date}
                                message={message.text}
                            />
                        );
                    })
                }
            </ul>
        );
    }
}

export default ChatMessageList;