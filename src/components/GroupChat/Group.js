import React from 'react';
import GroupSidebar from './GroupSidebar/GroupSidebar';
import GroupBox from './GroupBox/GroupBox';
import Axios from 'axios';
import tokenConfig from '../../utils/tokenConfig';
import serverURL from '../../utils/serverURL';

class Group extends React.Component {
    state = {
        GroupList: [],
        header: {},
        show: false,
        lastNewMessage: {}
    }

    componentDidMount() {
        this.initGroupList();
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
            this.setState(prevState => {
                const chatListTemp = prevState.GroupList.map(item => {
                    if (item.conversationID === parsedData.conversation_id) {
                        let newMessages = 0;
                        const temp = {
                            conversationID: item.conversationID,
                            lastMessage: {
                                nickname: parsedData.sender_id.nickname,
                                text: parsedData.text
                            },
                            members: item.members,
                            newMessages: 0,
                            name: item.name
                        };
                        return temp;
                    }
                    return item;
                });
                return {
                    GroupList: chatListTemp
                };
            });
        }
    }

    render() {
        if (this.state.show) {
                return (
                <div className="Group-container clearfix">
                    <GroupSidebar GroupID={this.state.header.conversationID} GroupList={this.state.GroupList} openGroup={this.openGroup} />
                    <GroupBox
                        header={this.state.header}
                        send={this.sendMessage}
                        removeGroup={this.removeGroup}
                        lastNewMessage={this.state.lastNewMessage}
                    />
                </div>
            );
        }
        return (
            <div className="Homepage_load">
                <div className="ui active centered inline text loader massive">Loading</div>
            </div>
        );
    }

    openGroup = (header) => {
        this.setState(prevState => {
            const newGroupList = prevState.GroupList.map(item => {
                if (item.conversationID === header.conversationID)
                    return { ...item, newMessages: 0 };
                return item;
            });
            return {
                header,
                messages: [],
                GroupList: newGroupList,
            };
        });
    }

    removeGroup = () => {
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

    initGroupList = () => {
        Axios.get(`${serverURL()}/chat/groupinfo/`, tokenConfig())
        .then(res => {
            const conversations = res.data.conversations;
            conversations.forEach(conversation => {
                const conversationMembers = conversation.members;
                const conversationID = conversation.id;
                let conversationTemp = {};
                let memberTemp = [];
                conversationTemp.newMessages = conversation.new_messages;
                conversationTemp.lastMessage = conversation.last_message;
                conversationTemp.name = conversation.name;
                conversationTemp.conversationID = conversationID;
                conversationMembers.forEach(member => {
                    if (member.to_show) {
                        memberTemp.push(member);
                    }
                });
                conversationTemp.members = memberTemp;
                this.setState(prevState => {
                    const GroupList = prevState.GroupList.concat(conversationTemp);
                    return {
                        GroupList
                    };
                });
            });
            this.setState(prevState => {
                return {
                    show: true
                }
            })
        });
    }
}

export default Group;