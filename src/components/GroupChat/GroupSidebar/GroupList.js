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
                                name={item.name}
                                conversationID={item.conversationID}
                                openGroup={this.props.openGroup}
                                members={item.members}
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
        if (item.name.toLowerCase().includes(this.props.searchField.trim(" ").toLowerCase())) {
            return true;
        }
    }
}

export default GroupList;