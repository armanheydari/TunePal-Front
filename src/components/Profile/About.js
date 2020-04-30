import React from 'react';

class About extends React.Component {
    render() {
        const {biography, favorites} = this.props;
        return (
            <div className="Profile_About">
                <div className="Profile_About-biography">
                    <h3 className="Profile_About-title">Biography</h3>
                    <p className="Profile_About-text">{biography}</p>
                </div>
                <div className="Profile_About-favorites">
                    <h3 className="Profile_About-title">Favorites</h3>
                    <p className="Profile_About-text">{favorites}</p>
                </div>
            </div>
        );
    }
}

export default About;