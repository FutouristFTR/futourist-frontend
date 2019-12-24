import React from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import { withRouter } from "react-router-dom";

import Button from "components/button";
import Icon from "components/icons";
import SetRating from "components/rating/setRating";
import withAddReview from "higherOrderComponents/withAddReview";
import routes from "constants/routes";
import PlacesSuggestions from "components/placesSuggestions";

// Views in which we shouldn't show addReview (+) button
const excludedViews = [routes.REGISTER, routes.EDIT_PROFILE];

const AddReviewModal = ({
  addReview,
  closeModal,
  openAddReviewModal,
  openLoginModal,
  errors,
  hoverRating,
  isLoggedIn,
  isModalOpen,
  mediaPreview,
  removeReviewMedia,
  review,
  setHoverRating,
  setRating,
  setReview,
  isUploaded,
  uploading,
  uploadPercentage,
  location,
  setPlace,
  removePlace,
  handleDropFiles,
  uploadReview,
  isMobile,
  loadingPreview,
}) => (
  <React.Fragment>
    {!excludedViews.includes(location.pathname) ? (
      <Button
        className="addReviewButtonContainer"
        onClick={
          isLoggedIn
            ? () => {
                openAddReviewModal();
              }
            : () => {
                openLoginModal();
                openAddReviewModal();
              }
        }
      >
        <Icon name="plus" color="#fff" size={"100%"} />
      </Button>
    ) : null}
    {isModalOpen && isLoggedIn ? (
      <div
        className="modalContainer"
        onClick={() => {
          closeModal();
        }}
      >
        <div className="addReviewModalInnerContainer" onClick={e => e.stopPropagation()}>
          {isUploaded ? (
            <React.Fragment>
              <div className="headerContainer">
                <h5>Add review</h5>
                <Icon
                  name="close"
                  color="#dce1e4"
                  onClick={() => {
                    closeModal();
                  }}
                  className="closeAddReviewModal"
                />
              </div>
              <div className="modalCentered">
                <img
                  alt="Add review success"
                  className="addReviewSuccessImage"
                  src="../assets/reviewUpload.png"
                />
                <h4>
                  Congratulations,
                  <br />
                  your review has been submited!
                </h4>
                <p className="addReviewSuccessMessage">
                  In this platform demo, admins will periodically check for new reviews and accept
                  them if the content doesn't violate any restrictions.
                </p>
              </div>
              <div className="submitReviewButtonContainer finishAddReviewSection">
                <Button className="submitButton" onClick={closeModal}>
                  {uploading ? <i className="fas fa-spinner fa-spin" /> : "Got it!"}
                </Button>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className="headerContainer">
                <h4>Add review</h4>
                <Icon
                  name="close"
                  color="#dce1e4"
                  onClick={() => {
                    closeModal();
                  }}
                  className="closeAddReviewModal"
                />
              </div>
              <div className="modalSectionContainer">
                <p>Select a place</p>
                {review.placeId ? (
                  <div>
                    <Icon
                      name="close"
                      color="#2a4153"
                      size={15}
                      onClick={() => {
                        removePlace();
                        setPlace("placeId", "", "placeName", "");
                      }}
                      className="clearSelectedPlace"
                    />
                    <span className="selectedPlace">{review.placeName}</span>
                  </div>
                ) : (
                  <div className="addReviewPlaceSearchWrapper">
                    <div className="inputSearch">
                      <input
                        type="text"
                        className="customInput addReviewSearch"
                        placeholder="Find a place for reviewing"
                        onChange={text => {
                          setReview("placeName", text.target.value);
                        }}
                      />
                      <Icon name="search" color="#2a4153" size={20} />
                    </div>
                    <PlacesSuggestions addReview={addReview} setPlace={setPlace} />
                  </div>
                )}
                <div className="errorContainer">
                  {errors.placeError ? (
                    <span className="errorMessage">Please select a place.</span>
                  ) : null}
                </div>
              </div>
              {!isMobile ? (
                <div className="modalSectionContainer desktopUpload">
                  <p>Upload photo or video</p>
                  <Dropzone
                    multiple={false}
                    minSize={1} // number is in bytes
                    accept={["image/*", "video/*"]}
                    onDrop={acceptedFiles => {
                      handleDropFiles(acceptedFiles);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => {
                      return (
                        <div>
                          {review.mediaFile === null ? (
                            <div {...getRootProps()} className="dropzoneContainer">
                              <input {...getInputProps()} />
                              <span>
                                Drag & Drop photo/video or click here to select from your computer
                              </span>
                            </div>
                          ) : review.mediaFile.type.includes("image") ? (
                            <div className="uploadedContentContainer">
                              <div
                                className="removeContentButtonContainer"
                                onClick={removeReviewMedia}
                              >
                                <Icon name="close" color="#2a4153" size={12} />
                              </div>
                              <img
                                src={mediaPreview}
                                alt="Uploaded Content"
                                className="uploadedContentPreview"
                              />
                            </div>
                          ) : (
                            <div className="uploadedContentContainer">
                              <div
                                className="removeContentButtonContainer"
                                onClick={removeReviewMedia}
                              >
                                <Icon name="close" color="#2a4153" size={12} />
                              </div>
                              <video
                                src={mediaPreview}
                                alt="Uploaded Content"
                                className="uploadedContentPreviewVideo"
                                autoPlay
                                muted
                                playsInline
                                loop
                                controls={false}
                              />
                            </div>
                          )}
                        </div>
                      );
                    }}
                  </Dropzone>
                  <div className="errorContainer">
                    {errors.mediaFileError.noMedia ? (
                      <span className="errorMessage">Please upload a media file.</span>
                    ) : errors.mediaFileError.fileSizeTooBig ? (
                      <span className="errorMessage">
                        Sorry, your file is to big. Images/Videos must be below 25 MB.
                      </span>
                    ) : errors.mediaFileError.wrongFileType ? (
                      <span className="errorMessage">
                        Incorrect file type, only images and videos can be uploaded.
                      </span>
                    ) : errors.mediaFileError.videoDurationTooLong ? (
                      <span className="errorMessage">
                        Selected video is too long, you can upload up to 15 seconds long videos.
                      </span>
                    ) : errors.mediaFileError.imageSizeTooSmall ? (
                      <span className="errorMessage">
                        Image too small, must be at least 310px x 500px.
                      </span>
                    ) : null}
                  </div>
                </div>
              ) : (
                <div className="modalSectionContainer mobileUpload">
                  <p>Add media</p>
                  <div className="mobileUploadContainer">
                    <Dropzone
                      multiple={false}
                      minSize={1} // number is in bytes
                      accept={"video/*"}
                      onDrop={acceptedFiles => {
                        handleDropFiles(acceptedFiles);
                      }}
                    >
                      {({ getRootProps, getInputProps }) => {
                        return (
                          <React.Fragment>
                            {loadingPreview ? (
                              <i className="fas fa-spinner fa-spin fa-3x spinnerStyle"></i>
                            ) : review.mediaFile === null ? (
                              <div {...getRootProps()} className="dropzoneMobileContainer">
                                <input {...getInputProps({ capture: "camcorder" })} />
                                <i className="fas fa-video fa-2x uploadImage"></i>
                                <span className="uploadButtonText">Shoot video</span>
                              </div>
                            ) : review.mediaFile.type.includes("image") ? (
                              <div className="uploadedContentContainer">
                                <div
                                  className="removeContentButtonContainer"
                                  onClick={removeReviewMedia}
                                >
                                  <Icon name="close" color="#2a4153" size={12} />
                                </div>
                                <img
                                  src={mediaPreview}
                                  alt="Uploaded Content"
                                  className="uploadedContentPreview"
                                />
                              </div>
                            ) : (
                              <div className="uploadedContentContainer">
                                <div
                                  className="removeContentButtonContainer"
                                  onClick={removeReviewMedia}
                                >
                                  <Icon name="close" color="#2a4153" size={12} />
                                </div>
                                <video
                                  src={mediaPreview}
                                  alt="Uploaded Content"
                                  className="uploadedContentPreviewVideo"
                                  autoPlay
                                  muted
                                  playsInline
                                  loop
                                  controls={false}
                                />
                              </div>
                            )}
                          </React.Fragment>
                        );
                      }}
                    </Dropzone>
                    <Dropzone
                      multiple={false}
                      minSize={1} // number is in bytes
                      accept={"image/*"}
                      onDrop={acceptedFiles => {
                        handleDropFiles(acceptedFiles);
                      }}
                    >
                      {({ getRootProps, getInputProps }) => {
                        return (
                          <React.Fragment>
                            {loadingPreview ? null : review.mediaFile === null ? (
                              <div {...getRootProps()} className="dropzoneMobileContainer">
                                <input {...getInputProps({ capture: "camera" })} />
                                <i className="fas fa-camera fa-2x uploadImage"></i>
                                <span className="uploadButtonText">Take photo</span>
                              </div>
                            ) : null}
                          </React.Fragment>
                        );
                      }}
                    </Dropzone>
                    <Dropzone
                      multiple={false}
                      minSize={1} // number is in bytes
                      accept={["image/*", "video/*"]}
                      onDrop={acceptedFiles => {
                        handleDropFiles(acceptedFiles);
                      }}
                    >
                      {({ getRootProps, getInputProps }) => {
                        return (
                          <React.Fragment>
                            {loadingPreview ? null : review.mediaFile === null ? (
                              <div {...getRootProps()} className="dropzoneMobileContainer">
                                <input {...getInputProps()} />
                                <i className="fas fa-upload fa-2x uploadImage"></i>
                                <span className="uploadButtonText">From gallery</span>
                              </div>
                            ) : null}
                          </React.Fragment>
                        );
                      }}
                    </Dropzone>
                  </div>
                  <div className="errorContainer">
                    {errors.mediaFileError.noMedia ? (
                      <span className="errorMessage">Please upload a media file.</span>
                    ) : errors.mediaFileError.fileSizeTooBig ? (
                      <span className="errorMessage">
                        Sorry, your file is to big. Images/Videos must be below 25 MB.
                      </span>
                    ) : errors.mediaFileError.wrongFileType ? (
                      <span className="errorMessage">
                        Incorrect file type, only images and videos can be uploaded.
                      </span>
                    ) : errors.mediaFileError.videoDurationTooLong ? (
                      <span className="errorMessage">
                        Selected video is too long, you can upload up to 15 seconds long videos.
                      </span>
                    ) : errors.mediaFileError.imageSizeTooSmall ? (
                      <span className="errorMessage">
                        Image too small, must be at least 310px x 500px.
                      </span>
                    ) : null}
                  </div>
                </div>
              )}
              <div className="modalSectionContainer">
                <div className="reviewDescriptionHeader">
                  <p>Write review</p>
                  <span className="charCounter">{review.description.length}/140 characters</span>
                </div>
                <textarea
                  className="customInput descriptionInput"
                  maxLength="140"
                  onChange={text => {
                    setReview("description", text.target.value);
                  }}
                  placeholder="Describe your experience"
                  type="text"
                  value={review.description}
                />
                <div className="errorContainer">
                  {errors.descriptionError ? (
                    <span className="errorMessage">Please write a few words about this place.</span>
                  ) : null}
                </div>
              </div>
              <div className="modalLastSection">
                <p>Rate this place</p>
                <SetRating
                  hoverRating={hoverRating}
                  review={review}
                  setHoverRating={setHoverRating}
                  setRating={setRating}
                  size={30}
                />
                {errors.ratingError ? (
                  <span className="errorMessage">Please rate this place.</span>
                ) : null}
              </div>
              <div className="submitReviewButtonContainer">
                <Button className="submitButton" onClick={uploadReview} disabled={uploading}>
                  {uploading ? (
                    <React.Fragment>
                      <span>{uploadPercentage} % </span>
                      <i className="fas fa-spinner fa-spin" />
                    </React.Fragment>
                  ) : (
                    "Add review"
                  )}
                </Button>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    ) : null}
  </React.Fragment>
);

AddReviewModal.propTypes = {
  closeModal: PropTypes.func,
  error: PropTypes.string,
  hoverRating: PropTypes.number,
  isModalOpen: PropTypes.bool,
  mediaPreview: PropTypes.string,
  openLoginModal: PropTypes.func,
  openAddReviewModal: PropTypes.func,
  removeReviewMedia: PropTypes.func,
  review: PropTypes.object,
  setHoverRating: PropTypes.func,
  setRating: PropTypes.func,
  setReview: PropTypes.func,
  uploading: PropTypes.bool,
  uploadMediaFile: PropTypes.func,
  user: PropTypes.object,
  handleDropFiles: PropTypes.func,
  uploadReview: PropTypes.func,
  uploadPercentage: PropTypes.number,
};

export default withAddReview(withRouter(AddReviewModal));
