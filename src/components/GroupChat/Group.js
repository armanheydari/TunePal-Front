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
        wsConversation: undefined
    }

    componentDidMount() {
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
            })
            .catch(err => {
            });
    }

    render() {
        if (this.state.show) {
                return (
                <div className="Group-container clearfix">
                    <GroupSidebar GroupID={this.state.header.conversationID} GroupList={this.state.GroupList} openGroup={this.openGroup} />
                    <GroupBox wsConversation={this.state.wsConversation} header={this.state.header} send={this.sendMessage} removeGroup={this.removeGroup} />
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
        if (this.state.wsConversation) {
            this.state.wsConversation.close();
        }
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
                wsConversation: new WebSocket(
                    'wss://'
                    + 'mytunepal.ir'
                    + '/ws/chat/'
                    + `${header.conversationID}`
                    + '/'
                )
            };
        });
    }

    removeGroup = () => {
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

export default Group;