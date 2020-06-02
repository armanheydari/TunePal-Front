import React from 'react';
import './styles/MobileJoin.scss';
import { Form, Input, Button, Select, DatePicker } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Axios from 'axios';
import serverURL from '../../utils/serverURL';

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

const { Option } = Select;

const dateFormat = 'YYYY-MM-DD';

const maxBirthdate = () => {
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

var UID = {
	_current: 0,
  getNew: function(){ this._current++; return this._current; },
  _props: {},
  addProp: function(id, prop, value) {
    this._props[id] = {
      prop : prop,
      value: value
    };
  },
  isPropExist: function(prop, value) {
    for (const id in this._props) {
      if (this._props.hasOwnProperty(id)) {
        const element = this._props[id];
        if (element.prop === prop && element.value === value) {
          return id;
        }
      }
    }
    return false;
  }
};

HTMLElement.prototype.pseudoStyle = function(element,prop,value){
	var _this = this;
	var _sheetId = 'pseudoStyles';
	var _head = document.head || document.getElementsByTagName('head')[0];
	var _sheet = document.getElementById(_sheetId) || document.createElement('style');
      _sheet.id = _sheetId;

  var regx = new RegExp('\\b' + 'pseudoStyle' + '.*?\\b', 'g');
  _this.className = _this.className.replace(regx, '');

  var currentID = UID.isPropExist(prop, value);
  if (currentID != false) {
    _this.className +=  ' ' + 'pseudoStyle' + currentID; 
  }
  else { 
    var newID = UID.getNew();
    UID.addProp(newID, prop, value);
    
    _this.className  += '  ' + 'pseudoStyle' + newID; 
    _sheet.innerHTML += ' .' + 'pseudoStyle' + newID + ':' + element + '{' + prop + ':' + value + '}';
    _head.appendChild(_sheet);
  }
  
  return this;
};

const onClickSignup = (e) => {
    const signupContainer = document.getElementById('signup-container');
    const loginContainer = document.getElementById('login-container');
	Array.from(signupContainer.classList).find((element) => {
		if (element === "slide-up") {
            signupContainer.classList.remove('slide-up');
            loginContainer.classList.add('slide-up');
            document.getElementById('join-mobile').style.background = "white";
            loginContainer.pseudoStyle("before","background","linear-gradient(to right, rgb(255, 65, 108), rgb(255, 75, 43)) !important");
        }
    });
}

const onClickLogin = (e) => {
    const signupContainer = document.getElementById('signup-container');
    const loginContainer = document.getElementById('login-container');
	Array.from(loginContainer.classList).find((element) => {
		if (element === "slide-up") {
            signupContainer.classList.add('slide-up');
            loginContainer.classList.remove('slide-up');
            document.getElementById('join-mobile').style.background = "linear-gradient(to right, rgb(255, 65, 108), rgb(255, 75, 43))";
            loginContainer.pseudoStyle("before","background","white !important");
        }
	});
}

class MobileJoin extends React.Component {
    state = {
        loginUsername: '',
        loginPassword: '',
        isLogining: undefined,
        isLoginFailed: undefined,

        name: '',
        gender: '',
        birthday: '',
        email: '',
        signupUsername: '',
        signupPassword: '',
        isSignupLoading: false,
        showSignupResult: false,
        validEmail: false,
        validUsername: false,
        lastInvalidEmail: '',
        lastInvalidUsername: ''
    }

    render() {
        return (
            <div className="form-structor" id="join-mobile">
                <div className="signup" id="signup-container">
                    <div className="center">
                        <h2 className="form-title" id="signup" onClick={onClickSignup}><span>or</span>Sign up</h2>
                        <div className="form-holder">
                            <Form
                                className="login-form"
                                onFinish={this.onSubmitSignup}
                            >

                                <Form.Item
                                    name="name"
                                    onChange={this.onChange}
                                    rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Name!',
                                    },
                                    ]}
                                >
                                    <Input placeholder="Name" />
                                </Form.Item>

                                <Form.Item
                                    name="gender"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your gender!',
                                        },
                                    ]}
                                >
                                    <Select onChange={this.onGenderChange} placeholder="Gender">
                                        <Option value="Male">
                                            Male
                                        </Option>
                                        <Option value="Female">
                                            Female
                                        </Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    name="birthday"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your birthday!',
                                        },
                                    ]}
                                >
                                    <DatePicker
                                        placeholder="Birthday"
                                        format={dateFormat}
                                        allowClear={false}
                                        onChange={this.onBirthdateChange}
                                        disabledDate={d => !d || d.isAfter(maxBirthdate()) || d.isSameOrBefore("1900-00-00")}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="email"
                                    onChange={this.onChange}
                                    rules={[
                                        {
                                            type: "email",
                                            message: "Email is not valid."
                                        },
                                        {
                                            required: true,
                                            message: 'Please input your Email!',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Email" />
                                </Form.Item>

                                <Form.Item
                                    name="signupUsername"
                                    onChange={this.onChange}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Username!',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Username" />
                                </Form.Item>

                                <Form.Item
                                    name="signupPassword"
                                    onChange={this.onChange}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                        {
                                            min: 8,
                                            message: "Password must be at least 8 characters."
                                        }
                                    ]}
                                >
                                    <Input.Password placeholder="Password" />
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="btn" loading={this.state.isSignupLoading}>
                                        Signup
                                    </Button>
                                </Form.Item>

                                {
                                    this.state.showSignupResult &&
                                    <React.Fragment>
                                        {!this.state.validEmail && <div style={{textAlign: 'center', color: '#ff4d4f'}}>Email already exist!</div>}
                                        {!this.state.validUsername && <div style={{textAlign: 'center', color: '#ff4d4f'}}>Username already exist!</div>}
                                    </React.Fragment>
                                }

                            </Form>
                        </div>
                    </div>
                </div>
                <div className="login slide-up" id="login-container">
                    <div className="center">
                        <h2 className="form-title" id="login" onClick={onClickLogin}><span>or</span>Log in</h2>
                        <div className="form-holder">
                            <Form
                                className="login-form"
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={this.onSubmitLogin}
                            >

                                <Form.Item
                                    name="loginUsername"
                                    onChange={this.onChange}
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                                </Form.Item>

                                <Form.Item
                                    name="loginPassword"
                                    onChange={this.onChange}
                                >
                                    <Input.Password
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="Password"
                                    />
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="btn" loading={this.state.isLogining}>
                                        Login
                                    </Button>
                                </Form.Item>

                                {this.state.isLoginFailed && <div style={{color: '#ff4d4f'}}>Username or Password is wrong!</div>}

                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    onChange = (e) => {
        const field = e.target.id;
        const newValue = e.target.value;
        this.setState(prevState => {
            return {
                [field]: newValue
            }
        });
    }

    onGenderChange = (e) => {
        this.setState(prevState => {
            return {
                gender: e
            };
        });
    }

    onBirthdateChange = (date, dateString) => {
        this.setState(
            (prevState) => {
                return {
                    birthday: dateString
                }
            }
        );
    }

    onSubmitSignup = () => {
        this.setState(prevState => {
            return {
                isSignupLoading: true,
                showSignupResult: false
            };
        });
        const signup = {
            birthdate: this.state.birthday,
            email: this.state.email,
            gender: this.state.gender,
            nickname: this.state.name,
            password: this.state.signupPassword,
            username: this.state.signupUsername
        };
        Axios.post(`${serverURL()}/account/sign_up/`, JSON.stringify(signup), config)
        .then(res => {
            localStorage.setItem('token', res.data.data.token);
            this.setState(prevState => {
                return {
                    isSignupLoading: false
                };
            });
            this.props.isOnAfterSignup(true);
        })
        .catch(err => {
            this.setState(prevState => {
                return {
                    isSignupLoading: false,
                    showSignupResult: true
                };
            });
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
        });
    }

    onSubmitLogin = () => {
        const {loginUsername: username, loginPassword: password} = this.state;
        if (username && password) {
            this.setState(prevState => {
                return {
                    isLogining: true
                };
            });
            const login = {
                username: this.state.loginUsername,
                password: this.state.loginPassword
            };
            Axios.post(`${serverURL()}/account/login/`, JSON.stringify(login), config)
            .then(res => {
                localStorage.setItem('token', res.data.data.token);
                window.location.reload(true);
            })
            .catch(err => {
                this.setState(prevState => {
                    return {
                        isLogining: false,
                        isLoginFailed: true
                    };
                });
            });
        }
    }
}

export default MobileJoin;