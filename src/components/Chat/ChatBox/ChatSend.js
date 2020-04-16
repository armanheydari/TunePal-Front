import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faFileImage } from '@fortawesome/free-solid-svg-icons';

class ChatSend extends React.Component {
    state = {
        messageToSend: ""
    }

    render() {
        return (
            <div className="chat-message clearfix">
                <textarea
                    name="messageToSend"
                    placeholder="Type your message"
                    value={this.state.messageToSend}
                    rows="3"
                    onChange={this.onChange}
                ></textarea>
                <FontAwesomeIcon icon={faFile} className="fa-file-o" /> &nbsp;&nbsp;&nbsp;
                <FontAwesomeIcon icon={faFileImage} className="fa-file-image-o" />
                <button onClick={this.handleSend}>Send</button>
            </div>
        );
    }

    onChange = (e) => {
        const field = e.target.name;
        const newValue = e.target.value;
        this.setState(() => {
            return {
                [field]: newValue
            };
        });
    }

    handleSend = () => {
        if (this.state.messageToSend) {
            this.props.send(this.state.messageToSend);
            this.setState(prevState => {
                return {
                    messageToSend: ""
                };
            });
        }
    }
}

export default ChatSend;

//url post id chat dare
//text to body
//token to header