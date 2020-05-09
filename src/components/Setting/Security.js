import React from 'react';
import Axios from 'axios';
import { Form, Input, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import tokenConfig from '../../utils/tokenConfig';

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

const isObjectEmpty = (obj) => {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}

class Security extends React.Component {
    state = {
        username: this.props.username,
        email: this.props.email,
        submitting: false,
        showResult: false,
        isSucceed: false,
        validUsername: false,
        validEmail: false
    }

    formRef = React.createRef();

    render() {
        return (
            <div className="Setting_section">
                <div className="Setting_section-title">Security</div>
                <Form
                    {...formItemLayout}
                    className="Setting_form"
                    onFinish={this.onFinish}
                    ref={this.formRef}
                    initialValues={this.formInitialValues()}
                    scrollToFirstError={true}
                >
                    <Form.Item
                        name="username"
                        label="Username"
                        onChange={this.onChange}
                        rules={[
                            {validator: this.validateUsername}
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        onChange={this.onChange}
                        rules={[
                            {
                                type: "email",
                                message: "Email is not valid."
                            },
                            // {validator: this.validateEmail}
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" disabled={isObjectEmpty(this.changes())} loading={this.state.submitting}>
                            Submit
                        </Button>

                        <Button htmlType="button" onClick={this.onReset}>
                            Reset
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
                                {!this.state.validUsername && (
                                    <div>
                                        <FontAwesomeIcon icon={faTimes} className="Setting_result-icon" />
                                        Username already exists.
                                    </div>
                                )}
                                {!this.state.validEmail && (
                                    <div>
                                        <FontAwesomeIcon icon={faTimes} className="Setting_result-icon" />
                                        Email already exists.
                                    </div>
                                )}
                                {(this.state.validUsername && this.state.validEmail) && (
                                    <div>
                                        <FontAwesomeIcon icon={faTimes} className="Setting_result-icon" />
                                        There was a problem updating your info.
                                    </div>
                                )}
                            </div>
                        )
                    }
                </Form>
            </div>
        );
    }

    formInitialValues = () => {
        const {username, email} = this.props;
        return {
            username,
            email
        }
    }

    onReset = () => {
        const resetValues = this.formInitialValues();
        this.formRef.current.setFieldsValue(resetValues);
        this.setState(prevState => {
            return this.props;
        });
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

    validateUsername = (rule, value) => {
        if (value) return Promise.resolve();
        return Promise.reject("Username is required.")
    }

    changes = () => {
        let changes = {};
        if (this.state.username !== this.props.username) {
            changes.username = this.state.username;
        }
        if (this.state.email !== this.props.email) {
            changes.email = this.state.email;
        }
        return changes;
    }

    onFinish = () => {
        const changes = this.changes();
        const toBackJSON = JSON.stringify(changes);
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
            this.props.updateState();
        })
        .catch(err => {
            if (err.response.data.hasOwnProperty('username')) {
                this.setState(() => {
                    return {
                        validUsername: false
                    };
                });
            }
            else {
                this.setState(() => {
                    return {
                        validUsername: true
                    };
                });
            }
            if (err.response.data.hasOwnProperty('email')) {
                this.setState(() => {
                    return {
                        validEmail: false
                    };
                });
            }
            else {
                this.setState(() => {
                    return {
                        validEmail: true
                    };
                });
            }
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

export default Security;