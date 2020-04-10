import React from 'react';
import SuggestItem from './SuggestItem.js'

class SuggestList extends React.Component {
    filterItemGender = (gender) => {
        const {showMale, showFemale} = this.props.filter;
        if (gender === "male" && showMale) {
            return true;
        }
        if (gender === "female" && showFemale) {
            return true;
        }
        return false;
    }
    
    filterItem = (item) => {
        const {minDistance, maxDistance, minAge, maxAge} = this.props.filter;
        return (
            this.filterItemGender(item.gender) &&
            item.age >= minAge &&
            item.age <= maxAge &&
            item.distance >= minDistance &&
            item.distance <= maxDistance
        );
    }
    render() {
        const filtered = this.props.items.filter(this.filterItem);
        return (
            <table className="redTable">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th>Distance</th>
                    </tr>
                </thead>

                <tbody>
                {
                    filtered.map((item) => {
                        return (<SuggestItem username={item.username} name={item.name} gender={item.gender} age={item.age} distance={item.distance}  />)
                    })
                }
                </tbody>
            </table>
        );
    }
}

export default SuggestList;