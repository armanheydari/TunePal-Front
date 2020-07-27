import React from 'react';
import GroupMessageItem from './GroupMessageItem';

class GroupMessageList extends React.Component {
    render() {
        return (
            <ul>
                {
                    this.props.messages.map((message, index) => {
                        return (
                            <GroupMessageItem
                                key={index}
                                isMe={message.is_client}
                                name={message.sender_id.nickname}
                                date={message.date}
                                message={message.text}
                            />
                        );
                    })
                }
            </ul>
        );
    }
}

export default GroupMessageList;