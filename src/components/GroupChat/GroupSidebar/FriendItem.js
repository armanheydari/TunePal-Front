import React from 'react';

class FriendItem extends React.Component {
    render() {
        return (
            <li className="item" id={this.props.friendItem.id} onClick={this.onFriendClicked}>
                <img className="photo" src={this.props.friendItem.photo} alt="" />
                <div className="name">{this.props.friendItem.name}</div>
            </li>
        )
    }
    
    onFriendClicked=()=>{
        document.getElementById(this.props.friendItem.id).classList.add('Friend-sticky');
    }
}
export default FriendItem;