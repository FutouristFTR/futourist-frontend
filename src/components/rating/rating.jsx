import React from "react";
import PropTypes from "prop-types";

import Icon from "../icons/icons";

const Rating = ({ iconColor, rating, ratingColor, ratingSize, showMaxRating, size }) => {
  const emptyStar = key => <Icon size={size} key={key} name={"star"} color={iconColor} />;
  const halfStar = key => <Icon size={size} key={key} name={"starHalf"} color={iconColor} />;
  const fullStar = key => <Icon size={size} key={key} name={"starActive"} color={iconColor} />;

  const ratingFull = Math.floor(rating);
  const ratingHalf = rating - ratingFull >= 0.25;

  const ratingArray = [emptyStar(1), emptyStar(2), emptyStar(3), emptyStar(4), emptyStar(5)];

  if (ratingHalf) {
    const newHalfStar = halfStar(ratingArray.length);
    ratingArray.unshift(newHalfStar);
  }

  for (let i = 0; i < ratingFull; i++) {
    const newFullStar = fullStar(ratingArray.length);
    ratingArray.unshift(newFullStar);
  }

  return (
    <div className="ratingContainer">
      {ratingArray.splice(0, 5).map((icon, index) => {
        return (
          <span className="starIconStyle" key={index}>
            {icon}
          </span>
        );
      })}
      <span
        className="userRatingnumber"
        style={{ fontSize: `${ratingSize}px`, color: ratingColor }}
      >
        {Math.round(rating * 10) / 10}
      </span>
      {showMaxRating ? (
        <div className="maxRatingNumberContainer">
          <span className="maxRatingNumber" style={{ color: ratingColor }}>
            /5
          </span>
        </div>
      ) : null}
    </div>
  );
};

Rating.defaultProps = {
  rating: 0,
  showMaxRating: true,
};

Rating.propTypes = {
  iconColor: PropTypes.string,
  rating: PropTypes.number,
  ratingColor: PropTypes.string,
  ratingSize: PropTypes.number,
  size: PropTypes.number,
  showMaxRating: PropTypes.bool,
};

export default Rating;
