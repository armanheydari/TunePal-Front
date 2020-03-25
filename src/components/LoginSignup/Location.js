import React from 'react';
import './Location.css';
import Mapir from "mapir-react-component";

const Map = Mapir.setToken({
    transformRequest: (url) => {
        return {
            url: url,
            headers: { 
            'x-api-key': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjdmYzVjNmRlMTY4ZDZiNzdiNWMxMmE2MjEwODEyMjEyNmQ3MzI5YWE1YzFlMDQ4YWNhZTRlN2U2M2Y1NWUzYWYxOTk1YTUzMDNiYjJjY2I5In0.eyJhdWQiOiI4Mzg4IiwianRpIjoiN2ZjNWM2ZGUxNjhkNmI3N2I1YzEyYTYyMTA4MTIyMTI2ZDczMjlhYTVjMWUwNDhhY2FlNGU3ZTYzZjU1ZTNhZjE5OTVhNTMwM2JiMmNjYjkiLCJpYXQiOjE1ODQ5NzQzOTMsIm5iZiI6MTU4NDk3NDM5MywiZXhwIjoxNTg3NTY2MzkzLCJzdWIiOiIiLCJzY29wZXMiOlsiYmFzaWMiXX0.GUpfC8cQ1bWyTcVhz1lW8lR5rWll2wAOSmjxY5sTyEn2iHSsPWMhMMcsbNDTlV_Iz3HctjaAJFny3YdCdFMMSsWshe-gx8CHRQKkjGqgJRs691uPGVeLSOPe4iJjbD0_dkWRUGIiP5NrRyb0ZvJoZUDuNK39l5JGo699LCL66xIUrSlMR4tAD8RCv2bnmES6I_5jtMSRciaM9rN9orcrsy8BRZeit7MJvwuNlFtDZq-sVIHQH9fzRWX3bKeOqcU1LXJh1YtuZnBXA-kdDrHXCRDbGoUV8NexTGEH_Jrtol-CXsLOTniwX3V6YqB3ZtZi-hgdPEJ8lYtwGqY3nTKNng', //Mapir api key 
            'Mapir-SDK': 'reactjs'        
      },
        }
    }
});

class Location extends React.Component {
    state = {
        latitude: '',
        longitude: '',
        showMap: false
    };

    position = (point) => {
        console.log("im in position")
        this.setState({latitude: point.coords.latitude});
        this.setState({longitude: point.coords.longitude})
        //latitude = point.coords.latitude;
        //longitude = point.coords.longitude;
        this.setState({showMap: true});
        //console.log(latitude);
        console.log(this.state.showMap);
        console.log(this.state.latitude)
    }

    getLocation = (e) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.position);
            console.log("hey")
        }
        else {
            console.log("Browser does not support map")
        }
    } 


    render() {
        return (
                <div className="location-container">
                    <h3>Location</h3>
                    <p>For finding people near you we need your location</p>
                    <button onClick={this.getLocation}>Find My Location</button>
                    
                    {this.state.showMap && 
                    <div className="map">
                        <Mapir
                            center={[this.state.latitude, this.state.longitude]}
                            Map={Map}
                        
                        >
                            <Mapir.Layer
                                type="symbol"
                                layout={{ "icon-image": "harbor-15" }}>
                            </Mapir.Layer>
                            <Mapir.Marker
                                coordinates={[this.state.latitude, this.state.longitude]}
                                anchor="bottom">
                            </Mapir.Marker>
                        </Mapir>

                    </div>
                    }

                </div>
        
        );
    }
}

export default Location;