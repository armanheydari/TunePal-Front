import React from 'react';
import GroupMessageList from './GroupMessageList';
import Axios from 'axios';
import serverURL from '../../../utils/serverURL';
import tokenConfig from '../../../utils/tokenConfig';

class GroupHistory extends React.Component {
    state = {
        messages: []
    }

    render() {
        return (
            <div id="Group-history" className="Group-history">
                <GroupMessageList messages={this.state.messages} />
            </div>
        );
    }

    componentDidMount() {
        this.scrollToBottum();
        Axios.get(`${serverURL()}/chat/${this.props.conversationID}/`, tokenConfig())
        .then(res => {
            const messages = res.data.messages;
            this.setState(prevState => {
                return {
                    messages
                };
            });
        });
    }

    componentDidUpdate(prevProps) {
        this.scrollToBottum();
        if (prevProps.conversationID !== this.props.conversationID) {
            this.setState(
                prevState => {
                    return {
                        messages: []
                    }
                },
                () => {
                    Axios.get(`${serverURL()}/chat/${this.props.conversationID}/`, tokenConfig())
                    .then(res => {
                        const messages = res.data.messages;
                        this.setState(prevState => {
                            return {
                                messages
                            };
                        });
                    });
                }
            );
        }

        if (prevProps.lastNewMessage !== this.props.lastNewMessage) {
            if (this.props.conversationID === this.props.lastNewMessage.conversation_id) {
                this.setState(prevState => {
                    return {
                        messages: prevState.messages.concat(this.props.lastNewMessage)
                    };
                });
            }
        }
    }

    scrollToBottum = () => {
        let GroupHistory = document.getElementById("Group-history");
        GroupHistory.scrollTop = GroupHistory.scrollHeight;
    }
}

export default GroupHistory;