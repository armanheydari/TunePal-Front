import React from 'react';
import Axios from 'axios';
import { Form, Input, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

const tokenConfig = () => {
    return {
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
    }
}

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
                span: 24,
        },
        sm: {
            span: 16,
        },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

class Password extends React.Component {
    state = {
        password: "",
        submitting: false,
        showResult: false,
        isSucceed: false
    }

    render() {
        return (
            <div className="Setting_section">
                <div className="Setting_section-title">Password</div>
                <Form
                    {...formItemLayout}
                    className="Setting_form"
                    onFinish={this.onFinish}
                    scrollToFirstError={true}
                >
                    <Form.Item
                        name="password"
                        label="Password"
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
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Passwords do not match.');
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        {...tailFormItemLayout}
                    >
                        <Button type="primary" htmlType="submit" loading={this.state.submitting} disabled={!this.state.password}>
                            Submit
                        </Button>
                    </Form.Item>

                    {
                        (this.state.showResult && this.state.isSucceed) && (
                            <div className="Setting_result-pass">
                                <FontAwesomeIcon icon={faCheck} className="Setting_result-icon" />
                                Your info successfully updated.
                            </div>
                        )
                    }

                    {
                        (this.state.showResult && !this.state.isSucceed) && (
                            <div className="Setting_result-fail">
                                <FontAwesomeIcon icon={faTimes} className="Setting_result-icon" />
                                There was a problem updating your info.
                            </div>
                        )
                    }
                </Form>
            </div>
        );
    }

    onChange = (e) => {
        const newValue = e.target.value;
        this.setState(prevState => {
            return {
                password: newValue
            }
        });
    }

    onFinish = () => {
        const toBackJSON = JSON.stringify(this.state);
        this.setState(prevState => {
            return {
                submitting: true,
                showResult: false
            };
        });
        Axios.put('http://tunepal.pythonanywhere.com/account/sign_up/', toBackJSON, tokenConfig())
        .then(res => {
            this.setState(prevState => {
                return {
                    showResult: true,
                    isSucceed: true,
                    submitting: false
                };
            });
        })
        .catch(err => {
            this.setState(prevState => {
                return {
                    showResult: true,
                    isSucceed: false,
                    submitting: false
                };
            });
        });
    }
}

export default Password;