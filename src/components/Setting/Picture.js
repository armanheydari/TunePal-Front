import React from 'react';
import Axios from 'axios';
import { Upload, Modal, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import tokenConfig from '../../utils/tokenConfig';
import serverURL from '../../utils/serverURL';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class Picture extends React.Component {
    state = {  
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [],
        uploading: false,
        showResult: false,
        isSucceed: undefined
    }

    componentDidMount() {
        if (this.props.imgURL) {
            const object = {
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: this.props.imgURL,
            }
            this.setState(prevState => {
                return {
                    fileList: [object]
                };
            })
        }
    }

    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="clearfix Setting_section">
                <div className="Setting_section-title">Picture</div>
                <div className="Setting_form-picture">
                    <Upload
                        onRemove={this.onRemove}
                        beforeUpload={this.beforeUpload}
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
                    >
                        {fileList.length >= 8 ? null : uploadButton}
                    </Upload>

                    <Modal
                        visible={previewVisible}
                        title={previewTitle}
                        footer={null}
                        onCancel={this.handleCancel}
                    >
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>

                    <Button
                        onClick={this.onSubmit}
                        type="primary"
                        loading={this.state.uploading}
                        className="Setting_Picture_btn"
                    >
                        Submit
                    </Button>

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
                </div>
            </div>
        );
    }

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    handleChange = ({ fileList }) => this.setState({ fileList });

    onSubmit = () => {
        if (this.state.fileList.length > 0) {
            if (this.state.fileList[0].uid !== "-1") {
                const formData = new FormData();
                formData.append('user_avatar', this.state.fileList[0].originFileObj);
                this.setState(prevState => {
                    return {
                        uploading: true,
                        showResult: false
                    };
                });
                Axios.put(`${serverURL()}/account/sign_up/`, formData, tokenConfig())
                .then(res => {
                    this.setState(prevState => {
                        return {
                            uploading: false,
                            showResult: true,
                            isSucceed: true
                        };
                    });
                })
                .catch(err => {
                    this.setState(prevState => {
                        return {
                            uploading: false,
                            showResult: true,
                            isSucceed: false
                        };
                    });
                });
            }
        }
    }

    onRemove = (file) => {
        this.setState(prevState => {
            const index = prevState.fileList.indexOf(file);
            const newFileList = prevState.fileList.slice();
            newFileList.splice(index, 1);
            return {
                fileList: newFileList,
            };
        });
    }

    beforeUpload = (file) => {
        this.setState(prevState => {
            return {
                fileList: [...prevState.fileList, file],
            }; 
        });
        return false;
    }

}

export default Picture;