import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

class GroupSend extends React.Component {
    state = {
        messageToSend: ""
    }

    render() {
        return (
            <div className="Group-message clearfix">
                <textarea
                    name="messageToSend"
                    placeholder="Type your message"
                    value={this.state.messageToSend}
                    rows="1"
                    onChange={this.onChange}
                    onKeyPress={this.handleEnter}
                ></textarea>
                <button onClick={this.handleSend}><FontAwesomeIcon icon={faPaperPlane} /></button>
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

    handleEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (this.state.messageToSend.trim() !== '') {
                this.props.send(this.state.messageToSend);
                this.setState(prevState => {
                    return {
                        messageToSend: ""
                    };
                });
            }
        }
    }

    handleSend = () => {
        if (this.state.messageToSend.trim() !== '') {
            this.props.send(this.state.messageToSend);
            this.setState(prevState => {
                return {
                    messageToSend: ""
                };
            });
        }
    }
}

export default GroupSend;

//url post id Group dare
//text to body
//token to header