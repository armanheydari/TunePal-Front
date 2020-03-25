import React from 'react';
import axios from 'axios';

import './styles/LoginSignup.css';

class LoginSignup extends React.Component {

    state = {
        loginUsername: '',
        loginPassword: '',

        name: '',
        gender: '',
        birthday: '',
        email: '',
        signupUsername: '',
        signupPassword: ''
    }

    onChange = (e) => {
        const field = e.target.name;
        const newValue = e.target.value;
        this.setState({[field]: newValue});
    }

     onSubmitSignup = (e) => {
        e.preventDefault();
        const signup = {
            birthdate: this.state.birthday,
            email: this.state.email,
            gender: this.state.gender,
            nickname: this.state.name,
            password: this.state.signupPassword,
            username: this.state.signupUsername
        };
        const signupJSON = JSON.stringify(signup);
        const config = 
        {
            mode: "cors",
            headers: 
            {
            'Content-Type': 'application/json'
            }
        }

        const a = axios.post('http://tunepal.pythonanywhere.com/account/sign_up/',
            signupJSON, 
            config
            );
            // .then(res => {
            //     console.log(res.response.data.message);
            // })
            // .catch(err => {
            //     console.log(err.response.data.message);
            // });

            //case1 succcccc    "your account have been created successfuly"
            //case2 username already exist  response.data.username[0] :"Username already exists."
            //case3 email already exist response.data.email[0] :"Email already exists."
            //case4 user email already exist both 2 above
            //case5 pass >=8    response.data.password[0]: "Password should be atleast 8 characters long."
            console.log(a);
    }

    onSubmitLogin = (e) => {
        e.preventDefault();
        const login = {
            username: this.state.loginUsername,
            password: this.state.loginPassword
        };
        const loginJSON = JSON.stringify(login);
        const config = 
        {
            mode: "cors",
            headers: 
            {
            'Content-Type': 'application/json'
            }
        };

        const a = axios.post('http://tunepal.pythonanywhere.com/account/login/',
            loginJSON,
            config
            );
            // .then(
            //     res => {
            //         console.log(res.data.message);
            //     }
            // )
            // .catch(err => {
            //     console.log(err.response.data.message);
            // });
            console.log(a);

            //cases 1. succex   "Your account info is correct"
            //case 2. username wrong (password dont care)   "There is not any account with this username"
            //case 3.username correct  pass wrong
    }

    legalAge = () => {
        const today = new Date();
        const year = today.getFullYear() - 18;
        let month = today.getMonth() + 1;
        if (month < 10) {
            month = "0" + month;
        }
        let day = today.getDate();
        if (day < 10) {
            day = "0" + day;
        }
        console.log(year + "-" + month + "-" + day);
        return year + "-" + month + "-" + day;
    }

    onClickLogin = () => {
        const container = document.getElementById('LoginSignup_container');
        container.classList.remove("right-panel-active");
    }

    onClickSignup = () => {
        const container = document.getElementById('LoginSignup_container');
        container.classList.add("right-panel-active");
    }

    render() {
        return (
            <div className="LoginSignup_container" id="LoginSignup_container">

	            <div className="LoginSignup_form-container LoginSignup_signup-container">

		            <form className="LoginSignup_form" onSubmit={this.onSubmitSignup} action="#">

			            <h1>Create Account</h1>
			            {/* <div class="social-container">
				            <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
				            <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
				            <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
			            </div> */}

			            {/* <span>or use your email for registration</span> */}

                        <input
                            className="LoginSignup_input"
                            type="text"
                            name="name" 
                            placeholder="Name" 
                            onChange={this.onChange} 
                            // pattern="" 
                            required
                        />

                        <div className="LoginSignup_gender-container">
                            <label className="LoginSignup_gender-label">Gender:</label>
                            {/* <select name="gender" id="gender" placeholder="Gender" onChange={this.onChange} required>
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                            </select> */}
                            <input className="LoginSignup_input LoginSignup_gender-input" type="radio" name="gender" value="Male" onChange={this.onChange} required/>Male
                            <input className="LoginSignup_input LoginSignup_gender-input" type="radio" name="gender" value="Female" onChange={this.onChange} required/>Female
                        </div>

                        <div className="LoginSignup_birthday-container">
                        <label className="LoginSignup_birthday-label">Birthday:</label>
                            <input 
                                className="LoginSignup_input LoginSignup_birthday-input"
                                type="date"
                                name="birthday"
                                min="1900-01-01"
                                max={this.legalAge()}
                                required
                                onChange={this.onChange}
                            />
                        </div>

                        <input 
                            className="LoginSignup_input"
                            type="email" 
                            name="email" 
                            placeholder="Email" 
                            onChange={this.onChange} 
                            required
                        />

                        <input 
                            className="LoginSignup_input"
                            type="text" 
                            name="signupUsername" 
                            placeholder="Username" 
                            onChange={this.onChange} 
                            // pattern="" 
                            required
                        />

                        <input 
                            className="LoginSignup_input"
                            type="password" 
                            name="signupPassword" 
                            placeholder="Password" 
                            onChange={this.onChange} 
                            // pattern="" 
                            required
                        />

			            <button className="LoginSignup_button">Sign Up</button>

		            </form>

	            </div>

	            <div className="LoginSignup_form-container LoginSignup_login-container">

		            <form className="LoginSignup_form" onSubmit={this.onSubmitLogin} action="#">

			            <h1>Login</h1>
			            {/* <div class="social-container">
				            <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
				            <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
				            <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
			            </div> */}

			            {/* <span>or use your account</span> */}
                        <input 
                            className="LoginSignup_input"
                            type="text" 
                            name="loginUsername" 
                            placeholder="Username" 
                            onChange={this.onChange} 
                            required
                        />
                        <input 
                            className="LoginSignup_input"
                            type="password" 
                            name="loginPassword" 
                            placeholder="Password" 
                            onChange={this.onChange} 
                            required
                        />

			            {/* <a href="#">Forgot your password?</a> */}
			            <button className="LoginSignup_button">Login</button>

		            </form>

	            </div>

	            <div className="LoginSignup_overlay-container">

		            <div className="LoginSignup_overlay">

			            <div className="LoginSignup_overlay-panel LoginSignup_overlay-left">
				            <h1>Welcome Back!</h1>
				            <p className="LoginSignup_login-p">To keep connected with us please login with your personal info</p>
				            <button className="LoginSignup_button ghost" id="LoginSignup_signIn" onClick={this.onClickLogin}>Login</button>
			            </div>

			            <div className="LoginSignup_overlay-panel LoginSignup_overlay-right">
				            <h1>TunePal</h1>
				            <p className="LoginSignup_feature-p">
                                In TunePal you can find and chat your music mate
                                based on your music taste.<br/> <br/>
                                
                                TunePal also has a great number of music fan clubs<br/> <br/>
                                Also you can challenge your music knowledge.
                            </p>
                            <p className="LoginSignup_signup-p">If you don't have an account</p>
				            <button className="LoginSignup_button ghost" id="LoginSignup_signUp" onClick={this.onClickSignup}>Sign Up</button>
			            </div>

		            </div>

	            </div>

            </div>
        )
    }
}

export default LoginSignup;
