import React from 'react';
import './styles/MobileJoin.scss';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

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
        if (element.prop == prop && element.value == value) {
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
            loginContainer.pseudoStyle("before","background-color","red !important");
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
            document.getElementById('join-mobile').style.background = "red";
            loginContainer.pseudoStyle("before","background-color","white !important");
        }
	});
}

class MobileJoin extends React.Component {
    render() {
        return (
            <div className="form-structor" id="join-mobile">
                <div className="signup" id="signup-container">
                    <h2 className="form-title" id="signup" onClick={onClickSignup}><span>or</span>Sign up</h2>
                    <div className="form-holder">
                        <input type="text" className="input" placeholder="Name" />
                        <input type="email" className="input" placeholder="Email" />
                        <input type="password" className="input" placeholder="Password" />
                    </div>
                    <button className="submit-btn">Sign up</button>
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
                                        Log in
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