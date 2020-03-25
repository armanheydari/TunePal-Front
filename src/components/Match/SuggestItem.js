import React from 'react';
import './Match.css';

class SuggestItem extends React.Component {
    
    render() {
        const {no, name, distance, percent} = this.props;
        return (
            <tr>
                <td>{no}</td>
                <td>{name}</td>
                <td>{distance}</td>
                <td>{percent}</td>
            </tr>
        )
    }
}

export default SuggestItem;