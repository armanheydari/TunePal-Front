import React from 'react';
import '../../style/Login_Signup.css'

class Login_Signup extends React.Component {
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

    onSubmitSignup = (e) =>{
        e.preventDefault();
        let signup = {
            name: this.state.name,
            gender: this.state.gender,
            birthday: this.state.birthday,
            email: this.state.email,
            username: this.state.signupUsername,
            password: this.state.signupPassword
        }
        if (signup.gender === "") {
            signup.gender = "female";
        }
        console.log(signup);
    }

    onSubmitLogin = (e) => {
        e.preventDefault();
        let login = {
            username: this.state.loginUsername,
            password: this.state.loginPassword
        }
        console.log(login);
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
        const container = document.getElementById('container');
        container.classList.remove("right-panel-active");
    }

    onClickSignup = () => {
        const container = document.getElementById('container');
        container.classList.add("right-panel-active");
    }

    render() {
        return (
            <div className="container" id="container">

	            <div className="form-container signup-container">

		            <form onSubmit={this.onSubmitSignup} action="#">

			            <h1>Create Account</h1>
			            {/* <div class="social-container">
				            <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
				            <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
				            <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
			            </div> */}

			            {/* <span>or use your email for registration</span> */}

                        <input
                            type="text"
                            name="name" 
                            placeholder="Name" 
                            onChange={this.onChange} 
                            // pattern="" 
                            required
                        />

                        <div className="gender-container">
                            <label className="gender-label">Gender:</label>
                            <select name="gender" id="gender" placeholder="Gender" onChange={this.onChange} required>
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                            </select>
                            {/* <input className="gender-input" type="radio" name="sex" value="f"/> Male
                            <input className="gender-input" type="radio" name="sex" value="m"/> Female */}
                        </div>

                        <div className="birthday-container">
                        <label className="birthday-label">Birthday:</label>
                            <input 
                                className="birthday-input"
                                type="date"
                                name="birthday"
                                min="1900-01-01"
                                max={this.legalAge()}
                                required
                                onChange={this.onChange}
                            />
                        </div>

                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Email" 
                            onChange={this.onChange} 
                            required
                        />

                        <input 
                            type="text" 
                            name="signupUsername" 
                            placeholder="Username" 
                            onChange={this.onChange} 
                            // pattern="" 
                            required
                        />

                        <input 
                            type="password" 
                            name="signupPassword" 
                            placeholder="Password" 
                            onChange={this.onChange} 
                            // pattern="" 
                            required
                        />

			            <button>Sign Up</button>

		            </form>

	            </div>

	            <div className="form-container login-container">

		            <form onSubmit={this.onSubmitLogin} action="#">

			            <h1>Login</h1>
			            {/* <div class="social-container">
				            <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
				            <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
				            <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
			            </div> */}

			            {/* <span>or use your account</span> */}
                        <input 
                            type="text" 
                            name="loginUsername" 
                            placeholder="Username" 
                            onChange={this.onChange} 
                            required
                        />
                        <input 
                            type="password" 
                            name="loginPassword" 
                            placeholder="Password" 
                            onChange={this.onChange} 
                            required
                        />

			            {/* <a href="#">Forgot your password?</a> */}
			            <button>Login</button>

		            </form>

	            </div>

	            <div className="overlay-container">

		            <div className="overlay">

			            <div className="overlay-panel overlay-left">
				            <h1>Welcome Back!</h1>
				            <p className="login-p">To keep connected with us please login with your personal info</p>
				            <button className="ghost" id="signIn" onClick={this.onClickLogin}>Login</button>
			            </div>

			            <div className="overlay-panel overlay-right">
				            <h1>Hello, Friend!</h1>
				            <p className="feature-p">
                                In TunePal you can find and chat your music mate
                                based on your music taste.<br/> <br/>
                                
                                TunePal also has a great number of music fan clubs<br/> <br/>
                                Also you can challenge your music knowledge.
                            </p>
                            <p className="signup-p">If you don't have an account</p>
				            <button className="ghost" id="signUp" onClick={this.onClickSignup}>Sign Up</button>
			            </div>

		            </div>

	            </div>

            </div>
        )
    }
}

export default Login_Signup;
