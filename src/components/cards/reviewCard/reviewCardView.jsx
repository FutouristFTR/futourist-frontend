import React from "react";

import Rating from "components/rating";
import Icon from "components/icons";
import TimeAgo from "components/timeAgo";

import store from "redux/store";

const user = "/assets/user.jpg";

const ReviewCardView = ({
  openWatchReviewModal,
  reviewData,
  thumbnailSrc,
  indexInArray,
  userData,
  placeData,
}) => (
  <div
    className="reviewCardContainer"
    onClick={() => {
      openWatchReviewModal(indexInArray, store.dispatch);
    }}
  >
    <div className="reviewCardImageContainer">
      <div className="reviewGradient" />
      <img className="reviewThumbImage" src={thumbnailSrc} alt="review thumb" />
      <div className="reviewCardContentContainer">
        <div className="reviewCardUserContainer">
          <img
            className="reviewCardUserPhoto"
            src={(userData && userData.profilePhoto && userData.profilePhoto["50x50"]) || user}
            alt="User profile img"
          />
          <span className="reviewCardBoldText">{userData && userData.username}</span>
          <span className="reviewCardLightText">
            {reviewData.created && <TimeAgo createdTimestamp={reviewData.created} />}
          </span>
        </div>

        <div className="reviewCardDescription">
          <div className="reviewCardTitleTextContainer">
            <span className="reviewCardLightText">At </span>
            <span className="reviewCardBoldText">{placeData && placeData.name}</span>
          </div>

          <span className="reviewCardLightText reviewCardDescriptionText">
            {reviewData && reviewData.text}
          </span>
          <Rating
            clickable={false}
            iconColor="#fff"
            showMaxRating={false}
            ratingColor="#fff"
            ratingSize={16}
            size={16}
            rating={parseInt(reviewData.rating, 10)}
          />
        </div>

        {reviewData.type === "video" ? (
          <div className="reviewCardStartVideo">
            <Icon name="play" size={80} color="#fff" />
          </div>
        ) : null}
      </div>
    </div>
  </div>
);

export default ReviewCardView;
