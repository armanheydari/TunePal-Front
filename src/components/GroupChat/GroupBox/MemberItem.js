import React from 'react';

class MemberItem extends React.Component {
    render() {
        return (
            <li className="item" style={{cursor:"auto"}}>
                <img className="photo" src={this.props.memberItem.photo} alt="" />
                <div className="name">{this.props.memberItem.name}</div>
            </li>
        )
    }
}
export default MemberItem;