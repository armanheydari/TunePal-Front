import React from 'react';
import Search from './Search';
import GroupList from './GroupList';
import FriendItem from './FriendItem';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import Axios from 'axios';
import tokenConfig from '../../../utils/tokenConfig';
import serverURL from '../../../utils/serverURL';
import ProfilePicture from '../../../assets/Default-Profile-Picture.jpg';

class GroupSidebar extends React.Component {
    state = {
        searchField: '',
        friendItem: [],
        friendItem1: [],
        selectedMembers: [],
        showModal: false
    }

    render() {
        return (
            <React.Fragment>
                <div id="Group_list-overlay" className="people-list">
                    <Search getFieldSearch={this.getFieldSearch} />
                    <div className="Group-new" size="large">
                        <button className="ui basic button Button" onClick={this.newClicked}>Create new group</button>
                    </div>
                    <Modal className="Group-new-modal" open={this.state.showModal}>
                        <Modal.Header>New Group</Modal.Header>
                        <Modal.Content scrolling>
                            <div className="name-container" style={{ textAlign: "center" }}>
                                <label className="name-label">Name:</label>
                                <input className="name" type="text" id="GroupName1" />
                            </div>
                            <ul className="list">
                                <React.Fragment>
                                    {this.state.friendItem1.map(friend =>
                                        <li className="item" id={friend.id} onClick={this.onFriendClicked} key={friend.id}>
                                            {friend.photo ?
                                                <img className="photo" src={friend.photo} alt="" />
                                                :
                                                <img className="photo" src={ProfilePicture} alt="" />
                                            }
                                            <div className="name">{friend.name}</div>
                                        </li>
                                    )}
                                </React.Fragment>
                            </ul>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button className="negative ui button" style={{ fontSize: "1.5rem" }} onClick={this.CancelClicked}>Cancel</Button>
                            <Button className="positive ui button" style={{ fontSize: "1.5rem" }} onClick={this.CreateClicked}>Create</Button>
                        </Modal.Actions>
                    </Modal>
                    <GroupList GroupList={this.props.GroupList} openGroup={this.props.openGroup} GroupID={this.props.GroupID} searchField={this.state.searchField} />
                </div>
                <div id="people-list" className="people-list">
                    <Search getFieldSearch={this.getFieldSearch} />
                    <div className="Group-new" size="large">
                        <button className="ui basic button Button" onClick={this.newClicked}>Create new group</button>
                    </div>
                    <Modal className="Group-new-modal" open={this.state.showModal}>
                        <Modal.Header>New Group</Modal.Header>
                        <Modal.Content scrolling>
                            <div className="name-container" style={{ textAlign: "center" }}>
                                <label className="name-label">Name:</label>
                                <input className="name" type="text" id="GroupName" />
                            </div>
                            <ul className="list">
                                <FriendItem friendItem={this.state.friendItem} selectedMembers={this.state.selectedMembers} />
                            </ul>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button className="negative ui button" style={{ fontSize: "1.5rem" }} onClick={this.CancelClicked}>Cancel</Button>
                            <Button className="positive ui button" style={{ fontSize: "1.5rem" }} onClick={this.CreateClicked}>Create</Button>
                        </Modal.Actions>
                    </Modal>
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

    newClicked = () => {
        this.setState({ showModal: true, friendItem: [], selectedMembers: [] })
        Axios.get(`${serverURL()}/chat/friendinfo/`, tokenConfig())
            .then(res => {
                let i = 0;
                res.data.forEach(friend => {
                    i = i + 1;
                    this.setState(prevState => {
                        return {
                            friendItem: [...prevState.friendItem, { name: friend.nickname, photo: friend.user_avatar, userName: friend.username, id: 'friend' + i }],
                            friendItem1: [...prevState.friendItem, { name: friend.nickname, photo: friend.user_avatar, userName: friend.username, id: 'friend ' + i }]
                        };
                    });
                });
            })
            .catch(err => {
            });
    }

    CreateClicked = () => {
        let result, flag = true;
        if (document.getElementById('GroupName').value === "") {
            alert("Please choose a name");
            flag = false;
        }
        if (this.state.selectedMembers.length === 0) {
            alert("You should choose at least one member");
            flag = false;
        }
        let temp = document.getElementById('GroupName').value, i;
        for (i = 0; i < this.state.selectedMembers.length; i++) {
            temp = temp.concat(',', this.state.selectedMembers[i]);
        }
        result = { name: temp };
        if (flag) {
            console.log(result);
            Axios.post(`${serverURL()}/chat/makegroup/`, JSON.stringify(result), tokenConfig());
        }
        this.setState({ showModal: false });
        window.location.reload(true);
    }

    CancelClicked = () => {
        this.setState({ showModal: false })
    }

    onFriendClicked = (e) => {
        const temp = document.getElementById(e.currentTarget.id).classList;
        if (!temp.contains('Friend-sticky')) {
            document.getElementById(e.currentTarget.id).classList.add('Friend-sticky');
            this.props.selectedMembers.push(e.currentTarget.id);
        }
        else {
            document.getElementById(e.currentTarget.id).classList.remove('Friend-sticky');
            let i;
            for (i = 0; i < this.props.selectedMembers.length; i++) {
                if (this.props.selectedMembers[i] === e.currentTarget.id) {
                    this.props.selectedMembers.splice(i, 1)
                }
            }
        }
    }
}

export default GroupSidebar;