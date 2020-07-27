import React from 'react';
import Join from './Join';
import FeaturePhone from '../../assets/LandingPage/feature-app-screenshort.png';
import Match from '../../assets/LandingPage/matchlove.png';
import Chat from '../../assets/LandingPage/talk.png';
import Quiz from '../../assets/LandingPage/test.png';
import Music from '../../assets/LandingPage/music.png';
import logoWhite from '../../assets/app-logo.png';
import logoBlack from '../../assets/app-logo2.png';
import Ali from '../../assets/LandingPage/ali.jpg';
import Masoud from '../../assets/LandingPage/masoud.jpg';
import Arman from '../../assets/LandingPage/arman.jpg';
import Reza from '../../assets/LandingPage/reza.jpg';
import Saba from '../../assets/LandingPage/saba.jpg';
import Particle from './Particle';

const onClickJoin = () => {
    const joinOverlay = document.getElementById("Join_overlay");
    joinOverlay.style.display = "flex";
    joinOverlay.style.alignItems = "center";
}

const onScrollLandingPage = () => {
    if (document.getElementById('landing-page').scrollTop > 50) {
        document.getElementById('header').classList.add('sticky');
    }
    else {
        document.getElementById('header').classList.remove('sticky');
    }
}

class LandingPage extends React.Component {
    render() {
        return (
            <div id="landing-page" className="LandingPage" onScroll={onScrollLandingPage}>
                <Join isOnAfterSignup={this.props.isOnAfterSignup} />
                <header id="header">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3 col-sm-3 col-xs-6">
                                <div className="logo">
                                    <a href="#home">
                                        <img id="logo-white" src={logoWhite} alt="" />
                                        <img id="logo-black" src={logoBlack} alt="" />
                                        <h1>
                                            <span className="white">Tune</span>
                                            <span className="red">Pal</span>
                                        </h1>
                                    </a>
                                </div>
                            </div>
                            <div className="col-md-9 col-sm-9 col-xs-6">
                                <div>
                                    <span></span>
                                    <nav>
                                        <ul>
                                            <li>
                                                <a href="#home">Home</a>
                                            </li>
                                            <li>
                                                <a href="#feature">Features</a>
                                            </li>
                                            <li>
                                                <a href="#team">Team</a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <section id="home" className="home">
                    <div className="particles">
                        <Particle />
                    </div>
                    <div className="container">
                        <div className="introduce">
                            <div className="absolute">
                                <h1>
                                    Listen, Talk, Love
                                </h1>
                                <div className="join" onClick={onClickJoin}>Join Us</div>
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

                <section id="feature" className="feature">
                    <div className="container">
                        <div className="heading">
                            <h2>Features</h2>
                        </div>
                        <div className="row margin-top">
                            <div className="col-md-6 col-sm-12 col-xs-12">
                                <div style={{width:"100%", height:"100%", display:"flex",alignItems:"center",justifyContent:"center"}}>    
                                    <figure itemProp="associatedMedia" itemScope itemType="http://schema.org/ImageObject">
                                        <img src={FeaturePhone} alt="" />
                                    </figure>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12 col-xs-12">
                                <div className="row content">
                                    <div className="col-md-6 col-sm-12 col-xs-12 item">
                                        <div className="in">
                                            <img className="icon" src={Match} alt="" />
                                            <h3 style={{fontSize:"large",fontFamily:"'Poppins', sans-serif"}}>Music twins!</h3>
                                            <p style={{fontSize:"small"}}>We match you to new people with similar taste of music</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12 col-xs-12 item">
                                        <div className="in">
                                        <img className="icon" src={Chat} alt="" />
                                        <h3 style={{fontSize:"large",fontFamily:"'Poppins', sans-serif"}}>Talk!</h3>
                                        <p style={{fontSize:"small"}}>We provide a safe palce for you to talk with new friends</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12 col-xs-12 item">
                                        <div className="in">
                                        <img className="icon" src={Music} alt="" />
                                        <h3 style={{fontSize:"large",fontFamily:"'Poppins', sans-serif"}}>Explore!</h3>
                                        <p style={{fontSize:"small"}}>Explore new musics and listen to other people top songs</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12 col-xs-12 item">
                                        <div className="in">
                                        <img className="icon" src={Quiz} alt="" />
                                        <h3 style={{fontSize:"large",fontFamily:"'Poppins', sans-serif"}}>Take a test!</h3>
                                        <p style={{fontSize:"small"}}>You can challange your knowledge of songs, artist ...!</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="team" className="team">
                        <div className="heading">
                            <h2>Team</h2>
                        </div>
                        <div className="margin-top itemscenter">
                            <div className="item">
                                <figure className="figure">
                                    <div className="devImage">
                                        <img className="image" src={Ali} alt="" />
                                    </div>
                                </figure>
                                <div className="itemborder"></div>
                                <div className="bio">
                                    <h2>Ali Sedaghi</h2>
                                    <h5>Front-end developer</h5>
                                </div>
                            </div>
                            <div className="item">
                                <figure className="figure">
                                    <div className="devImage">
                                        <img className="image" src={Masoud} alt="" />
                                    </div>
                                </figure>
                                <div className="itemborder"></div>
                                <div className="bio">
                                    <h2>Masoud Golestane</h2>
                                    <h5>Back-end developer</h5>
                                </div>
                            </div>
                            <div className="item" >
                                <figure className="figure">
                                    <div className="devImage">
                                        <img className="image" src={Arman} alt="" />
                                    </div>
                                </figure>
                                <div className="itemborder"></div>
                                <div className="bio">
                                    <h2>Arman Heydari</h2>
                                    <h5>Front-end developer</h5>
                                </div>
                            </div>
                            <div className="item">
                                <figure className="figure">
                                    <div className="devImage">
                                        <img className="image" src={Reza} alt="" />
                                    </div>
                                </figure>
                                <div className="itemborder"></div>
                                <div className="bio">
                                    <h2>Reza Mansourikhah</h2>
                                    <h5>Back-end developer</h5>
                                </div>
                            </div>
                            <div className="item">
                                <figure className="figure">
                                    <div className="devImage">
                                        <img className="image" src={Saba} alt="" />
                                    </div>
                                </figure>
                                <div className="itemborder"></div>
                                <div className="bio">
                                    <h2>Saba Roohandeh</h2>
                                    <h5>Front-end developer</h5>
                                </div>
                            </div>
                        </div>
                </section>
            </div>
        );
    }
}

export default LandingPage;