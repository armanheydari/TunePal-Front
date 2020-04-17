import React from 'react';
import RequestItem from './RequestItem';

class RequestList extends React.Component {
    render() {
        return (
            <ul className="Requests_List">
                {
                    this.props.items.map((item) => {
                        return (
                            <RequestItem
                                username={item.username}
                                name={item.name}
                                gender={item.gender}
                                age={item.age}
                                distance={item.distance}
                            />
                        );
                    })
                }
            </ul>
        );
    }
}

export default RequestList;