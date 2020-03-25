import React from 'react';
import SuggestItem from './SuggestItem';
import './Match.css';

class SuggestList extends React.Component {
    state = {
        items: [
            {
                number: '1',
                name: 'Ali Sedaghi',
                distance: '17',
                percent: '86'
            },
            {
                number: '2',
                name: 'Reza Mansoori',
                distance: '19',
                percent: '89'
            },
            {
                number: '1',
                name: 'Arman Heydeari',
                distance: '14',
                percent: '91'
            },
            
        ]
    }
    
    render() {
        return (
            <table>

                <thead>
                    <tr>
                        <th>NO.</th>
                        <th>Name</th>
                        <th>Distance</th>
                        <th>Percent</th>
                    </tr>
                </thead>

                <tbody>
                {
                    this.state.items.map( (item) => {
                        return (<SuggestItem no={item.number} name={item.name} distance={item.distance} percent={item.percent}/>)
                    })
                }
                </tbody>

            </table>

        );
    }
    
}

export default SuggestList;