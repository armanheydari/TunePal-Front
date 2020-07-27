import React from 'react'
import Particles from 'react-particles-js';
import note1 from '../../assets/LandingPage/note1.png';
import note2 from '../../assets/LandingPage/note2.png';
import heart from '../../assets/LandingPage/heart.png';
import woman2 from '../../assets/LandingPage/woman2.png';
import woman4 from '../../assets/LandingPage/woman4.png';
import woman5 from '../../assets/LandingPage/woman5.png';
import man1 from '../../assets/LandingPage/man1.png';
import man2 from '../../assets/LandingPage/man2.png';

function Particle() {
    return (
        <Particles
            params={
                {
                    "absorbers": [],
                    "background": {},
                    "backgroundMask": {
                        "cover": {
                        "color": {
                            "value": "#fff"
                        },
                        "opacity": 1
                        },
                        "enable": false
                    },
                    "detectRetina": true,
                    "emitters": [],
                    "fpsLimit": 60,
                    "infection": {
                        "cure": false,
                        "delay": 0,
                        "enable": false,
                        "infections": 0,
                        "stages": []
                    },
                    "interactivity": {
                        "detectsOn": "canvas",
                        "events": {
                        "onClick": {
                            "enable": true,
                            "mode": "push"
                        },
                        "onDiv": {
                            "elementId": "repulse-div",
                            "enable": false,
                            "mode": "repulse"
                        },
                        "onHover": {
                            "enable": true,
                            "mode": "connect",
                            "parallax": {
                            "enable": false,
                            "force": 60,
                            "smooth": 10
                            }
                        },
                        "resize": true
                        },
                        "modes": {
                        "absorbers": [],
                        "bubble": {
                            "distance": 400,
                            "duration": 2,
                            "opacity": 0.8,
                            "size": 40
                        },
                        "connect": {
                            "distance": 80,
                            "lineLinked": {
                            "opacity": 0.5
                            },
                            "radius": 60
                        },
                        "emitters": [],
                        "grab": {
                            "distance": 400,
                            "lineLinked": {
                            "opacity": 1
                            }
                        },
                        "push": {
                            "quantity": 4
                        },
                        "remove": {
                            "quantity": 2
                        },
                        "repulse": {
                            "distance": 200,
                            "duration": 0.4,
                            "speed": 1
                        },
                        "slow": {
                            "factor": 3,
                            "radius": 200
                        }
                        }
                    },

                    "particles": {
                        "collisions": {
                        "enable": false,
                        "mode": "bounce"
                        },
                        "color": {
                        "value": "random"
                        },
                        "lineLinked": {
                        "blink": false,
                        "color": {
                            "value": "#ffffff"
                        },
                        "consent": false,
                        "distance": 150,
                        "enable": false,
                        "opacity": 0.4,
                        "shadow": {
                            "blur": 5,
                            "color": {
                            "value": "lime"
                            },
                            "enable": false
                        },
                        "width": 1
                        },
                        "move": {
                        "attract": {
                            "enable": false,
                            "rotate": {
                            "x": 600,
                            "y": 1200
                            }
                        },
                        "direction": "none",
                        "enable": true,
                        "noise": {
                            "delay": {
                            "random": {
                                "enable": false,
                                "minimumValue": 0
                            },
                            "value": 0
                            },
                            "enable": false,
                            "factor": {
                            "horizontal": {
                                "value": 50,
                                "offset": 0
                            },
                            "vertical": {
                                "value": 10,
                                "offset": 40000
                            }
                            }
                        },
                        "outMode": "out",
                        "random": false,
                        "speed": 3,
                        "straight": false,
                        "trail": {
                            "enable": false,
                            "length": 10,
                            "fillColor": {
                            "value": "#000000"
                            }
                        },
                        "vibrate": false
                        },
                        "number": {
                        "density": {
                            "enable": true,
                            "area": 800,
                            "factor": 1000
                        },
                        "limit": 80,
                        "value": 40
                        },
                        "opacity": {
                        "animation": {
                            "enable": false,
                            "minimumValue": 0.1,
                            "speed": 1,
                            "sync": false
                        },
                        "random": {
                            "enable": false,
                            "minimumValue": 1
                        },
                        "value": 0.5
                        },
                        "rotate": {
                        "animation": {
                            "enable": false,
                            "speed": 0,
                            "sync": false
                        },
                        "direction": "clockwise",
                        "random": false,
                        "value": 0
                        },
                        "shadow": {
                        "blur": 0,
                        "color": {
                            "value": "#000000"
                        },
                        "enable": false,
                        "offset": {
                            "x": 0,
                            "y": 0
                        }
                        },

                        "shape": {                    
                        "type": [
                            "image"
                        ],
                        "image": [
                            {
                                "src": woman2,
                                "height": 20,
                                "width": 20
                            },
                            {
                                "src": man1,
                                "height": 20,
                                "width": 20
                            },
                            {
                                "src": note1,
                                "height": 20,
                                "width": 23
                            },
                            {
                                "src": heart,
                                "height": 20,
                                "width": 20
                            },
                            {
                                "src": woman4,
                                "height": 20,
                                "width": 20
                            },
                            {
                                "src": man2,
                                "height": 20,
                                "width": 20
                            },
                            {
                                "src": note2,
                                "height": 20,
                                "width": 20
                            },
                            {
                                "src": woman5,
                                "height": 20,
                                "width": 20
                            }
                        ]
                        },

                        "size": {
                        "animation": {
                            "destroy": "none",
                            "enable": false,
                            "minimumValue": 0.1,
                            "speed": 40,
                            "startValue": "max",
                            "sync": false
                        },
                        "random": {
                            "enable": true,
                            "minimumValue": 10
                        },
                        "value": 12
                        },
                        "stroke": {
                        "color": {
                            "value": "#000000"
                        },
                        "width": 0,
                        "opacity": 1
                        },
                        "twinkle": {
                        "lines": {
                            "enable": false,
                            "frequency": 0.05,
                            "opacity": 1
                        },
                        "particles": {
                            "enable": false,
                            "frequency": 0.05,
                            "opacity": 1
                        }
                        }
                    },

                    "pauseOnBlur": true,
                    "polygon": {
                        "draw": {
                        "enable": false,
                        "stroke": {
                            "color": {
                            "value": "#ffffff"
                            },
                            "width": 0.5,
                            "opacity": 1
                        }
                        },
                        "enable": false,
                        "inline": {
                        "arrangement": "one-per-point"
                        },
                        "move": {
                        "radius": 10,
                        "type": "path"
                        },
                        "scale": 1,
                        "type": "none",
                        "url": ""
                    }
                }
            }
        />
    );
}

export default Particle;