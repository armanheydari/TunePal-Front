import React from 'react';
import RequestList from './RequestList';
import Axios from 'axios';

class Requests extends React.Component {
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
    }

    componentDidMount() {
      //Send request to back to get the user requests
    }

    render() {
      return (
          <div className="Requests">
              <RequestList
                  items={this.state.items}
              />
          </div>
      );
    }
}

export default Requests;