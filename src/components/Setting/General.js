import React from 'react';
import Axios from 'axios';
// import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Form, Input, Button, Select, DatePicker } from 'antd';
import tokenConfig from '../../utils/tokenConfig';
import serverURL from '../../utils/serverURL';
const { Option } = Select;
const { TextArea } = Input;
const dateFormat = 'YYYY-MM-DD';

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

const isObjectEmpty = (obj) => {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}

class General extends React.Component {
    state = {
        name: this.props.name,
        gender: this.props.gender,
        birthdate: this.props.birthdate,
        biography: this.props.biography,
        favorites: this.props.favorites,
        uploading: false,
        showResult: false,
        isSucceed: undefined
    }
    
    formRef = React.createRef();

    render() {
        return (
            <div className="Setting_section">
                <div className="Setting_section-title">General</div>
                <Form
                    {...formItemLayout}
                    className="Setting_form"
                    onFinish={this.onFinish}
                    ref={this.formRef}
                    initialValues={this.formInitialValues()}
                    scrollToFirstError={true}
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        onChange={this.onChange}
                        rules={[
                            {validator: this.validateName}
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="gender"
                        label="Gender"
                    >
                        <Select onChange={this.onGenderChange}>
                            <Option value="Male">
                                Male
                            </Option>
                            <Option value="Female">
                                Female
                            </Option>
                        </Select>
                    </Form.Item>

                    {/* <Form.Item
                        name="birthdate"
                        label="Birthdate"
                    >
                        <DatePicker
                            format={dateFormat}
                            allowClear={false}
                            onChange={this.onBirthdateChange}
                            disabledDate={d => !d || d.isAfter(maxBirthdate()) || d.isSameOrBefore("1900-00-00")}
                        />
                    </Form.Item> */}

                    <Form.Item
                        name="biography"
                        label="Biography"
                        onChange={this.onChange}
                        
                    >
                        <TextArea
                            autoSize
                            maxLength={500}
                        />
                    </Form.Item>

                    <Form.Item
                        name="favorites"
                        label="Favorites"
                        onChange={this.onChange}
                    >
                        <TextArea
                            autoSize
                            // maxLength={30}
                        />
                    </Form.Item>
                    
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" disabled={isObjectEmpty(this.changes())} loading={this.state.uploading}>
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
                                <FontAwesomeIcon icon={faTimes} className="Setting_result-icon" />
                                There was a problem updating your info.
                            </div>
                        )
                    }
                </Form>
            </div>
        );
    }

    formInitialValues = () => {
        const {name, gender, biography, favorites} = this.props;
        // const birthdate = moment(this.props.birthdate, 'YYYY-MM-DD');
        return {
            name,
            gender,
            // birthdate,
            biography,
            favorites
        }
    }

    onReset = () => {
        const resetValues = this.formInitialValues();
        this.formRef.current.setFieldsValue(resetValues);
        this.setState(prevState => {
            return this.props;
        });
    }

    validateName = (rule, value) => {
        if (value) return Promise.resolve();
        return Promise.reject("Name is required.")
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

    onBirthdateChange = (date, dateString) => {
        this.setState(
            (prevState) => {
                return {
                    birthdate: dateString
                }
            }
        );
    }

    onGenderChange = (e) => {
        this.setState(prevState => {
            return {
                gender: e
            };
        });
    }

    changes = () => {
        let changes = {};
        if (this.state.name !== this.props.name) {
            changes.nickname = this.state.name;
        }
        if (this.state.gender !== this.props.gender) {
            changes.gender = this.state.gender;
        }
        if (this.state.birthdate !== this.props.birthdate) {
            changes.birthdate = this.state.birthdate;
        }
        if (this.state.biography !== this.props.biography) {
            changes.biography = this.state.biography;
        }
        if (this.state.favorites !== this.props.favorites) {
            changes.interests = this.state.favorites;
        }
        return changes;
    }

    onFinish = () => {
        const changes = this.changes();
        const toBackJSON = JSON.stringify(changes);
        this.setState(prevState => {
            return {
                uploading: true,
                showResult: false
            };
        });
        Axios.put(`${serverURL()}/account/sign_up/`, toBackJSON, tokenConfig())
        .then(res => {
            this.setState(prevState => {
                return {
                    showResult: true,
                    isSucceed: true,
                    uploading: false
                };
            });
            this.props.updateState();
        })
        .catch(err => {
            this.setState(prevState => {
                return {
                    showResult: true,
                    isSucceed: false,
                    uploading: false
                };
            });
        });
    }
}

export default General;