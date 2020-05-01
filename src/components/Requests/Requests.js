import React from 'react';
import RequestList from './RequestList';
import Axios from 'axios';

function tokenConfig() {
  const config = {
    mode: "cors",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('token')}`
    }
  };
  return config;
}

class Requests extends React.Component {
    state = {
      items: [],
      render: false
    }

    componentDidMount() {
      Axios.get("http://tunepal.pythonanywhere.com/spotify/friend_list/", tokenConfig())
      .then(res => {
        this.setState(prevState => {
          return {
            items: res.data,
            render: true
          };
        });
      })
      .catch(err => {
      });
    }

    render() {
      return (
          <div className="Requests">
              <RequestList
                  items={this.state.items}
                  updateItems={this.updateItems}
              />
          </div>
      );
    }

    updateItems = (username) => {
      this.setState(prevState => {
        const items = prevState.items.filter(item => item.from_user.username !== username);
        return {
          items
        }
      })
    }
}

export default Requests;