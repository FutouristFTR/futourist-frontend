import React from "react";
import PropTypes from "prop-types";

import Icon from "../icons/icons";

const SetRating = ({
  clickable,
  hoverRating,
  iconColor,
  ratingColor,
  ratingSize,
  review,
  setHoverRating,
  setRating,
  showMaxRating,
  size,
}) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Icon
        size={size}
        key={i}
        onClick={() => setRating(i)}
        onMouseEnter={() => setHoverRating(i)}
        onMouseLeave={() => setHoverRating(0)}
        name={(hoverRating || (review && review.rating)) < i ? "star" : "starActive"}
        className={clickable ? "ratingStar" : ""}
        color={iconColor}
      />
    );
  }

  return (
    <div className="ratingContainer">
      {stars}
      <span
        className="userRatingnumber"
        style={{ fontSize: `${ratingSize}px`, color: ratingColor }}
      >
        {hoverRating || (review && review.rating)}
      </span>
      {showMaxRating ? (
        <div className="maxRatingNumberContainer">
          <span className="maxRatingNumber">/5</span>
        </div>
      ) : null}
    </div>
  );
};

SetRating.defaultProps = {
  clickable: true,
  setHoverHoverRating: () => null,
  setRating: () => null,
  rating: 0,
  showMaxRating: true,
};

SetRating.propTypes = {
  clickable: PropTypes.bool,
  hoverRating: PropTypes.number,
  iconColor: PropTypes.string,
  rating: PropTypes.number,
  ratingColor: PropTypes.string,
  ratingSize: PropTypes.number,
  review: PropTypes.object,
  size: PropTypes.number,
  setRating: PropTypes.func,
  setHoverRating: PropTypes.func,
  showMaxRating: PropTypes.bool,
};

export default SetRating;
