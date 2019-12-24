import React from "react";
import store from "redux/store";

import routes from "constants/routes";

import Button from "components/button/button";
import Rating from "components/rating/rating";
import RecentReviews from "components/recentReviews/recentReviews";
import Icon from "components/icons/icons";

const unavailableImage = "/assets/unavailableImage.jpg";

const PlaceCardView = props => {
  return (
    <div className={props.grid ? props.grid : "col-12 col-md-6 col-lg-4"}>
      <div
        className="placeCardLink"
        onClick={() => props.history.push(routes.SINGLE_PLACE + `/${props.url}`)}
      >
        <div className="placeCardContainer">
          <div className="placeCardImageContainer">
            <div
              className="placeCardImage"
              style={{
                backgroundImage: `url(${
                  props.place && props.place.photo
                    ? props.place.photo.links["533x300"]
                    : props.place && props.place.photos
                    ? props.place.photos[0].links["533x300"]
                    : unavailableImage
                })`,
              }}
            />
          </div>
          {props.place && !props.place.rating ? (
            <Button
              className="addFisrtReviewButton"
              onClick={
                props.isLoggedIn
                  ? e => {
                      e.stopPropagation();
                      props.addPlaceToReviewModal(
                        props.place.objectID,
                        props.place.name,
                        store.dispatch
                      );
                      props.openAddReviewModal();
                    }
                  : e => {
                      e.stopPropagation();
                      props.openLoginModal();
                      props.addPlaceToReviewModal(
                        props.place.objectID,
                        props.place.name,
                        store.dispatch
                      );
                      props.openAddReviewModal();
                    }
              }
            >
              <Icon name="plus" className="addFirstReviewIcon" /> Be first to add your review
            </Button>
          ) : (
            <div className="placeCardReviewsAndRatingContainer">
              <RecentReviews reviews={props.place && props.place.latestReviews} />
              <Rating
                rating={props.place && props.place.rating}
                clickable={false}
                showMaxRating={false}
                ratingSize={16}
                size={16}
              />
            </div>
          )}
          <h5>{(props.place && props.place.name) || "Place title"}</h5>
          <p>{(props.place && props.place.pitch) || "Place pitch"}</p>
        </div>
      </div>
    </div>
  );
};

export default PlaceCardView;
