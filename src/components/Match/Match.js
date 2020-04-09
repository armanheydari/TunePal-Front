import React from 'react';
import axios from 'axios';
import Filter from './Filter.js';
import SuggestList from './SuggestList';

function tokenConfig() {
    const config = {
        headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    };
    return config;
}

class Match extends React.Component {
    state = {
        male:[],
        female:[],
        showMale: true,
        showFemale: true,
        minAge: 18,
        maxAge: 100,
        minDistance: 0,
        maxDistance: 100
    }

    genderFilter = (gender) => {
        if (gender === "male") {
            this.setState((prevState) => {
                return {
                    showMale: !prevState.showMale
                };
            });
        }

        if (gender === "female") {
            this.setState((prevState) => {
                return {
                    showFemale: !prevState.showFemale
                };
            });
        }
    }

    distanceFilter = (min, max) => {
        this.setState(() => {
            return {
                minDistance: min,
                maxDistance: max
            };
        });
    }

    ageFilter = (min, max) => {
        this.setState(() => {
            return {
                minAge: min,
                maxAge: max
            };
        });
    }

    createFilterObject = () => {
        const filter = {
            showMale: this.state.showMale,
            showFemale: this.state.showFemale,
            minAge: this.state.minAge,
            maxAge:this.state.maxAge,
            minDistance: this.state.minDistance,
            maxDistance: this.state.maxDistance
        }
        return filter;
    }

    componentDidMount() {
        axios.get('http://tunepal.pythonanywhere.com/spotify/match/', tokenConfig())
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err.data);
        });
    }

    render() {
        return (
            <div>
                <Filter setGender={this.genderFilter} setDistance={this.distanceFilter} setAge={this.ageFilter} filter={this.createFilterObject()} />
                <SuggestList male={this.state.male} female={this.state.female} filter={this.createFilterObject()} />
            </div>

        );
    }
}

export default Match;