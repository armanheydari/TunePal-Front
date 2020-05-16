import React from 'react';
import ChatMessageList from './ChatMessageList';
import Axios from 'axios';
import serverURL from '../../../utils/serverURL';
import tokenConfig from '../../../utils/tokenConfig';

class ChatHistory extends React.Component {
    state = {
        messages: []
    }

    render() {
        return (
            <div id="chat-history" className="chat-history">
                <ChatMessageList messages={this.state.messages} />
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
            Axios.get(`${serverURL()}/chat/${this.props.conversationID}/`, tokenConfig())
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
            console.log(evt);
        }

        ws.onclose = () => {
            console.log('closed');
        }
    }

    componentDidUpdate() {
        this.scrollToBottum();
    }

    scrollToBottum = () => {
        let chatHistory = document.getElementById("chat-history");
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }
}

export default ChatHistory;