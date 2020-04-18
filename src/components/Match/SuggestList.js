import React from "react";
import SuggestItem from "./SuggestItem.js";
import NoMatchFound from "./NoMatchFound";

class SuggestList extends React.Component {
  filterItemGender = (gender) => {
    const { showMale, showFemale } = this.props.filter;
    if (gender === "Male" && showMale) {
      return true;
    }
    if (gender === "Female" && showFemale) {
      return true;
    }
    return false;
  };

  filterItem = (item) => {
    const { minDistance, maxDistance, minAge, maxAge } = this.props.filter;
    return (
      this.filterItemGender(item.gender) &&
      item.age >= minAge &&
      item.age <= maxAge &&
      item.location >= minDistance &&
      item.location <= maxDistance
    );
  };

  render() {
    let filtered = this.props.items.filter(this.filterItem);
    if (filtered.length !== 0) {
      return (
        <ul className="matchList-firstList">
          {filtered.map((item, index) => {
            return (
              <SuggestItem
                key={index}
                username={item.username}
                name={item.nickname}
                gender={item.gender}
                age={item.age}
                distance={item.location}
                imgURL={item.user_avatar}
                pending={item.pendding}
                updatePending={this.props.updatePending}
              />
            );
          })}
        </ul>
      );
    }
    return (<NoMatchFound />)
  }
}

export default SuggestList;
