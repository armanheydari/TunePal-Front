import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import Axios from 'axios';
import ProfilePicture from '../../../assets/Default-Profile-Picture.jpg';
import tokenConfig from '../../../utils/tokenConfig';
import serverURL from '../../../utils/serverURL';
import FriendItem from '../GroupSidebar/FriendItem';

class GroupHeader extends React.Component {
    state = {
        memberItem: [],
        showMainModal: false,
        showAddModal: false,
        friendItem: [],
        selectedMembers: []
    }
    render() {
        return (
            <div className="Group-header clearfix">
                <FontAwesomeIcon icon={faArrowLeft}
                    onClick={this.onOpenGroupList}
                    className="Group_header-back"
                    style={{
                        float: "left",
                        marginRight: '3rem',
                        marginLeft: '1rem',
                        fontSize: '2rem',
                        cursor: 'pointer'
                    }}
                />
                <div className="Group-about">
                    <div className="Group-with" onClick={this.headerClicked}>{this.props.name}</div>
                </div>
                <Modal className="Group-new-modal" open={this.state.showMainModal}>
                    <Modal.Header>Group Setings</Modal.Header>
                    <Modal.Content scrolling>
                        <div className="name-container">
                            <label className="name-label" style={{ margin: "0.5rem" }}>Name:</label>
                            <input className="name" type="text" placeholder={this.props.name} style={{ margin: "0.5rem" }} />
                        </div>
                        <div className="ui buttons" style={{ margin: "1rem" }}>
                            <button className="ui left green labeled icon button" style={{ fontSize: "1.3rem", borderRadius: "1rem" }} onClick={this.addClicked}>
                                <i className="add icon" />Add member
                            </button>
                            <button className="ui left red labeled icon button" style={{ fontSize: "1.3rem", borderRadius: "1rem" }} onClick={this.leftClicked}>
                                Leave group<i style={{ color: "white" }} className="close icon" />
                            </button>
                        </div>
                        <ul className="list">
                            <React.Fragment>
                                {this.state.memberItem.map(friend =>
                                    <li className="item" style={{ cursor: 'auto' }} key={friend.id}>
                                        {friend.photo ?
                                            <img className="photo" src={friend.photo.image} alt="" />
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
                        <Button className="positive ui button" style={{ fontSize: "1.5rem" }} onClick={this.SaveClicked}>Save Changes</Button>
                    </Modal.Actions>
                </Modal>
                <Modal className="Group-new-modal" open={this.state.showAddModal}>
                    <Modal.Header>Add members</Modal.Header>
                    <Modal.Content scrolling>
                        <ul className="list">
                            <FriendItem friendItem={this.state.friendItem} selectedMembers={this.state.selectedMembers} />
                        </ul>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button className="positive ui button" style={{ fontSize: "1.5rem" }} onClick={this.confirmClicked}>Confirm</Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }

    onOpenGroupList = () => {
        document.getElementById("Group").style.display = "none";
        document.getElementById("Group_list-overlay").style.display = "block";
        this.props.removeGroup();
    }

    headerClicked = () => {
        this.setState({ showMainModal: true, memberItem: [] });
        let i = 0;
        Axios.get(`${serverURL()}/chat/friendinfo/`, tokenConfig())
            .then(res => {
                res.data.forEach(friend => {
                    i = i + 1
                    this.setState(prevState => {
                        return {
                            memberItem: [...prevState.memberItem, { name: friend.nickname, photo: friend.user_avatar, userName: friend.username, id: 'newFriend' + i }]
                        };
                    });
                });
            })
            .catch(err => {
            });
    }

    confirmClicked = () => {
        //Axios.post(`${serverURL()}/chat/groupadd/`, tokenConfig())
        this.setState({ showAddModal: false })
    }

    addClicked = () => {
        let i = 0;
        Axios.get(`${serverURL()}/chat/friendinfo/`, tokenConfig())
            .then(res => {
                res.data.forEach(friend => {
                    i = i + 1
                    this.setState(prevState => {
                        return {
                            friendItem: [...prevState.friendItem, { name: friend.nickname, photo: friend.user_avatar, id: 'member' + i }]
                        };
                    });
                });
            })
            .catch(err => {
            });
        this.setState({ showAddModal: true })
    }

    leftClicked = () => {
        //Axios.post(`${serverURL()}/chat/groupleft/`, tokenConfig())
    }

    SaveClicked = () => {

        this.setState({ showMainModal: false })
    }
    CancelClicked = () => {
        this.setState({ showMainModal: false })
    }
}

export default GroupHeader;