import React from 'react';
import Join from './Join';

const onClickJoin = () => {
    const joinOverlay = document.getElementById("Join_overlay");
    joinOverlay.style.display = "flex";
    joinOverlay.style.alignItems = "center";
}

class LandingPage extends React.Component {
    render() {
        return (
            <div className="LandingPage">
                <Join />
                <header id="header">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3 col-sm-3 col-xs-6">

                            </div>
                            <div className="col-md-9 col-sm-9 col-xs-6">
                                <div>
                                    <span></span>
                                    <nav>
                                        <ul>
                                            <li>
                                                <a>Home</a>
                                            </li>
                                            <li>
                                                <a>Features</a>
                                            </li>
                                            <li>
                                                <a>Team</a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <section className="one">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-sm-8 col-xs-12">
                                <div className="introduce">
                                    <div className="content">
                                        <h1>
                                            We Listen
                                            <br/>
                                            We Talk
                                            <br/>
                                            We Love
                                        </h1>
                                        <div className="join" onClick={onClickJoin} on>Join Us</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="wave">
                        <path fill="#ff4c68" fillOpacity="0.5" d="M0,64L48,85.3C96,107,192,149,288,186.7C384,224,480,256,576,250.7C672,245,768,203,864,170.7C960,139,1056,117,1152,122.7C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="wave">
                        <path fill="#ff4c68" fillOpacity="0.7" d="M0,288L30,266.7C60,245,120,203,180,165.3C240,128,300,96,360,106.7C420,117,480,171,540,176C600,181,660,139,720,117.3C780,96,840,96,900,106.7C960,117,1020,139,1080,170.7C1140,203,1200,245,1260,245.3C1320,245,1380,203,1410,181.3L1440,160L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path>
                    </svg>
                </section>

                <section className="two">
                    <h2>Features</h2>
                </section>

                <section className="three">
                    <h2>Team</h2>
                </section>

                <footer>
                    All Rights and ...
                </footer>

            </div>
        );
    }
}

export default LandingPage;