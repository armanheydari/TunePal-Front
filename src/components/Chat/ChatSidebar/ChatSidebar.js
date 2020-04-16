import React from 'react';
import Search from './Search';
import ChatList from './ChatList';

class ChatSidebar extends React.Component {
    render() {
        return (
            <div className="people-list">
                <Search />
                <ChatList chatList={this.props.chatList} openChat={this.props.openChat} chatID={this.props.chatID} />
            </div>
        );
    }

}

export default ChatSidebar;