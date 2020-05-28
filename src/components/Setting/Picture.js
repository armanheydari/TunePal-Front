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
        isSucceed: undefined,
        removedFiles: [],
        addeddFiles: []
    }

    componentDidMount() {
        if (this.props.imgURL.length > 0) {
            const tempFileList = []
            for (let i = 0; i < this.props.imgURL.length; i++) {
                tempFileList.push({
                    uid: this.props.imgURL[i].id,
                    name: `image${this.props.imgURL[i].id}.png`,
                    status: 'done',
                    url: this.props.imgURL[i].image,
                });
            }
            this.setState(prevState => {
                return {
                    fileList: tempFileList
                };
            });
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
                        accept=".png, .jpg, .jpeg"
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
                        disabled={this.state.addeddFiles.length === 0 && this.state.removedFiles.length === 0}
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
                                There was a problem updating some of your pictures.
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

    handleChange = ({ fileList }) => {
        this.setState({ fileList });
    };

    onSubmit = () => {
        this.setState(prevState => {
            return {
                uploading: true,
                showResult: false
            };
        });
        const promises = [];
        this.state.removedFiles.forEach(item => {
            promises.push(
                Axios.get(`${serverURL()}/account/removeimage/?id=${item.uid}`, tokenConfig())
            );
        });
        this.state.addeddFiles.forEach(item => {
            const formData = new FormData();
            formData.append('user_avatar', item);
            promises.push(
                Axios.put(`${serverURL()}/account/addimage/`, formData, tokenConfig())
            );
        });
        Promise.all(promises).then(() => {
            this.setState(prevState => {
                return {
                    uploading: false,
                    showResult: true,
                    isSucceed: true,
                    removedFiles: [],
                    addeddFiles: []
                };
            });
        });
        Promise.all(promises).catch(() => {
            this.setState(prevState => {
                return {
                    uploading: false,
                    showResult: true,
                    isSucceed: false
                };
            });
        });
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
        if (typeof file.uid === 'string') {
            this.setState(prevState => {
                const newAddedFiles = prevState.addeddFiles.filter(item => item.uid !== file.uid)
                return {
                    addeddFiles: newAddedFiles
                };
            });
        }
        else {
            this.setState(prevState => {
                return {
                    removedFiles: [...prevState.removedFiles, file]
                };
            });
        }
    }

    beforeUpload = (file) => {
        this.setState(prevState => {
            return {
                fileList: [...prevState.fileList, file],
                addeddFiles: [...prevState.addeddFiles, file]
            };
        });
        return false;
    }

}

export default Picture;