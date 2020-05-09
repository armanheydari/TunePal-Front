import React from 'react';
import './styles/Signup.css';
import SignupSteps from './SignupSteps';
import Interest from './Interest';
import Location from './Location';
import Spotify from './Spotify';

class Signup extends React.Component {
    state = {
        stage: "favorites",
        favorites: [],
        location: undefined
    }

    render() {
        const stage = this.state.stage;
        return (
            <div className="Signup">
                <SignupSteps stage={stage} />
                {
                    stage === "favorites" &&
                    <Interest
                        updateStage={this.updateStage}
                        favorites={this.state.favorites}
                        updateFavorites={this.updateFavorites}
                    />
                }

                {
                    stage === "location" &&
                    <Location
                        updateStage={this.updateStage}
                        location={this.state.location}
                        updateLocation={this.updateLocation}
                    />
                }
                {
                    stage === "spotify" &&
                    <Spotify
                        updateStage={this.updateStage}
                    />
                }
            </div>
        );
    }

    updateStage = (stage) => {
        this.setState(prevState => {
            return {
                stage
            };
        });
    }

    updateFavorites = (favorites) => {
        this.setState(prevState => {
            return {
                favorites
            };
        });
    }

    updateLocation = (location) => {
        this.setState(prevState => {
            return {
                location
            };
        });
    }
}

export default Signup;