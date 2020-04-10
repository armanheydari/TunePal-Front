import React from 'react';

class SuggestItem extends React.Component {
    render() {
        const {username, name, gender, age, distance} = this.props;
        return (
            <tr>
                <td>{username}</td>
                <td>{name}</td>
                <td>{gender}</td>
                <td>{age}</td>
                <td>{distance}</td>
            </tr>
        );
    }
}

export default SuggestItem;