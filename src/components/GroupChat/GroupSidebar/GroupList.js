import React from 'react';
import GroupItem from './GroupItem';

class GroupList extends React.Component {

    // componentDidUpdate(prevProps) {
    //     if (prevProps.searchField !== this.props.searchField) {
    //         this.setState(prevState => {
    //             return {
    //                 filtered: this.props.GroupList.filter(this.filterGroupList)
    //             };
    //         });
    //     }
    // }

    render() {
        let filtered = this.props.GroupList.filter(this.filterGroupList);
        return (
            <ul>
                {
                    filtered.map(item => {
                        return (
                            <GroupItem 
                                key={item.conversationID}
                                picture={item.members[0].user_avatar}
                                name={item.members[0].nickname}
                                status={item.members[0].status}
                                id={item.conversationID}
                                openGroup={this.props.openGroup}
                                GroupID={this.props.GroupID}
                                username={item.members[0].username}
                                lastMessage={item.lastMessage}
                                newMessages={item.newMessages}
                            />
                        );
                    })
                }          
            </ul>
        );
    }

    filterGroupList = (item) => {
        if (this.props.searchField.trim(" ") === "") {
            return true;
        }
        if (item.members[0].nickname.toLowerCase().includes(this.props.searchField.trim(" ").toLowerCase())) {
            return true;
        }
    }
}

export default GroupList;