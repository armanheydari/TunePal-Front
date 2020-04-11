import React from "react";
import ProfilePicture from "../../assets/maxresdefault.jpg";

class SuggestItem extends React.Component {
  render() {
    const { username, name, gender, age, distance } = this.props;
    return (
      <li className="matchList-firstList_list">
        <img
          className="matchList-firstList_list__picture"
          alt="profile-img"
          src={ProfilePicture}
        />
        <h2 className="matchList-firstList_list__name">{name}</h2>
        <div className="matchList-firstList_list__info">
          {/* <p>
            <span>Gender</span>
            <span>{gender}</span>
          </p> */}
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

        <div className="matchList-firstList_list__request">Request</div>
      </li>
    );
  }
}

export default SuggestItem;
