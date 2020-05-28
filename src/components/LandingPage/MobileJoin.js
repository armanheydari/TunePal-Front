import React from 'react';
import './styles/MobileJoin.scss';
import { Form, Input, Button, Select, DatePicker } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import moment from 'moment';

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
    render() {
        return (
            <div className="form-structor" id="join-mobile">
                <div className="signup" id="signup-container">
                    <div className="center">
                        <h2 className="form-title" id="signup" onClick={onClickSignup}><span>or</span>Sign up</h2>
                        <div className="form-holder">
                            <Form
                                name="normal_login"
                                className="login-form"
                                // onFinish={onFinish}
                                initialValues={{
                                    remember: false,
                                }}
                            >

                                <Form.Item
                                    name="name"
                                    rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Username!',
                                    },
                                    ]}
                                >
                                    <Input placeholder="Name" />
                                </Form.Item>

                                <Form.Item
                                    name="gender"
                                >
                                    <Select onChange={this.onGenderChange} placeholder="Gender" menuItemSelectedIcon={<UserOutlined className="site-form-item-icon" />}>
                                        <Option value="Male">
                                            Male
                                        </Option>
                                        <Option value="Female">
                                            Female
                                        </Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    name="birthdate"
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
                                        // {validator: this.validateEmail}
                                    ]}
                                >
                                    <Input placeholder="Email" />
                                </Form.Item>

                                <Form.Item
                                    name="username"
                                    onChange={this.onChange}
                                    rules={[
                                        {validator: this.validateUsername}
                                    ]}
                                >
                                    <Input placeholder="Username" />
                                </Form.Item>

                                <Form.Item
                                    name="password"
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
                                    <Button type="primary" htmlType="submit" className="LoginSignup_button">
                                        Signup
                                    </Button>
                                </Form.Item>

                            </Form>
                        </div>
                    </div>
                </div>
                <div className="login slide-up" id="login-container">
                    <div className="center">
                        <h2 className="form-title" id="login" onClick={onClickLogin}><span>or</span>Log in</h2>
                        <div className="form-holder">
                            <Form
                                name="normal_login"
                                className="login-form"
                                initialValues={{
                                    remember: true,
                                }}
                                // onFinish={onFinish}
                            >

                                <Form.Item
                                    name="username"
                                    rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Username!',
                                    },
                                    ]}
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                    ]}
                                >
                                    <Input.Password
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="Password"
                                    />
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="LoginSignup_button">
                                        Login
                                    </Button>
                                </Form.Item>

                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MobileJoin;