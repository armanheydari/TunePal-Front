import React from 'react';
import'./styles/LandingPage.css';
import { Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AppLogo from '../../assets/app-logo.png';



class LandingPage extends React.Component {

    render() {
        
            return (
                <div className="LandingPage">
                 
                  
                    <element className ="section-bubble1">
                           <img src = {AppLogo} alt="" style={{ marginTop :"30px", width: "200px" , height: "200px" }} className = "img"/>
                           <h1>TunePal</h1>

                    <h2  className="LandingPage_header"> We Listen , We Talk , We love !</h2>
                <p>
                    <Link to="/LoginSignup">
                          
                     <button class="mdc-fab" aria-label="JoinUs">
                     <div class="mdc-fab__ripple"></div>
                     <span class="mdc-fab__icon material-icons">Join us !</span>
                     </button>
                        
                        </Link>

                    
                    </p>
                     </element>
                    <element className ="section-bubble2">
                    <h1 > New people , Same taste! </h1>

                    <p> We match you to new people with same taste of music as you.
                        share you passion for music with people who care! 
                        <br></br>
                        find new friends from near or far and maybe you will find THE ONE! :) 
                    </p>
                    
                    </element>
                    <element className ="section-bubble3"> 
                    
                    <h1 >Talk! Talk! Talk!</h1>
                    <p> we provide a safe palce for you to freely talk with your new friends
                        <br></br>
                        and it's not just MUSIC! you can talk about a whole bunch of other stuff you're intrested in and you can find the subjects 
                        <br></br> on each persons profile !HOW COOL IS THAT?
                         </p>

                    </element>

                    <element className="section-bubble4">
                    <h1 >Let the Games Begin!</h1>
                    <p> You can challange your knowledge of music from you top artist to your all time favorit album .
                        <br></br>
                        take the quiz , answer the questions and challange yourself and honestly JUST HAVE FUN :))))
                          </p>
                    

                        </element>

                   <element className="section-bubble5">
                   <h1 >TunePal.co</h1>
                    <p>contact us on all social media</p> 
                    <br>
                    </br>
                    <br>
                    </br>
                    <br>
                    </br>
                    <br>
                    </br>
                    <br>
                    </br>
                    <br>
                    </br>
                    
                        
                        </element>


                    
                   
                </div> 
                
            )
        
    }
}





export default LandingPage;