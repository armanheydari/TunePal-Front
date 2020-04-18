import React from "react";
import ProfilePicture from "../../assets/maxresdefault.jpg";
import Axios from 'axios';

function tokenConfig() {
  const config = {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  return config;
}

class SuggestItem extends React.Component {
  render() {
    const { name, age, distance, imgURL, pending } = this.props;
    return (
      <li className="matchList-firstList_list">
        <img
          className="matchList-firstList_list__picture"
          alt="profile-img"
          src={imgURL || ProfilePicture}
        />
        <h2 className="matchList-firstList_list__name">{name}</h2>
        <div className="matchList-firstList_list__info">
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

        {
          pending 
          ? <div className="pending">Pending</div> 
          : <div onClick={this.onClickRequest} className="matchList-firstList_list__request">Request</div>
        }
      </li>
    );
  }

  onClickRequest = () => {
    Axios.get(`http://tunepal.pythonanywhere.com/spotify/friend_request/?username=${this.props.username}`, tokenConfig())
    .then(res => {
      console.log(res);
      this.props.updatePending(this.props.username);
    })
    .catch(err => {
      console.log(err);
    });
  }

}

export default SuggestItem;
