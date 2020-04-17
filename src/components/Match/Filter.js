import React from 'react';
import Slider from '@material-ui/core/Slider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMale, faFemale } from '@fortawesome/free-solid-svg-icons';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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
        const {showMale, showFemale} = this.props.filter;
        return (
            <div className="Match_Filter-container">

                <div className="Match_Filter-gender">
                    <FormControlLabel
                        control={
                            <Checkbox 
                                icon={<FontAwesomeIcon icon={faMale} className="Match_Filter-gender-icon" />} 
                                checkedIcon={<FontAwesomeIcon icon={faMale} className="Match_Filter-gender-icon" />} 
                                name="male" 
                                value="male"
                                checked={showMale}
                                onChange={this.onChange}
                            />
                        }
                    />
                    <FormControlLabel
                        control={
                            <Checkbox 
                                icon={<FontAwesomeIcon icon={faFemale} className="Match_Filter-gender-icon" />} 
                                checkedIcon={<FontAwesomeIcon icon={faFemale} className="Match_Filter-gender-icon" />} 
                                name="female" 
                                value="female"
                                checked={showFemale}
                                onChange={this.onChange}
                            />
                        }
                    />
                </div>

                <div className="Match_Filter-age">
                    <span className="Match_Filter-slider-title">Age</span>
                    <Slider
                        className="Match_Filter-slider"
                        min={18}
                        max={100}
                        defaultValue={[18, 100]}
                        onChange={this.onChangeAge}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                    />
                </div>

                <div className="Match_Filter-distance">
                    <span className="Match_Filter-slider-title">Distance</span>
                    <Slider
                        className="Match_Filter-slider"
                        min={0}
                        max={300}
                        defaultValue={[0, 300]}
                        onChange={this.onChangeDistance}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                    />
                </div>

            </div>
        );
    }
}

export default Filter;