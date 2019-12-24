import React from "react";
import Dropzone from "react-dropzone";

import Button from "components/button";
import Icon from "components/icons";

const EditProfilePhotoModalView = props => (
  <React.Fragment>
    {props.isEditProfilePhotoModalOpen ? (
      <div
        className="modalContainer"
        onClick={() => {
          props.closeEditProfilePhotoModal();
          props.removeImageFile();
        }}
      >
        <div className="editProfilePhotoModalContainer" onClick={e => e.stopPropagation()}>
          <div className="headerContainer">
            <h4>Edit profile image</h4>
            <Icon
              name="close"
              color="#dce1e4"
              onClick={() => {
                props.closeEditProfilePhotoModal();
                props.removeImageFile();
              }}
              className="closeEditProfilePhotoModal"
            />
          </div>
          <div className="editProfilePhotoModalContentContainer">
            <p>Upload photo</p>
            <Dropzone
              onDropRejected={file => {
                if (file[0].size > 15000000) {
                  return props.setComponentState("error", "fileSize");
                } else if (file[0].type !== "image/*") {
                  return props.setComponentState("error", "fileType");
                }
              }}
              multiple={false}
              maxSize={15000000} // number is in bytes
              minSize={1} // number is in bytes
              accept={["image/*"]}
              onDrop={acceptedFiles => {
                if (acceptedFiles.length === 1) {
                  const preview = URL.createObjectURL(acceptedFiles[0]);
                  props.setComponentState("imageFile", acceptedFiles[0]);
                  props.setComponentState("imagePreview", preview);
                  props.setComponentState("error", "no_error");
                }
              }}
            >
              {({ getRootProps, getInputProps }) => {
                return (
                  <div>
                    {props.imageFile === null ? (
                      <div {...getRootProps()} className="dropzoneContainer">
                        <input {...getInputProps()} />
                        <span>Drag & Drop photo or click here to select from your device</span>
                      </div>
                    ) : props.imageFile.type.includes("image") ? (
                      <div className="uploadedContentContainer">
                        <div
                          className="removeContentButtonContainer"
                          onClick={props.removeImageFile}
                        >
                          <Icon name="close" color="#2a4153" size={12} />
                        </div>
                        <img
                          src={props.imagePreview}
                          alt="Uploaded Content"
                          className="uploadedContentPreview"
                        />
                      </div>
                    ) : null}
                  </div>
                );
              }}
            </Dropzone>

            {props.error === "fileSize" ? (
              <div className="errorContainer">
                <span className="errorMessage">
                  Uploaded photo is too big. Maximum upload size is 15MB. Please select a new photo.
                </span>
              </div>
            ) : props.error === "fileType" ? (
              <div className="errorContainer">
                <span className="errorMessage">Only images are allowed to upload.</span>
              </div>
            ) : null}
            {props.isUploaded ? (
              <div className="successContainer">
                <span className="successMessage">
                  You have successfully uploaded your profile photo.
                </span>
              </div>
            ) : null}
            <Button
              className={!props.imageFile ? "submitButtonDisabled" : "submitButton"}
              onClick={props.uploadProfileImage}
              disabled={!props.imageFile || props.uploading}
            >
              {props.uploading ? (
                <React.Fragment>
                  <span>{props.uploadPercentage}% </span>
                  <i className="fas fa-spinner fa-spin" />
                </React.Fragment>
              ) : (
                "Save changes"
              )}
            </Button>
          </div>
        </div>
      </div>
    ) : null}
  </React.Fragment>
);

export default EditProfilePhotoModalView;
