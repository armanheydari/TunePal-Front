import React from 'react';
import GroupHeader from './GroupHeader';
import GroupHistory from './GroupHistory';
import GroupSend from './GroupSend';

class GroupBox extends React.Component {
    render() {
        if (Object.keys(this.props.header).length) {
            return (
                <div id="Group" className="Group">
                    <GroupHeader
                        picture={this.props.header.picture}
                        name={this.props.header.name}
                        removeGroup={this.props.removeGroup}
                        username={this.props.header.username}
                    />
                    <GroupHistory conversationID={this.props.header.conversationID} wsConversation={this.props.wsConversation} />
                    <GroupSend send={this.props.send} wsConversation={this.props.wsConversation} />
                </div>
            );
        }
        return (
            <div id="Group" className="Group">
                <div className="Group_noGroupSelected">
                    <p>Please select a Group to start messaging.</p>
                </div>
            </div>
        );
    }

    
}

export default GroupBox;