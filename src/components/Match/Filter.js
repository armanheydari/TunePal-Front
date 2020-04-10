import React from 'react';
import Slider from '@material-ui/core/Slider';

class Filter extends React.Component {
    onChange = (e) => {
        const field = e.target.name;
        this.props.setGender(field);
    }

    onChangeAge = (e, v) => {
        this.props.setAge(v[0], v[1]);
    }

    onChangeDistance = (e, v) => {
        this.props.setDistance(v[0], v[1]);
    }

    render() {
        const {showMale, showFemale, minDistance, maxDistance, minAge, maxAge} = this.props.filter;
        return (
            <div>

                <div className="Match_Filter_gender">
                    <div>
                        <input
                            className=""
                            type="checkbox"
                            name="female"
                            value="female"
                            checked={showFemale}
                            onChange={this.onChange}
                        />
                        <span>Female</span>
                    </div>
                    <div>
                        <input
                            className=""
                            type="checkbox"
                            name="male"
                            value="male"
                            checked={showMale}
                            onChange={this.onChange}
                        />
                        <span>Male</span>
                    </div>
                </div>

                <div className="Match_Filter_age">
                    <span>Age</span>
                    <Slider
                        min={18}
                        max={100}
                        defaultValue={[18, 100]}
                        onChange={this.onChangeAge}
                        valueLabelDisplay="on"
                        aria-labelledby="range-slider"
                    />
                </div>

                <div className="Match_Filter_distance">
                <span>Distance</span>
                    <Slider
                        min={0}
                        max={300}
                        defaultValue={[0, 300]}
                        onChange={this.onChangeDistance}
                        valueLabelDisplay="on"
                        aria-labelledby="range-slider"
                    />
                </div>

            </div>
        );
    }
}

export default Filter;