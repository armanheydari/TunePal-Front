import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

class GroupMessageItem extends React.Component {
    render() {
        if (this.props.isMe) {
            return (
                <li className="clearfix">
                    <div className="message-data align-right">
                        <span className="message-data-time">{dateParser(this.props.date)}</span> &nbsp; &nbsp;
                        <span className="message-data-name">{this.props.name} </span>
                        <FontAwesomeIcon icon={faCircle} className="me" />
                    </div>
                    <div className="message other-message float-right">{this.props.message}</div>
                </li>
            );
        }

        return (
            <li>
                <div className="message-data">
                    <span className="message-data-name"><FontAwesomeIcon icon={faCircle} className="online" /> {this.props.name}</span>
                    <span className="message-data-time">{dateParser(this.props.date)}</span>
                </div>

                <div className="message my-message">{this.props.message}</div>
            </li>
        );
    }
} 

export default GroupMessageItem;

function dateParser(timeStamp) {
    const timeStampGMT = new Date(timeStamp);
    const date = timeStampGMT.toLocaleDateString().toString();
    const time = timeStampGMT.toLocaleTimeString().toString();
    let result = "";
    if (date === new Date().toLocaleDateString()) {
        result = result.concat("Today, ");
    }
    else {
        result = result.concat(date + ", ");
    }
    result = result.concat(time.split(":")[0] + ":" + time.split(":")[1] + " " + time.split(" ")[1]);
    return result;
}