import React from 'react';
import ChatSidebar from './ChatSidebar/ChatSidebar';
import ChatBox from './ChatBox/ChatBox';
import Axios from 'axios';
import NoChatSVG from '../../assets/sign.svg';
import tokenConfig from '../../utils/tokenConfig';
import serverURL from '../../utils/serverURL';
import { notification  } from 'antd';

class Chat extends React.Component {
    state = {
        chatList: [],
        header: {},
        show: false,
        lastNewMessage: {}
    }

    componentDidMount() {
        this.initChatList();
        this.props.ws.onmessage = evt => {
            const parsedData = JSON.parse(evt.data);
            const lastNewMessage = {
                conversation_id: parsedData.conversation_id,
                date: parsedData.date,
                is_client: parsedData.is_client,
                is_seen: true,
                sender_id: {
                    nickname: parsedData.sender_id.nickname
                },
                text: parsedData.text
            }
            this.setState(prevState => {
                return {
                    lastNewMessage
                };
            });
            if (!parsedData.is_client && parsedData.conversation_id !== this.state.header.conversationID && !parsedData.is_group) {
                notification.info({
                    message: parsedData.sender_id.nickname,
                    description: parsedData.text,
                    placement: 'bottomRight'
                });
            }
            this.setState(prevState => {
                const chatListTemp = prevState.chatList.map(item => {
                    if (item.conversationID === parsedData.conversation_id) {
                        let newMessages = 0;
                        if (this.state.header.conversationID === parsedData.conversation_id) {
                            newMessages = 0;
                        }
                        else {
                            newMessages = parsedData.is_client ? 0 : item.newMessages + 1;
                        }
                        const temp = {
                            conversationID: item.conversationID,
                            lastMessage: {
                                nickname: parsedData.sender_id.nickname,
                                text: parsedData.text
                            },
                            members: item.members,
                            newMessages
                        };
                        return temp;
                    }
                    return item;
                });
                return {
                    chatList: chatListTemp
                };
            });
        }
    }

    render() {
        if (this.state.show) {
            if (this.state.chatList.length !== 0) {
                return (
                    <div className="chat-container clearfix">
                        <ChatSidebar chatID={this.state.header.conversationID} chatList={this.state.chatList} openChat={this.openChat} />
                        <ChatBox
                            header={this.state.header}
                            send={this.sendMessage}
                            removeChat={this.removeChat} 
                            lastNewMessage={this.state.lastNewMessage}
                        />
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
            };
        });
    }

    removeChat = () => {
        this.setState(prevState => {
            return {
                header: {},
                messages: []
            };
        });
    }

    sendMessage = (message) => {
        const toBack = {
            text: message,
            id: this.state.header.conversationID
        };
        const toBackJSON = JSON.stringify(toBack);
        this.props.ws.send(toBackJSON);
    }

    initChatList = () => {
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
}

export default Chat;