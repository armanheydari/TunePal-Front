import React from 'react';
import ChatItem from './ChatItem';

class ChatList extends React.Component {

    // componentDidUpdate(prevProps) {
    //     if (prevProps.searchField !== this.props.searchField) {
    //         this.setState(prevState => {
    //             return {
    //                 filtered: this.props.chatList.filter(this.filterChatList)
    //             };
    //         });
    //     }
    // }

    render() {
        let filtered = this.props.chatList.filter(this.filterChatList);
        return (
            <ul>
                {
                    filtered.map(item => {
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

    filterChatList = (item) => {
        if (this.props.searchField.trim(" ") === "") {
            return true;
        }
        if (item.members[0].nickname.toLowerCase().includes(this.props.searchField.trim(" ").toLowerCase())) {
            return true;
        }
    }
}

export default ChatList;