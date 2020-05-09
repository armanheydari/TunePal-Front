import React from "react";
import Axios from "axios";
import Filter from "./Filter.js";
import SuggestList from "./SuggestList";
import tokenConfig from '../../utils/tokenConfig';

class Match extends React.Component {
  state = {
    items: [],
    render: false,
    showMale: true,
    showFemale: true,
    minAge: 18,
    maxAge: 100,
    minDistance: 0,
    maxDistance: 300,
  };

  componentDidMount() {
    Axios.get("http://tunepal.pythonanywhere.com/spotify/suggestions/", tokenConfig())
    .then(res => {
      console.log(res);
      this.setState(prevState => {
        return {
          items: res.data.s_users,
          render: true
        };
      });
    })
    .catch(err => {
      console.log(err.data);
    });
  }

  genderFilter = (gender) => {
    if (gender === "male") {
      this.setState((prevState) => {
        return {
          showMale: !prevState.showMale,
        };
      });
    }

    if (gender === "female") {
      this.setState((prevState) => {
        return {
          showFemale: !prevState.showFemale,
        };
      });
    }
  };

  distanceFilter = (min, max) => {
    this.setState(() => {
      return {
        minDistance: min,
        maxDistance: max,
      };
    });
  };

  ageFilter = (min, max) => {
    this.setState(() => {
      return {
        minAge: min,
        maxAge: max,
      };
    });
  };

  createFilterObject = () => {
    const filter = {
      showMale: this.state.showMale,
      showFemale: this.state.showFemale,
      minAge: this.state.minAge,
      maxAge: this.state.maxAge,
      minDistance: this.state.minDistance,
      maxDistance: this.state.maxDistance,
    };
    return filter;
  };

  render() {
    if (this.state.render) {
      return (
        <div className="matchList">
            <Filter
              setGender={this.genderFilter}
              setDistance={this.distanceFilter}
              setAge={this.ageFilter}
              filter={this.createFilterObject()}
            />
          <SuggestList
            items={this.state.items}
            filter={this.createFilterObject()}
            updatePending={this.updatePending}
          />
        </div>
      );
    }
    return (
      <div className="Homepage_load">
        <div class="ui active centered inline text loader massive">Loading</div>
      </div>
    );
  }

  updatePending = (username) => {
    this.setState(prevState => {
      const items = prevState.items.map(item => {
        if (item.username === username) {
          item.pendding = true;
        }
        return item;
      });
      return {
        items
      }
    })
  }
}

export default Match;
