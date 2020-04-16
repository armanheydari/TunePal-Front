import React from 'react';
import ChatItem from './ChatItem';

class ChatList extends React.Component {
    render() {
        return (
            <ul>
                {
                    this.props.chatList.map(item => {
                        return (
                            <ChatItem 
                                key={item.conversationID}
                                picture={item.members[0].user_avatar}
                                name={item.members[0].nickname}
                                status={item.members[0].status}
                                id={item.conversationID}
                                openChat={this.props.openChat}
                                chatID={this.props.chatID}
                            />
                        );
                    })
                }          
            </ul>
        );
    }

}

export default ChatList;