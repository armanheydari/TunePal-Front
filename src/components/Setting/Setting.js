import React from 'react';
import axios from 'axios';
import ProfilePicture from "../../assets/Default-Profile-Picture.jpg";

function legalAge() {
    const today = new Date();
    const year = today.getFullYear() - 18;
    let month = today.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    let day = today.getDate() - 1;
    if (day < 10) {
        day = "0" + day;
    }
    return year + "-" + month + "-" + day;
}

function genderToBool(gender) {
    if (gender === "Male") return true;
    return false;
}

function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}

class Setting extends React.Component {
    state = {
        name: this.props.user.name,
        gender: this.props.user.gender,
        birthday: this.props.user.birthday,
        bio: this.props.user.bio,
        favorites: this.props.user.favorites,
        picture: null,
        imagePreviewUrl: this.props.user.avatar,

        username: this.props.user.username,
        email: this.props.user.email,

        currentPassword: "",
        newPassword: "",
        confirmPassword: "",

        emailError: false,
        usernameError: false,
        currentPasswordError: false,

        generalResponse: false,
        securityResponse: false
    }

    requestConfig = () => {
        const config = {
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        };
        return config;
    }

    onChange = (e) => {
        const field = e.target.name;
        const newValue = e.target.value;
        this.setState(() => {
            return {
                [field]: newValue
            };
        });
    }

    changes = () => {
        let changes = {};
        if (this.state.name !== this.props.user.name) {
            changes.nickname = this.state.name;
        }
        if (this.state.gender !== this.props.user.gender) {
            changes.gender = this.state.gender;
        }
        if (this.state.birthday !== this.props.user.birthday) {
            changes.birthdate = this.state.birthday;
        }
        if (this.state.bio !== this.props.user.bio) {
            changes.biography = this.state.bio;
        }
        if (this.state.favorites !== this.props.user.favorites) {
            changes.interests = this.state.favorites;
        }
        return changes;
    }

    onSaveGeneral = (e) => {
        e.preventDefault();
        const toBack = this.changes();
        if (!isEmpty(toBack)) {
            if (toBack.hasOwnProperty("nickname")) {
                this.props.user.name = this.state.name;
            }
            if (toBack.hasOwnProperty("gender")) {
                this.props.user.gender = this.state.gender;
            }
            if (toBack.hasOwnProperty("birthdate")) {
                this.props.user.birthday = this.state.birthday;
            }
            if (toBack.hasOwnProperty("biography")) {
                this.props.user.bio = this.state.bio;
            }
            if (toBack.hasOwnProperty("interests")) {
                this.props.user.favorites = this.state.favorites;
            }
            const toBackJSON = JSON.stringify(toBack);
            axios.put('http://tunepal.pythonanywhere.com/account/sign_up/', toBackJSON, this.requestConfig())
                .then(res => {
                    this.setState(() => {
                        return {
                            generalResponse: true
                        };
                    });
                });
        }
    }

    securityChanges = () => {
        let changes = {};
        if (this.state.username !== this.props.user.username) {
            changes.username = this.state.username;
        }
        if (this.state.email !== this.props.user.email) {
            changes.email = this.state.email;
        }
        return changes;
    }

    lastUnvalidSecurity = {
        username: "",
        email: ""
    }

    usernameChangedFromUnvalid = () => {
        console.log(this.lastUnvalidSecurity.username);
        if (this.lastUnvalidSecurity.username !== this.state.username) {
            return true;
        }
        return false;
    }

    emailChangedFromUnvalid = () => {
        console.log(this.lastUnvalidSecurity.email);
        if (this.lastUnvalidSecurity.email !== this.state.email) {
            return true;
        }
        return false;
    }

    onSaveSecurity = (e) => {
        e.preventDefault();

        const toBack = this.securityChanges();
        if (!isEmpty(toBack)) {
            const toBackJSON = JSON.stringify(toBack);
            axios.put('http://tunepal.pythonanywhere.com/account/sign_up/', toBackJSON, this.requestConfig())
                .then(res => {
                    this.props.user.username = this.state.username;
                    this.props.user.email = this.state.email;
                    this.setState(() => {
                        return {
                            securityResponse: true
                        };
                    });
                })
                .catch(err => {
                    if (err.response.data.hasOwnProperty('username')) {
                        this.lastUnvalidSecurity.username = this.state.username;
                        this.setState(() => {
                            return {
                                usernameError: true
                            };
                        });
                    }
                    else {
                        this.setState(() => {
                            return {
                                usernameError: false
                            };
                        });
                    }
                    if (err.response.data.hasOwnProperty('email')) {
                        this.lastUnvalidSecurity.email = this.state.email;
                        this.setState(() => {
                            return {
                                emailError: true
                            };
                        });
                    }
                    else {
                        this.setState(() => {
                            return {
                                emailError: false
                            };
                        });
                    }
                });
        }

    }

    // onSavePassword = (e) => {
    //     e.preventDefault();
    //     const toBack = {
    //         currentPassword: this.state.currentPassword,
    //         newPassword: this.state.newPassword,
    //     }
    // }

    onFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('user_avatar', this.state.picture);
        const config = {
           // mode: "cors",
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'content-type': 'multipart/form-data'
            }
        };

        axios.put("http://tunepal.pythonanywhere.com/account/sign_up/", formData, config)
            // .then((response) => {
            //     axios.get('http://tunepal.pythonanywhere.com/account/get_user_info/', config)
            // })
            // .catch((error) => {
            //     console.log(error.data);
            // });
            // //console.log(a);
    }
    onChangeFile = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let picture = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                picture: picture,
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(picture)
    }

    render() {
        return (
            <div className="Setting_container">
                <h1 className="Setting_title">Setting</h1>

                <form className="Setting_form" onSubmit={this.onFormSubmit}>
                    <div className="Settings_Picture-container">
                        <img className="Settings_Picture" alt="avatar" src={this.state.imagePreviewUrl || ProfilePicture}></img>
                        <input className="Settings_picture-firstbutton" type="file" name="picture" id="file" onChange={this.onChangeFile} />
                        <button className="Settings_picture-secondbutton" type="submit">Submit</button>
                    </div>
                </form>

                <form className="Setting_form" onSubmit={this.onSaveGeneral}>
                    <h2>General Info</h2>

                    <div className="Setting_field">
                        <label className="Setting_label">Name</label>
                        <input
                            className="Setting_input"
                            type="text"
                            name="name"
                            value={this.state.name}
                            onChange={this.onChange}
                            required
                        />
                    </div>

                    <div className="Setting_field">
                        <label className="Setting_label">Gender</label>
                        <div className="Setting_gender-input-container">
                            <div className="Setting_male-container">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Male"
                                    onChange={this.onChange}
                                    checked={genderToBool(this.state.gender)}
                                    required
                                /><span>Male</span>
                            </div>
                            <div className="Setting_female-container">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Female"
                                    onChange={this.onChange}
                                    checked={!genderToBool(this.state.gender)}
                                    required
                                /><span>Female</span>
                            </div>
                        </div>
                    </div>

                    <div className="Setting_field">
                        <label className="Setting_label">Birthday</label>
                        <input
                            className="Setting_input"
                            type="date"
                            name="birthday"
                            value={this.state.birthday}
                            onChange={this.onChange}
                            min="1900-01-01"
                            max={legalAge()}
                            required
                        />
                    </div>

                    <div className="Setting_field">
                        <label className="Setting_label">Biography</label>
                        <textarea
                            className="Setting_input"
                            name="bio"
                            rows="2"
                            maxLength="150"
                            value={this.state.bio}
                            onChange={this.onChange}
                        >
                        </textarea>
                    </div>

                    <div className="Setting_field">
                        <label className="Setting_label">Favorites</label>
                        <textarea
                            className="Setting_input"
                            name="favorites"
                            rows="2"
                            maxLength="30"
                            value={this.state.favorites}
                            onChange={this.onChange}
                        >
                        </textarea>
                    </div>

                    <button disabled={isEmpty(this.changes())}>Save Changes</button>
                    <span className="Setting_response">{(this.state.generalResponse && isEmpty(this.changes())) && "Saved."}</span>
                </form>


                {/* <div className="Setting_privacy">
                    <h2>Privacy</h2>

                </div> */}

                <form className="Setting_form" onSubmit={this.onSaveSecurity}>
                    <h2>Security</h2>
                    <div className="Setting_field">
                        <label className="Setting_label">Username</label>
                        <input
                            className="Setting_input"
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={this.onChange}
                            required
                        />
                        <span className="Setting_error">{(this.state.usernameError && !this.usernameChangedFromUnvalid()) && "This username is taken."}</span>
                    </div>

                    <div className="Setting_field">
                        <label className="Setting_label">Email</label>
                        <input
                            className="Setting_input"
                            type="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            required
                        />
                        <span className="Setting_error">{(this.state.emailError && !this.emailChangedFromUnvalid()) && "This email is taken."}</span>
                    </div>

                    <button disabled={isEmpty(this.securityChanges())}>Save Changes</button>
                    <span className="Setting_response">{(this.state.securityResponse && isEmpty(this.securityChanges())) && "Saved."}</span>
                </form>

                <form className="Setting_form" onSubmit={this.onSavePassword}>
                    <h2>Password</h2>
                    <div className="Setting_field">
                        <label className="Setting_label">Current Password</label>
                        <input
                            className="Setting_input"
                            type="password"
                            name="currentPassword"
                            value={this.state.password}
                            onChange={this.onChange}
                            required
                        /><span className="Setting_error">{this.state.currentPasswordError && "Password is wrong."}</span>
                    </div>

                    <div className="Setting_field">
                        <label className="Setting_label">New Password</label>
                        <input
                            className="Setting_input"
                            type="password"
                            name="newPassword"
                            value={this.state.password}
                            onChange={this.onChange}
                            required
                        />
                    </div>

                    <div className="Setting_field">
                        <label className="Setting_label">Confirm Password</label>
                        <input
                            className="Setting_input"
                            type="password"
                            name="confirmPassword"
                            value={this.state.password}
                            onChange={this.onChange}
                            required
                        /><span className="Setting_error">{this.state.newPassword !== this.state.confirmPassword && "Passwords does not match."}</span>
                    </div>

                    <button>Save Change</button>
                </form>

            </div>
        );
    };
}
export default Setting;
