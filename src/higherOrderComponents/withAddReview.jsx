import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import axios from "axios";
import firebase from "firebase";
import loadImage from "blueimp-load-image";

import {
  openAddReviewModal,
  closeAddReviewModal,
  addReviewClearSuggestions,
  addPlaceToReviewModal,
  clearPlaceFromReviewModal,
} from "redux/actions";
import withLoginForm from "./withLoginForm";

import { makeSuggestionForPlaceQuery } from "api/algolia/algoliaQuery";
import store from "redux/store";

const initState = {
  review: {
    description: "",
    mediaFile: null,
    placeId: "",
    rating: 0,
    placeName: "",
  },
  loadingPreview: false,
  errors: {
    placeError: false,
    mediaFileError: {
      noMedia: false,
      fileSizeTooBig: false,
      wrongFileType: false,
      videoDurationTooLong: false,
      imageSizeTooSmall: false,
    },
    descriptionError: false,
    ratingError: false,
  },
};

export default Component => {
  class WithAddReview extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        review: initState.review,

        videoDuration: 0,
        mediaPreview: null,
        hoverRating: 0,
        errors: initState.errors,

        fcmToken: null,
        firebaseToken: null,
        notificationsAllowed: false,
        uploading: false,
        uploadPercentage: 0,
        isUploaded: false,
        isSuggestionPicked: false,
        isMobile: false,
      };
    }

    componentDidMount() {
      // todo: add place id on singleplace page visit to state from redux
      this.deviceCheck();
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          firebase
            .auth()
            .currentUser.getIdToken()
            .then(firebaseToken => this.setState({ firebaseToken }));
        }
      });
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      if (
        nextProps.addReview.currentPlace.placeId &&
        nextProps.addReview.currentPlace.placeId !== prevState.review.placeId &&
        nextProps.addReview.currentPlace.placeName !== prevState.review.placeName
      ) {
        const newPlace = Object.assign({}, nextProps.addReview.currentPlace);

        nextProps.clearPlaceFromReviewModal();

        return {
          review: {
            ...prevState.review,
            placeId: newPlace.placeId,
            placeName: newPlace.placeName,
          },
        };
      }
      return null;
    }

    componentWillUnmount() {
      this.setState({ isUploaded: false });
    }

    httpRequest(method, url, data, percentageListener) {
      const onUploadProgress = progressEvt => {
        const currentPercentage = Math.floor((progressEvt.loaded * 100) / progressEvt.total);
        if (percentageListener) percentageListener(currentPercentage);
      };

      return firebase
        .auth()
        .currentUser.getIdToken()
        .then(firebaseToken => ({
          Authorization: `Bearer ${firebaseToken}`,
        }))
        .then(headers => axios({ method, url, data, onUploadProgress, headers }));
    }

    deviceCheck = () => {
      if (window.innerWidth < 1024) {
        this.setState({ isMobile: true });
      }
    };

    uploadImage() {
      const storage = firebase.storage().ref();
      const review = firebase
        .firestore()
        .collection("reviews")
        .doc();
      const imageLocation = `reviews/${review.id}/${review.id}-rp.jpg`;

      // storage
      //   .child(imageLocation)
      //   .put(this.state.review.mediaFile, {
      //     customMetadata: {
      //       fcmToken: this.state.fcmToken,
      //       rating: this.state.review.rating,
      //       placeId: this.state.review.placeId,
      //       text: this.state.review.description,
      //       userId: firebase.auth().currentUser.uid,
      //       type: "image",
      //     },
      //   })

      const imageUpload = storage.child(imageLocation).put(this.state.review.mediaFile, {
        customMetadata: {
          fcmToken: this.state.fcmToken,
          rating: this.state.review.rating,
          placeId: this.state.review.placeId,
          text: this.state.review.description,
          userId: firebase.auth().currentUser.uid,
          type: "image",
        },
      });

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
            review: initState.review,
          });
        })
        .catch(() => this.setState({ uploading: false, uploadPercentage: 0 }));
    }

    getVideoUploadUrl = () =>
      this.httpRequest(
        "POST",
        process.env.REACT_APP_CLOUDFUNCTIONS_URL + "/videoReviewUpload/getUrl",
        {
          fcmToken: this.state.fcmToken,
          rating: this.state.review.rating,
          placeId: this.state.review.placeId,
          text: this.state.review.description,
          userId: firebase.auth().currentUser.uid,
          type: "video",
        }
      );

    percentageListener = uploadPercentage => {
      this.setState({ uploadPercentage });
    };

    uploadVideoTo(url) {
      return this.httpRequest("PUT", url, this.state.review.mediaFile, this.percentageListener)
        .then(() =>
          this.setState({
            isUploaded: true,
            uploading: false,
            uploadPercentage: 0,
            review: initState.review,
          })
        )
        .catch(error => {
          this.setState({ uploading: false });
          if (error.response) {
            console.error(error.response.data);
            console.error(error.response.status);
            console.error(error.response.headers);
          } else if (error.request) {
            console.error(error.request);
          } else {
            console.error("Error", error.message);
          }
          console.error(error);
        });
    }

    uploadMediaFile = () => {
      this.setState({ uploading: true });
      if (this.state.review.mediaFile.type.includes("image")) {
        return this.uploadImage();
      }

      if (this.state.review.mediaFile.type.includes("video")) {
        return this.getVideoUploadUrl()
          .then(response => this.uploadVideoTo(response.data.url))
          .catch(err => {
            console.error(err, err.message);
            this.setState({ uploading: false });
          });
      }

      return null;
    };

    setReview = (fieldName, value) => {
      if (fieldName === "placeName") {
        if (value.length > 2) {
          makeSuggestionForPlaceQuery(value);
        } else {
          addReviewClearSuggestions(store.dispatch);
        }
      }
      if (fieldName === "videoDuration") {
        if (value > 16) {
          this.setState({
            errors: {
              ...this.state.errors,
              mediaFileError: { videoDurationTooLong: true },
            },
            review: { ...this.state.review, mediaFile: null },
          });
        }
      }
      if (fieldName === "description") {
        this.setState({
          errors: { ...this.state.errors, descriptionError: false },
          review: { ...this.state.review, [fieldName]: value },
        });
      }

      this.setState({ review: { ...this.state.review, [fieldName]: value } });
    };

    setPlace = (placeIdField, placeIdValue, placeNameField, placeNameValue) => {
      this.setState(
        {
          review: { ...this.state.review, [placeIdField]: placeIdValue },
        },
        () => {
          this.setState({
            review: { ...this.state.review, [placeNameField]: placeNameValue },
            isSuggestionPicked: true,
            errors: { ...this.state.errors, placeError: false },
          });
        }
      );
    };

    handleDropFiles = acceptedFiles => {
      this.setState({ loadingPreview: true });
      if (acceptedFiles.length === 0) {
        this.setState({
          loadingPreview: false,
          errors: {
            ...this.state.errors,
            mediaFileError: { wrongFileType: true },
          },
        });
      } else if (
        acceptedFiles[0].size > 25000000 &&
        acceptedFiles[0].type.substring(0, 5) === "image"
      ) {
        this.setState({
          loadingPreview: false,
          errors: {
            ...this.state.errors,
            mediaFileError: { fileSizeTooBig: true },
          },
        });
      } else if (acceptedFiles.length === 1) {
        if (acceptedFiles[0].type.substring(0, 5) === "image") {
          const loadImageOptions = { canvas: true };
          loadImage.parseMetaData(acceptedFiles[0], data => {
            if (data.exif && data.exif.get("Orientation")) {
              loadImageOptions.orientation = data.exif.get("Orientation");
            }
            loadImage(
              acceptedFiles[0],
              (canvas, data2) => {
                if (data2.originalWidth < 310 || data2.originalHeight < 500) {
                  this.setState({
                    loadingPreview: false,
                    errors: {
                      ...this.state.errors,
                      mediaFileError: { imageSizeTooSmall: true },
                    },
                  });
                } else {
                  acceptedFiles[0].preview = canvas.toDataURL(acceptedFiles[0].type);
                  this.setReview("mediaFile", acceptedFiles[0]);
                  this.setMediaPreview(acceptedFiles[0].preview);
                  this.setState({
                    loadingPreview: false,
                    errors: { ...initState.errors },
                  });
                }
              },
              loadImageOptions
            );
          });
        } else if (acceptedFiles[0].type.substring(0, 5) === "video") {
          const preview = URL.createObjectURL(acceptedFiles[0]);
          const vid = document.createElement("video");
          vid.src = preview;
          vid.ondurationchange = () => {
            this.setReview("videoDuration", vid.duration);
          };
          this.setReview("mediaFile", acceptedFiles[0]);
          this.setMediaPreview(preview);
          this.setState({
            loadingPreview: false,
            errors: { ...initState.errors },
          });
        }
      }
    };

    uploadReview = () => {
      firebase
        .auth()
        .currentUser.getIdToken(true)
        .then(idToken => {
          if (this.state.review.placeId === "" && this.state.review.placeName === "") {
            this.setState({
              errors: {
                ...this.state.errors,
                placeError: true,
              },
            });
          } else if (this.state.review.mediaFile === null) {
            this.setState({
              errors: {
                ...this.state.errors,
                mediaFileError: { noMedia: true },
              },
            });
          } else if (this.state.review.description.length === 0) {
            this.setState({
              errors: {
                ...this.state.errors,
                descriptionError: true,
              },
            });
          } else if (this.state.review.rating === 0) {
            this.setState({
              errors: {
                ...this.state.errors,
                ratingError: true,
              },
            });
          } else {
            this.setState({ errors: initState.errors });
            this.uploadMediaFile();
          }
        })
        .catch(function(error) {
          if (error) throw error;
        });
    };

    removePlace = () => {
      this.setState({ isSuggestionPicked: false });
    };

    setMediaPreview = mediaPreview => this.setState({ mediaPreview });

    removeReviewMedia = () =>
      this.setState({
        review: { ...this.state.review, mediaFile: null },
        mediaPreview: null,
        loadingPreview: false,
      });

    setRating = rating =>
      this.setState({
        errors: { ...this.state.errors, ratingError: false },
        review: { ...this.state.review, rating },
      });

    setHoverRating = rating => this.setState({ hoverRating: rating });

    closeModal = () => {
      this.props.closeModal();
      this.setState({ isUploaded: false, review: initState.review });
    };

    render() {
      const {
        hoverRating,
        review,
        mediaPreview,
        uploading,
        uploadPercentage,
        isSuggestionPicked,
        errors,
        isUploaded,
        isMobile,
        loadingPreview,
      } = this.state;

      return (
        <React.Fragment>
          <Component
            {...this.props}
            loadingPreview={loadingPreview}
            addReview={this.props.addReview}
            place={this.props.place}
            closeModal={this.closeModal}
            openAddReviewModal={this.props.openAddReviewModal}
            openLoginModal={this.props.openLoginModal}
            removeReviewMedia={this.removeReviewMedia}
            resetHoverRating={this.resetHoverRating}
            setHoverRating={this.setHoverRating}
            setRating={this.setRating}
            setReview={this.setReview}
            setReviewDescription={this.setReviewDescription}
            uploading={uploading}
            uploadMediaFile={this.uploadMediaFile}
            hoverRating={hoverRating}
            isModalOpen={this.props.addReview.isAddReviewModalOpen}
            review={review}
            mediaPreview={mediaPreview}
            errors={errors}
            setPlace={this.setPlace}
            handleSuggestionClick={this.handleSuggestionClick}
            removePlace={this.removePlace}
            isSuggestionPicked={isSuggestionPicked}
            isLoggedIn={this.props.isLoggedIn}
            addPlaceToReviewModal={this.props.addPlaceToReviewModal}
            clearPlaceFromReviewModal={this.props.clearPlaceFromReviewModal}
            isUploaded={isUploaded}
            handleDropFiles={this.handleDropFiles}
            uploadReview={this.uploadReview}
            uploadPercentage={uploadPercentage}
            isMobile={isMobile}
          />
        </React.Fragment>
      );
    }
  }

  const mapStateToProps = state => {
    return {
      addReview: state.addReview,
    };
  };

  const dispatchActions = function(dispatch) {
    return {
      openAddReviewModal: function() {
        openAddReviewModal(dispatch);
      },
      closeModal: function() {
        closeAddReviewModal(dispatch);
      },
      addPlaceToReviewModal: function(placeId, placeName) {
        addPlaceToReviewModal(placeId, placeName, dispatch);
      },
      clearPlaceFromReviewModal: function() {
        clearPlaceFromReviewModal(dispatch);
      },
    };
  };

  return compose(connect(mapStateToProps, dispatchActions)(withLoginForm(WithAddReview)));
};
