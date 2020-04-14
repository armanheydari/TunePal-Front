import React from "react";
import axios from "axios";
import Filter from "./Filter.js";
import SuggestList from "./SuggestList";

function tokenConfig() {
  const config = {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  return config;
}

class Match extends React.Component {
  state = {
    items: [
      {
        username: "ALi3TR",
        name: "Ali",
        gender: "male",
        age: 20,
        distance: "19",
      },
      {
        username: "Rman",
        name: "Arman",
        gender: "male",
        age: 30,
        distance: "119",
      },
      {
        username: "SabaRoh",
        name: "Saba",
        gender: "female",
        age: 40,
        distance: "171",
      },
      {
        username: "Masut",
        name: "Masoud",
        gender: "male",
        age: 50,
        distance: "67",
      },
      {
        username: "RezaMan",
        name: "Reza",
        gender: "male",
        age: 60,
        distance: "211",
      },
      {
        username: "iammobina",
        name: "Mobina",
        gender: "female",
        age: 70,
        distance: "181",
      },
      {
        username: "dimo",
        name: "Omid",
        gender: "male",
        age: 80,
        distance: "67",
      },
      {
        username: "Navido",
        name: "Navid",
        gender: "male",
        age: 90,
        distance: "287",
      },
      {
        username: "meliw",
        name: "Melika",
        gender: "female",
        age: 25,
        distance: "79",
      },
    ],
    showMale: true,
    showFemale: true,
    minAge: 18,
    maxAge: 100,
    minDistance: 0,
    maxDistance: 300,
  };

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

  // componentDidMount() {
  //     axios.get('http://tunepal.pythonanywhere.com/spotify/match/', tokenConfig())
  //     .then(res => {
  //         console.log(res);
  //         this.setState(() => {
  //             return {
  //                 male: res.data.MALE,
  //                 female: res.data.FEMALE
  //             };
  //         });
  //     })
  //     .catch(err => {
  //         console.log(err.data);
  //     });
  // }

  render() {
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
        />
      </div>
    );
  }
}

export default Match;
