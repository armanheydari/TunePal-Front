import React from 'react';
import Search from './Search';
import ChatList from './ChatList';

class ChatSidebar extends React.Component {
    state = {
        searchField: ''
    }

    render() {
        return (
            <div className="people-list">
                <Search getFieldSearch={this.getFieldSearch} />
                <ChatList chatList={this.props.chatList} openChat={this.props.openChat} chatID={this.props.chatID} searchField={this.state.searchField} />
            </div>
        );
    }

    getFieldSearch = (searchField) => {
        this.setState(prevState => {
            return {
                searchField
            };
        })
    }
}

export default ChatSidebar;