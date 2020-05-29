import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Arman from '../../../assets/LandingPage/reza.jpg';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import MemberItem from './MemberItem';

class GroupHeader extends React.Component {
    state={
        memberItem: {
            name: 'Armawwn',
            photo: Arman,
        }
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
                <Modal onOpen={this.createClicked} className="Group-new-modal" trigger={<div className="Group-about">
                    <div className="Group-with">{this.props.name}</div>
                </div>}>
                    <Modal.Header>Group Setings</Modal.Header>
                    <Modal.Content scrolling>
                        <div className="name-container">
                            <label className="name-label" style={{margin:"0.5rem"}}>Name:</label>
                            <input className="name" type="text" placeholder={this.props.name} style={{margin:"0.5rem"}}/>
                            <Button className="negative ui button" style={{fontSize:"1.5rem",float:"right",marginTop:"1rem"}}>Leave Group</Button>
                        </div>
                        <ul className="list">
                            <MemberItem memberItem={this.state.memberItem}/>
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
                            </li>*/}
                        </ul>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button className="positive ui button" style={{fontSize:"1.5rem"}}>Save Changes</Button>
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
}

export default GroupHeader;