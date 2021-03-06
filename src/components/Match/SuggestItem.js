import React from "react";
import ProfilePicture from "../../assets/Default-Profile-Picture.jpg";
import Axios from 'axios';
import { Link } from 'react-router-dom';
import tokenConfig from '../../utils/tokenConfig';
import serverURL from '../../utils/serverURL';

class SuggestItem extends React.Component {
  state = {
    isSending: undefined
  }

  render() {
    const { name, age, distance, imgURL, pending } = this.props;
    return (
      <li className="matchList-firstList_list">
        <Link to={`/profile/${this.props.username}`}>
          <img
            className="matchList-firstList_list__picture"
            alt="profile-img"
            src={imgURL || ProfilePicture}
          />
        </Link>
        <h2 className="matchList-firstList_list__name">{name}</h2>
        <div className="matchList-firstList_list__info">
          <p>
            <span>Age</span>
            <span>{age}</span>
            <span>years</span>
          </p>
          <p>
            <span>Distance</span>
            <span>{distance ? distance : '?'}</span>
            <span>km</span>
          </p>
        </div>

        {
          pending 
          ? <div className="pending">Pending</div> 
          : <div
              onClick={this.onClickRequest}
              style={this.state.isSending ? {pointerEvents:'none'} : {pointerEvents:'auto'}}
              className="matchList-firstList_list__request"
            >
              {this.state.isSending ? <div className="ui active centered inline loader"></div> : 'Request'}
            </div>
        }
      </li>
    );
  }

  onClickRequest = () => {
    this.setState(prevState => {
      return {
        isSending: true
      };
    },
    () => {
      Axios.get(`${serverURL()}/spotify/friend_request/?username=${this.props.username}`, tokenConfig())
    .then(res => {
      this.props.updatePending(this.props.username);
      this.setState(prevState => {
        return {
          isSending: false
        };
      });
    })
    .catch(err => {
      this.setState(prevState => {
        return {
          isSending: false
        };
      });
    });
    }
    );
  }

}

export default SuggestItem;
