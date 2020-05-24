import React from 'react';
import GroupSidebar from './GroupSidebar/GroupSidebar';
import GroupBox from './GroupBox/GroupBox';
import Axios from 'axios';
import NoGroupSVG from '../../assets/sign.svg';
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
            if (this.state.GroupList.length !== 0) {
                return (
                    <div className="Group-container clearfix">
                        <GroupSidebar GroupID={this.state.header.conversationID} GroupList={this.state.GroupList} openGroup={this.openGroup} />
                        <GroupBox wsConversation={this.state.wsConversation} header={this.state.header} send={this.sendMessage} removeGroup={this.removeGroup} />
                    </div>
                );
            }
            return (
                <div className="Group_noGroup">
                    <img src={NoGroupSVG} alt="" />
                    <p>You already don't have any Group.</p>
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

    openGroup = (header) => {
        if (this.state.wsConversation) {
            this.state.wsConversation.close();
        }
        this.setState(prevState => {
            const newGroupList = prevState.GroupList.map(item => {
                if (item.conversationID === header.conversationID)
                    return {...item, newMessages: 0};
                return item;
            });
            return {
                header,
                messages: [],
                GroupList: newGroupList,
                wsConversation: new WebSocket(
                    'ws://'
                    + 'mytunepal.ir'
                    + '/ws/Group/'
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