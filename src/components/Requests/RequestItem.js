import React from 'react';

class RequestItem extends React.Component {
    render() {
        const { username, name, gender, age, distance } = this.props;
        return (
            <li className="Requests_List_Item">
                <img
                    className="Requests_List_Item-img"
                    alt="profile-img"
                    // src={ProfilePicture}
                />
                <h2 className="Requests_List_Item-name">{name}</h2>
                <div className="Requests_List_Item-info">
                    <p>
                        <span>Age</span>
                        <span>{age}</span>
                        <span>years</span>
                    </p>
                    <p>
                        <span>Distance</span>
                        <span>{distance}</span>
                        <span>km</span>
                    </p>
                </div>
                <div className="Requests_List_Item-action">
                    <button className="">Cancel</button>
                    <div className=""></div>
                    <button className="">Save</button>
                </div>
            </li>
        );
    }
}

export default RequestItem;