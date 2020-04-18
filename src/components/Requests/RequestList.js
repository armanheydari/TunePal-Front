import React from 'react';
import RequestItem from './RequestItem';

class RequestList extends React.Component {
    render() {
        return (
            <ul className="Requests_List">
                {
                    this.props.items.map((item, index) => {
                        return (
                            <RequestItem
                                key={index}
                                username={item.from_user.username}
                                name={item.from_user.nickname}
                                gender={item.from_user.gender}
                                age={item.from_user.age}
                                distance={item.from_user.location}
                                imgURL={item.from_user.user_avatar}
                                updateItems={this.props.updateItems}
                            />
                        );
                    })
                }
            </ul>
        );
    }
}

export default RequestList;