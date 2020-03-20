import React from 'react';

import '../../style/Signup.css';


// function maxDate() {
//     const today = new Date();
//     return today.getFullYear + "-" + today.getMonth + 1 + "-" + today.getDay;
// }


class Signup extends React.Component {

    state = {
        firstName: '',
        lastName: '',
        gender: '',
        birthday: '',
        email: '',
        username: '',
        password: '',
        passwordReEnter: '',
        picture: '',
        latestField: ''
    }

    onChange = (e) => {
        const field = e.target.name;
        const newValue = e.target.value;
        this.setState({[field]: newValue});
        if (e.target.name === "birthday") {
            console.log(this.legalAge());
        }
    }

    onSubmit = (e) => {
            e.preventDefault();
            console.log(this.state.firstName);
            console.log(this.state.lastName);
            console.log(this.state.gender)
            console.log(this.state.birthday);
            console.log(this.state.email);
            console.log(this.state.username);
            console.log(this.state.password);
            console.log(this.state.picture);
    }

    legalAge = () => {
        const today = new Date();
        console.log(this.state.birthday);
        const birthYear = this.state.birthday.split('-')[0];
        console.log(birthYear);
        console.log(today.getFullYear - birthYear);
        if (parseInt(today.getFullYear) - parseInt(birthYear) >= 19) {
            return true;
        }

        else if (today.getFullYear - birthYear === 18) {
            const birthMonth = this.state.birthday.split("-")[1];
            const birthDay = this.state.birthday.split("-")[2];

            if (today.getMonth + 1 < birthMonth) {
                return true;
            }

            else if (today.getMonth + 1 === birthMonth) {
                if (today.getDay >= birthDay) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        }

        else {
            return false;
        }
    }



    isSame = () => {
        if (this.state.password === this.state.passwordReEnter) {
            console.log("Same");
        }
        else {
            console.log("notSame");
        }
    }

    // todayDate = () => {
    //     const today = new Date();
    //     return today.getFullYear + "-" + today.getMonth + 1 + "-" + today.getDay;
    // }
    
    render() {
        return (
            <React.Fragment>
                <form style={{textAlign: 'center'}} onSubmit={this.onSubmit}>
                    
                    <label>First Name:</label> <br />
                    <input 
                        type="text"
                        name="firstName"
                        pattern="[a-zA-Z]{3,16}"
                        required
                        onChange={this.onChange}
                    />

                    <br />

                    <label>Last Name:</label> <br />
                    <input
                        type="text"
                        name="lastName"
                        pattern="[a-zA-Z]{3,16}"
                        required
                        onChange={this.onChange}
                    />

                    <br />

                    <label>Gender:</label>
                    <input
                        type="radio"
                        name="gender"
                        value="Male"
                        required
                        onChange={this.onChange}
                    /> Male

                    <input
                        type="radio"
                        name="gender"
                        value="Female"
                        required
                        onChange={this.onChange}
                    /> Female

                    <br />

                    <label>Birthday:</label> <br />
                    <input
                        type="date"
                        name="birthday"
                        min="1900-01-01"
                        max="2010-12-31"
                        required
                        onChange={this.onChange}
                        
                        
                    />

                    <br />

                    <label>Email:</label> <br />
                    <input
                        type="email"
                        name="email"
                        required
                        onChange={this.onChange}
                    />

                    <br />

                    <label>Username:</label> <br />
                    <input
                        type="text"
                        name="username"
                        pattern="^[a-z0-9_-]{3,16}$"
                        required
                        onChange={this.onChange}
                    />

                    <br />
                    
                    <label>Password:</label> <br />
                    <input
                        type="password"
                        name="password"
                        pattern="^[a-zA-Z0-9_-]{6,16}"
                        required
                        onChange={this.onChange}
                    />

                    <br />
                    
                    <label>reEnter Password:</label> <br />
                    <input
                        type="password"
                        name="passwordReEnter"
                        required
                        onChange={this.onChange}
                    />

                    <br />
                    
                    <label>Choose a profile picture:</label> <br />
                    <input
                        type="file"
                        name="picture"
                        accept=".jpg"
                        onChange={this.onChange}
                    />

                    <br />

                    <input
                        type="submit"
                        name="signup"
                        value="Signup"
                    />

                </form>
            </React.Fragment>
        )
    }
}

export default Signup; 