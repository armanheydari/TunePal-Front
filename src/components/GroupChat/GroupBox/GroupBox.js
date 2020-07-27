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
                        name={this.props.header.name}
                        removeGroup={this.props.removeGroup}
                        conversationID={this.props.header.conversationID}
                        members={this.props.header.members}
                    />
                    <GroupHistory conversationID={this.props.header.conversationID} lastNewMessage={this.props.lastNewMessage} />
                    <GroupSend send={this.props.send} />
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