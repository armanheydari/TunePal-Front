import React from 'react';
import ProfilePicture from '../../../assets/Default-Profile-Picture.jpg';

class FriendItem extends React.Component {
    render() {
        return (
            <React.Fragment>
                {this.props.friendItem.map(friend =>
                    <li className="item" id={friend.userName} onClick={this.onFriendClicked} key={friend.id}>
                        {friend.photo ?
                            <img className="photo" src={friend.photo} alt="" />
                            :
                            <img className="photo" src={ProfilePicture} alt="" />
                        }
                        <div className="name">{friend.name}</div>
                    </li>
                )}
            </React.Fragment>
        )
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
export default FriendItem;