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
        console.log(this.props.wsConversation);
        const ws = this.props.wsConversation;
        console.log(ws);
        ws.onopen = () => {
            console.log('open');
            Axios.get(`${serverURL()}/Group/${this.props.conversationID}/`, tokenConfig())
            .then(res => {
                const messages = res.data.messages;
                this.setState(prevState => {
                    return {
                        messages
                    };
                });
            })
            .catch(err => {
            });
        }

        ws.onmessage = evt => {
            const message = JSON.parse(evt.data);
            console.log(message);
            this.setState(prevState => {
                return {
                    messages: [...prevState.messages, message]
                };
            });
        }

        ws.onclose = () => {
            console.log('closed');
        }
    }

    componentDidUpdate() {
        this.scrollToBottum();
    }

    componentWillUnmount() {
        console.log('inside component will unmount')
        // this.props.wsConversation.close();
    }

    scrollToBottum = () => {
        let GroupHistory = document.getElementById("Group-history");
        GroupHistory.scrollTop = GroupHistory.scrollHeight;
    }
}

export default GroupHistory;