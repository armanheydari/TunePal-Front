import React from 'react';
import ChatSidebar from './ChatSidebar/ChatSidebar';
import ChatBox from './ChatBox/ChatBox';
import Axios from 'axios';
import NoChatSVG from '../../assets/sign.svg';
import tokenConfig from '../../utils/tokenConfig';
import serverURL from '../../utils/serverURL';

class Chat extends React.Component {
    state = {
        chatList: [],
        header: {},
        show: false,
        wsConversation: undefined
    }

    componentDidMount() {
        Axios.get(`${serverURL()}/chat/`, tokenConfig())
        .then(res => {
            const conversations = res.data.conversations;
            conversations.forEach(conversation => {
                const conversationID = conversation.id;
                const conversationMembers = conversation.members;
                let conversationTemp = {};
                let memberTemp = [];
                conversationTemp.conversationID = conversationID;
                conversationTemp.newMessages = conversation.new_messages;
                conversationTemp.lastMessage = conversation.last_message;
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
            this.setState(prevState => {
                return {
                    show: true
                }
            })
        })
        .catch(err => {
        });
    }

    render() {
        if (this.state.show) {
            if (this.state.chatList.length !== 0) {
                return (
                    <div className="chat-container clearfix">
                        <ChatSidebar chatID={this.state.header.conversationID} chatList={this.state.chatList} openChat={this.openChat} />
                        <ChatBox wsConversation={this.state.wsConversation} header={this.state.header} send={this.sendMessage} removeChat={this.removeChat} />
                    </div>
                );
            }
            return (
                <div className="Chat_noChat">
                    <img src={NoChatSVG} alt="" />
                    <p>You already don't have any chat.</p>
                    <p>Try to make a new conversation in Match.</p>
                </div>
            );
        }
        return (
            <div className="Homepage_load">
                <div className="ui active centered inline text loader massive">Loading</div>
            </div>
        );
    }

    openChat = (header) => {
        if (this.state.wsConversation) {
            this.state.wsConversation.close();
        }
        this.setState(prevState => {
            const newChatList = prevState.chatList.map(item => {
                if (item.conversationID === header.conversationID)
                    return {...item, newMessages: 0};
                return item;
            });
            return {
                header,
                messages: [],
                chatList: newChatList,
                wsConversation: new WebSocket(
                    'ws://'
                    + '185.97.119.64:8001'
                    + '/ws/chat/'
                    + `${header.conversationID}`
                    + '/'
                )
            };
        });
    }

    removeChat = () => {
        if (this.state.wsConversation) {
            this.state.wsConversation.close();
        }
        this.setState(prevState => {
            return {
                header: {},
                messages: []
            };
        });
    }

    sendMessage = (message) => {
        const toBack = {
            text: message
        };
        const toBackJSON = JSON.stringify(toBack);
        this.state.wsConversation.send(toBackJSON);
    }
}

export default Chat;