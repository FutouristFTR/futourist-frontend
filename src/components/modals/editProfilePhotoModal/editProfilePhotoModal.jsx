import React, { Component } from "react";
import EditProfilePhotoModalView from "./editProfilePhotoModalView";
import firebase from "firebase";

class EditProfilePhotoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePreview: null,
      imageFile: null,
      uploading: false,
      isUploaded: false,
      uploadPercentage: 0,

      fcmToken: null,
      firebaseToken: null,
    };
  }

  setComponentState = (property, value) => this.setState({ [property]: value });

  removeImageFile = () => this.setState({ imageFile: null });

  percentageListener = uploadPercentage => {
    this.setState({ uploadPercentage });
  };

  uploadProfileImage = () => {
    this.setState({ uploading: true });

    const storage = firebase.storage().ref();
    const imageLocation = `users/${this.props.userId}/${this.props.userId}-up.jpg`;

    const imageUpload = storage.child(imageLocation).put(this.state.imageFile);

    imageUpload.on("state_changed", snapshot => {
      let progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      this.percentageListener(progress);
    });

    return imageUpload
      .then(() => {
        this.setState({
          isUploaded: true,
          uploading: false,
          uploadPercentage: 0,
          imageFile: null,
        });
      })
      .catch(() => this.setState({ uploading: false, uploadPercentage: 0 }));
  };

  closeModal = () => {
    this.props.closeModal();
    this.setState({ isUploaded: false });
  };

  render() {
    return (
      <EditProfilePhotoModalView
        closeEditProfilePhotoModal={this.closeModal}
        isEditProfilePhotoModalOpen={this.props.openModal}
        openEditProfilePhotoModal={this.openEditProfilePhotoModal}
        setComponentState={this.setComponentState}
        removeImageFile={this.removeImageFile}
        uploadProfileImage={this.uploadProfileImage}
        uploadPercentage={this.state.uploadPercentage}
        uploading={this.state.uploading}
        isUploaded={this.state.isUploaded}
        {...this.state}
      />
    );
  }
}

export default EditProfilePhotoModal;
