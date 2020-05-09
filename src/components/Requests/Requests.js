import React from 'react';
import RequestList from './RequestList';
import Axios from 'axios';
import tokenConfig from '../../utils/tokenConfig';
import serverURL from '../../utils/serverURL';

class Requests extends React.Component {
    state = {
      items: [],
      render: false
    }

    componentDidMount() {
      Axios.get(`${serverURL()}/spotify/friend_list/`, tokenConfig())
      .then(res => {
        console.log(res);
        this.setState(prevState => {
          return {
            items: res.data,
            render: true
          };
        });
      })
      .catch(err => {
        console.log(err);
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