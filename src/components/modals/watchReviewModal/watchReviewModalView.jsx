import React from "react";
import { Link } from "react-router-dom";

import Rating from "components/rating";
import Icon from "components/icons";

import VideoPlayer from "components/videoPlayer";
import TimeAgo from "components/timeAgo";
import routes from "constants/routes";

const user = "/assets/user.jpg";
const setLoadingStyle = () => {
  let reviewWrapper = document.getElementById("watchReviewModalContainer");
  if (reviewWrapper) {
    if (window.innerHeight * 0.9 * 9 > window.innerWidth * 16) {
      reviewWrapper.style.width = window.innerWidth + "px";
      reviewWrapper.style.height = (window.innerWidth * 16) / 9 + "px";
    } else {
      reviewWrapper.style.height = window.innerHeight * 0.9 + "px";
      reviewWrapper.style.width = (window.innerHeight * 0.9 * 9) / 16 + "px";
    }
  }
  return true;
};
const unsetLoadingStyle = () => {
  let reviewWrapper = document.getElementById("watchReviewModalContainer");
  if (reviewWrapper) {
    reviewWrapper.style.height = "unset";
    reviewWrapper.style.width = "unset";
  }
};

const WatchReviewModal = props => {
  return (
    <React.Fragment>
      {props.isWatchReviewModalOpen ? (
        <div className="modalContainer fadeIn">
          <div className="watchReviewOuterContainer" onClick={props.closeWatchReviewModal}>
            <div className="watchReviewModalContainer" id="watchReviewModalContainer">
              {props.review && props.review.type === "image" ? (
                setLoadingStyle() && (
                  <img
                    src={props.review.mediaLinks["1080x1920"]}
                    alt="test"
                    onLoad={() => unsetLoadingStyle()}
                    onLoadedData={() => unsetLoadingStyle()}
                    style={{
                      maxWidth: "100%",
                      maxHeight: window.innerHeight * 0.9,
                      borderRadius: "6px",
                    }}
                    onClick={e => e.stopPropagation()}
                  />
                )
              ) : (
                <VideoPlayer
                  src={`https://stream.mux.com/${props.review && props.review.mediaId}.m3u8`}
                ></VideoPlayer>
              )}
              <div
                className="upperGradient"
                onClick={e => {
                  e.stopPropagation();
                }}
              />
              <div
                className="bottomGradient"
                onClick={e => {
                  e.stopPropagation();
                }}
              />
              <div
                className="nextReviewContainer"
                onClick={e => {
                  e.stopPropagation();
                  props.showNextReview();
                }}
              />
              {props.index === 0 && !props.allReviewsLoaded ? null : (
                <div
                  className="prevReviewContainer"
                  onClick={e => {
                    e.stopPropagation();
                    props.showPreviousReview();
                  }}
                />
              )}

              <div className="reviewInfo">
                <Link
                  className="reviewUserProfileLink"
                  onClick={props.closeWatchReviewModal}
                  to={`/user/${props.review && props.review.userId}`}
                >
                  <img
                    className="reviewAuthorPhoto"
                    src={
                      (props.userData &&
                        props.userData.profilePhoto &&
                        props.userData.profilePhoto["50x50"]) ||
                      user
                    }
                    alt="User's profile img"
                    // onClick={e => e.stopPropagation()}
                  />
                  <div className="reviewAuthorName">
                    <span>{props.userData && props.userData.username}</span>
                  </div>
                </Link>
                <div className="reviewPostedDate">
                  {props.review && props.review.created && (
                    <TimeAgo createdTimestamp={props.review.created} />
                  )}
                </div>
              </div>
              <div
                className="reviewContent"
                onClick={e => {
                  e.stopPropagation();
                }}
              >
                <div
                  className="reviewTitle"
                  onClick={e => {
                    e.stopPropagation();
                    props.history.push(routes.SINGLE_PLACE + "/" + props.placeUrl);
                    props.closeWatchReviewModal();
                  }}
                >
                  At <strong>{props.placeData && props.placeData.name}</strong>
                </div>
                <div className="reviewDescription">
                  <span className="reviewDescriptionText">{props.review && props.review.text}</span>
                </div>
                <Rating
                  size={24}
                  iconColor="#fff"
                  showMaxRating={true}
                  ratingColor="#fff"
                  rating={parseInt(props.review && props.review.rating, 10)}
                />
              </div>
              {props.index === 0 && !props.allReviewsLoaded ? null : (
                <div className="buttonLeft">
                  <Icon
                    name="back"
                    size={40}
                    color="#ffffff"
                    onClick={e => {
                      e.stopPropagation();
                      props.showPreviousReview();
                    }}
                  />
                </div>
              )}
              {props.reviews.length > 1 ? (
                <div className="buttonRight">
                  <Icon
                    name="forward"
                    size={40}
                    color="#ffffff"
                    onClick={e => {
                      e.stopPropagation();
                      props.showNextReview();
                    }}
                  />
                </div>
              ) : (
                <div className="buttonRight" />
              )}
            </div>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default WatchReviewModal;
