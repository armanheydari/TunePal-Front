import React from 'react';
import ChatSidebar from './ChatSidebar/ChatSidebar';
import ChatBox from './ChatBox/ChatBox';
import Axios from 'axios';
import './styles/Chat.scss';

function tokenConfig() {
    const config = {
        mode: "cors",
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('token')}`
        }
    }
    return config;
}

class Chat extends React.Component {
    state = {
        chatList: [],
        header: {},
        messages: []
    }

    componentDidMount() {
        Axios.get("http://tunepal.pythonanywhere.com/chat/", tokenConfig())
        .then(res => {
            const conversations = res.data.conversations;
            conversations.forEach(conversation => {
                const conversationID = conversation.id;
                const conversationMembers = conversation.members;
                let conversationTemp = {};
                let memberTemp = [];
                conversationTemp.conversationID = conversationID;
                conversationMembers.forEach(member => {
                    if (member.to_show) {
                        memberTemp.push(member);
                    }
                });
                conversationTemp.members = memberTemp;
                this.setState(prevState => {
                    const chatList = prevState.chatList.concat(conversationTemp);
                    return {
                        chatList
                    };
                });
            });
            const firstConversationHeader = {
                picture: this.state.chatList[0].members[0].user_avatar,
                name: this.state.chatList[0].members[0].nickname,
                conversationID: this.state.chatList[0].conversationID
            };
            this.openChat(firstConversationHeader)
        })
        .catch(err => {
            console.log(err.data)
        });
    }

    render() {
        // setInterval(this.openChat(this.state.header), 100000);
        return (
            <div className="chat-container clearfix">
                <ChatSidebar chatID={this.state.header.conversationID} chatList={this.state.chatList} openChat={this.openChat} />
                <ChatBox header={this.state.header} messages={this.state.messages} send={this.sendMessage} />
            </div>
        );
    }

    openChat = (header) => {
        this.getMessages(header.conversationID);
        this.setState(prevState => {
            return {
                header
            };
        });
    }

    getMessages = (conversationID) => {
        Axios.get(`http://tunepal.pythonanywhere.com/chat/${conversationID}/`, tokenConfig())
        .then(res => {
            const messages = res.data.messages;
            this.setState(prevState => {
                return {
                    messages
                };
            });
            console.log(this.state.currentChat.messages)
        })
        .catch(err => {
            console.log(err.data);
        });
    }

    sendMessage = (message) => {
        const conversationID = this.state.header.conversationID;
        const toBack = {
            message
        };
        const toBackJSON = JSON.stringify(toBack);
        const a = Axios.post(`http://tunepal.pythonanywhere.com/chat/${conversationID}/`, {toBackJSON}, tokenConfig());
        console.log(a);

        //send new message to back and update the messages
    }
}

export default Chat;