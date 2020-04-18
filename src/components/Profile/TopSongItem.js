import React from 'react';
class TopSongItem extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.artist}</td>
                <td>{this.props.song}</td>
            </tr>
        )
    }
}
export default TopSongItem;