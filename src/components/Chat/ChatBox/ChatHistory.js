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
        let chatHistory = document.getElementById("chat-history");
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }
}

export default ChatHistory;