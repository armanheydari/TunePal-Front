import React from 'react';
import Search from './Search';
import GroupList from './GroupList';

class GroupSidebar extends React.Component {
    state = {
        searchField: ''
    }

    render() {
        return (
            <React.Fragment>
                <div id="Group_list-overlay" className="people-list">
                    <Search getFieldSearch={this.getFieldSearch} />
                    <GroupList GroupList={this.props.GroupList} openGroup={this.props.openGroup} GroupID={this.props.GroupID} searchField={this.state.searchField} />
                </div>
                <div id="people-list" className="people-list">
                    <Search getFieldSearch={this.getFieldSearch} />
                    <GroupList GroupList={this.props.GroupList} openGroup={this.props.openGroup} GroupID={this.props.GroupID} searchField={this.state.searchField} />
                </div>
            </React.Fragment>
        );
    }

    getFieldSearch = (searchField) => {
        this.setState(prevState => {
            return {
                searchField
            };
        })
    }
}

export default GroupSidebar;