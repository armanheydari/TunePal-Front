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
        messages: [],
        show: false
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
            this.openChat(firstConversationHeader);
            this.setState(prevState => {
                return {
                    show: true
                };
            });
        })
        .catch(err => {
            console.log(err.data)
        });
    }

    render() {
        if (this.state.show) {
            return (
                <div className="chat-container clearfix">
                    <ChatSidebar chatID={this.state.header.conversationID} chatList={this.state.chatList} openChat={this.openChat} />
                    <ChatBox header={this.state.header} messages={this.state.messages} send={this.sendMessage} />
                </div>
            );
        }
        return null;
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
        })
        .catch(err => {
            console.log(err.data);
        });
    }

    sendMessage = (message) => {
        const latestMessageIndex = this.state.messages.length - 1;
        const conversationID = this.state.header.conversationID;
        const toBack = {
            text: message
        };
        const toBackJSON = JSON.stringify(toBack);
        Axios.post(`http://tunepal.pythonanywhere.com/chat/${conversationID}/`, toBackJSON, tokenConfig())
        .then(res => {
            const allMessages = res.data.messages;
            let newMessages = [];
            for (let i = latestMessageIndex + 1; i < allMessages.length; i++) {
                newMessages.push(allMessages[i]);
            }
            this.setState(prevState => {
                const messages = prevState.messages.concat(newMessages);
                return {
                    messages
                };
            });
        })
        .catch(err => {
            console.log(err.data);
        });
    }
}

export default Chat;