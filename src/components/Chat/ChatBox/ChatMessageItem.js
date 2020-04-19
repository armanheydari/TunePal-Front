import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

class ChatMessageItem extends React.Component {
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

export default ChatMessageItem;

function dateParser(timeStamp) {
    const date = timeStamp.split("T")[0];
    const dateArray = date.split("-"); //0:year 1:month 2:day
    const timeArray = timeStamp.split("T")[1].split(":"); //0:hour 1:minute
    const today = new Date();
    const todayYear = today.getFullYear();
    let todayMonth = today.getMonth() + 1;
    if (todayMonth < 10) {
        todayMonth = "0" + todayMonth;
    }
    let todayDay = today.getDate();
    if (todayDay < 10) {
        todayDay = "0" + todayDay;
    }
    if (`${dateArray[0]}` === `${todayYear}` && `${dateArray[1]}` === `${todayMonth}` && `${dateArray[2]}` === `${todayDay}`) {
        return timeArray[0] + ":" + timeArray[1] + ", Today";
    }
    return timeArray[0] + ":" + timeArray[1] + ", " + date;
}