import React from 'react';

import '../../style/Login.css';

class Login extends React.Component {

    state = {
        username: '',
        password: ''
    }

    onChange = (e) => {
        //this.setState({[e.target.name]: e.target.value});
        //this.state.username = e.target.value;
        console.log(this.state.username);
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.username);
        console.log(this.state.password);
    }

    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.onSubmit}>

                    <label>Username:</label> <br />
                    <input 
                        type="text"
                        name="username"
                        onChange={this.onChange}
                    />

                    <br />

                    <label>Password:</label> <br />
                    <input 
                        type="password"
                        name="password"
                        onChange={this.onChange}
                    />

                    <br />

                    <input 
                        type="submit" 
                        name="loginBtn" 
                        value="Login"
                         
                    />

                </form>
            </React.Fragment>
        )
    }
}

export default Login;