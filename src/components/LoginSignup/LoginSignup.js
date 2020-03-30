import React from 'react';
import axios from 'axios';

import './styles/LoginSignup.css';

function legalAge() {
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
    return year + "-" + month + "-" + day;
}
const maxBirthday = legalAge();

const config = {
    mode: "cors",
    headers: {
    'Content-Type': 'application/json'
    }
}

class LoginSignup extends React.Component {
    state = {
        loginUsername: '',
        loginPassword: '',
        showLoginResult: false,
        authorized: false,

        name: '',
        gender: '',
        birthday: '',
        email: '',
        signupUsername: '',
        signupPassword: '',
        showSignupResult: false,
        validEmail: false,
        validUsername: false
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
        axios.post('http://tunepal.pythonanywhere.com/account/sign_up/',
            signupJSON, 
            config
            )
            .then(res => {
                this.setState({showSignupResult: true});
                this.setState({validEmail: true});
                this.setState({validUsername: true});
                console.log(res.data.data.token);
                localStorage.setItem('token', res.data.data.token);
            })
            .catch(err => {
                this.setState({showSignupResult: true});
                console.log(err.response.data);
                if (err.response.data.hasOwnProperty('email')) {
                    this.setState({validEmail: false});
                }
                else {
                    this.setState({validEmail: true});
                }
                if (err.response.data.hasOwnProperty('username')) {
                    this.setState({validUsername: false});
                }
                else {
                    this.setState({validUsername: true});
                }
            })
    }

    onSubmitLogin = (e) => {
        e.preventDefault();
        const login = {
            username: this.state.loginUsername,
            password: this.state.loginPassword
        };
        const loginJSON = JSON.stringify(login);

        axios.post('http://tunepal.pythonanywhere.com/account/login/',
            loginJSON,
            config
            )
            .then(res => {
                this.setState({showLoginResult: true});
                this.setState({authorized: true});
                console.log(res.data.data.token);
                localStorage.setItem('token', res.data.data.token);
            })
            .catch(err => {
                this.setState({showLoginResult: true});
                this.setState({authorized: false});
            });
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
                                max={maxBirthday}
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
                        <div className="LoginSignup_validation-email">{(this.state.showSignupResult && !this.state.validEmail) && "Email already exists."}</div>

                        <input 
                            className="LoginSignup_input"
                            type="text" 
                            name="signupUsername" 
                            placeholder="Username" 
                            onChange={this.onChange} 
                            // pattern="" 
                            required
                        />
                        <div className="LoginSignup_validation-username">{(this.state.showSignupResult && !this.state.validUsername) && "Username already exists."}</div>


                        <input 
                            className="LoginSignup_input"
                            type="password" 
                            name="signupPassword" 
                            placeholder="Password" 
                            onChange={this.onChange} 
                            pattern=".{8,}"
                            title="Password must be at least 8 characters."
                            required
                        />

			            <button className="LoginSignup_button">Sign Up</button>

		            </form>

	            </div>

	            <div className="LoginSignup_form-container LoginSignup_login-container">

		            <form className="LoginSignup_form" onSubmit={this.onSubmitLogin} action="#">

			            <h1>Login</h1>
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

			            <button className="LoginSignup_button">Login</button>
                        <div>
                            {(this.state.showLoginResult && !this.state.authorized) && "Username or Password is incorrect."}
                        </div>

                        <div>
                            {(this.state.showLoginResult && this.state.authorized) && "Succceed."}
                        </div>
		            </form>



                    }

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
