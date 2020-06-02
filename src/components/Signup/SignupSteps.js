import React from 'react';
import './styles/Steps.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { Steps } from 'antd';
import { SolutionOutlined, AimOutlined, StarOutlined } from '@ant-design/icons';
const { Step } = Steps;

class SignupSteps extends React.Component {
    render() {
        const status = {
            signup: "finish",
            favorites: "process",
            location: "wait",
            spotify: "wait"
        };

        switch(this.props.stage) {
            case "location":
                status.signup = "finish";
                status.favorites = "finish";
                status.location = "process";
                status.spotify = "wait";
                break;

            case "spotify":
                status.signup = "finish";
                status.favorites = "finish";
                status.location = "finish";
                status.spotify = "process";
                break;
            default: break;
        }
        return (
            <Steps className="Steps">
                <Step status={status.signup} title="Step 1" description="Signup" icon={<SolutionOutlined />} />
                <Step status={status.favorites} title="Step 2" description="Favorites" icon={<StarOutlined />} />
                <Step status={status.location} title="Step 3" description="Location" icon={<AimOutlined />} />
                <Step status={status.spotify} title="Step 4" description="Spotify" icon={<FontAwesomeIcon icon={faSpotify} />} />
            </Steps>
        );
    }
}

export default SignupSteps;