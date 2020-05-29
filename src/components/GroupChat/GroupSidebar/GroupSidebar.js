import React from 'react';
import Search from './Search';
import GroupList from './GroupList';
import FriendItem from './FriendItem';
import Arman from '../../../assets/LandingPage/reza.jpg'
import { Button, Header, Image, Modal } from 'semantic-ui-react'


class GroupSidebar extends React.Component {
    state = {
        searchField: '',
        friendItem: {
            name: 'Armawwn',
            photo: Arman,
            id:'1',
            userName:''
        }
    }

    render() {
        return (
            <React.Fragment>
                <div id="Group_list-overlay" className="people-list">
                    <Search getFieldSearch={this.getFieldSearch} />
                    <Modal trigger={<div className="Group-new">
                        <button className="ui basic button Button">Create new group</button>
                    </div>}>
                        <Modal.Header>Select a Photo</Modal.Header>
                        <Modal.Content image>
                            <Modal.Description>
                                <Header>Default Profile Image</Header>
                                <p> We've found the following gravatar image associated with your e-mail address.</p>
                                <p>Is it okay to use this photo?</p>
                            </Modal.Description>
                        </Modal.Content>
                    </Modal>
                    <GroupList GroupList={this.props.GroupList} openGroup={this.props.openGroup} GroupID={this.props.GroupID} searchField={this.state.searchField} />
                </div>
                <div id="people-list" className="people-list">
                    <Search getFieldSearch={this.getFieldSearch} />
                    <Modal onOpen={this.createClicked} className="Group-new-modal" trigger={<div className="Group-new" size="large">
                        <button className="ui basic button Button">Create new group</button>
                    </div>}>
                        <Modal.Header>New Group</Modal.Header>
                        <Modal.Content scrolling>
                            <div className="name-container" style={{ textAlign: "center" }}>
                                <label className="name-label">Name:</label>
                                <input className="name" type="text" placeholder="My Group" />
                            </div>
                            <ul className="list">
                                <FriendItem friendItem={this.state.friendItem} />
                                {/*<li className="item">
                                    <img className="photo" src={Arman} alt="" />
                                    <div className="name">Arman</div>
                                </li>
                                <li className="item">
                                    <img className="photo" src={Arman} alt="" />
                                    <div className="name">Arman</div>
                                </li>
                                <li className="item">
                                    <img className="photo" src={Arman} alt="" />
                                    <div className="name">Arman</div>
                                </li>
                                <li className="item">
                                    <img className="photo" src={Arman} alt="" />
                                    <div className="name">Arman</div>
                                </li>
                                <li className="item">
                                    <img className="photo" src={Arman} alt="" />
                                    <div className="name">Arman</div>
                                </li>
                                <li className="item">
                                    <img className="photo" src={Arman} alt="" />
                                    <div className="name">Arman</div>
                                </li>
                                <li className="item">
                                    <img className="photo" src={Arman} alt="" />
                                    <div className="name">Arman</div>
                                </li>
                                <li className="item">
                                    <img className="photo" src={Arman} alt="" />
                                    <div className="name">Arman</div>
                                </li>
                                <li className="item">
                                    <img className="photo" src={Arman} alt="" />
                                    <div className="name">Arman</div>
                                </li>
                                <li className="item">
                                    <img className="photo" src={Arman} alt="" />
                                    <div className="name">Arman</div>
                                </li>*/}
                            </ul>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button className="positive ui button" style={{fontSize:"1.5rem"}}>Create</Button>
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

    createClicked = () => {
        console.log('heeey')
        // Axios.get(`${serverURL()}/group/friendItem`, tokenConfig())
        //     .then(res => {
        //         const friends = res.data;
        //         friends.forEach(friend => {
        //             this.setState(prevState => {
        //                 return {
        //                     friendName=friend.name,
        //                     friendPhoto=friend.imgURL,
        //                     friendUserName=friend.userName
        //                 };
        //             });
        //         });
        //     })
        //     .catch(err => {
        //     });
    }
}

export default GroupSidebar;