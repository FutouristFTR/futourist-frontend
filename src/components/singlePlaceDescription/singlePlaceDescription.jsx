import React from "react";
import store from "redux/store";

import Button from "components/button/button";
import Rating from "components/rating/rating";
import RecentReviews from "components/recentReviews/recentReviews";
import Icon from "components/icons/icons";
import Tag from "components/tag/tag";
import PlaceLocationMap from "components/placeLocationMap/placeLocationMap";
import withAddReview from "higherOrderComponents/withAddReview";
import withWatchReview from "higherOrderComponents/withWatchReview";

function addHttps(url) {
  if (!url) return url;
  if (/[http|https]:/.test(url)) {
    return url;
  }
  return "https://" + url;
}
const SinglePlaceDescription = props => (
  <React.Fragment>
    <div className="container">
      <div className="placeDescriptionHeaderContainer">
        <div className="row">
          <div className="col-md-9 col-12">
            <h1>{props.place && props.place.name}</h1>
          </div>
          <div className="col-5 col-md-3">
            <Button
              className="submitButton"
              onClick={
                props.isLoggedIn
                  ? e => {
                      e.stopPropagation();
                      props.addPlaceToReviewModal(props.placeId, props.place.name, store.dispatch);
                      props.openAddReviewModal();
                    }
                  : e => {
                      e.stopPropagation();
                      props.openLoginModal();
                      props.addPlaceToReviewModal(props.placeId, props.place.name, store.dispatch);
                      props.openAddReviewModal();
                    }
              }
            >
              Add review
            </Button>
          </div>
        </div>
      </div>
      <div className="placeDescriptionSubheaderContainer">
        <div className="row">
          <div className="col-lg-6 col-md-8 col-12">
            <div className="reviewsAndRatingContainer">
              {props.place && props.place.latestReviews && (
                <RecentReviews
                  reviews={props.place && props.place.latestReviews}
                  onClick={() => props.openWatchReviewModal(0, store.dispatch)}
                />
              )}
              <Rating size={24} rating={props.place && props.place.rating} clickable={false} />
            </div>
          </div>
          <div className="col-lg-6 col-md-4 col-12">
            <div className="placeTagsContainer">
              {props.place &&
                props.place.tags &&
                props.place.tags.split(",").map((tag, index) => {
                  return <Tag key={index}>{tag}</Tag>;
                })}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="singlePlaceAboutContainer">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4">
            <p className="aboutHeader">About this place</p>
            <p>{props.place && props.place.pitch}</p>
          </div>
          <div className="col-12 col-md-5">
            <p className="aboutHeader">Location</p>
            {props.place && (
              <PlaceLocationMap
                lat={props.place && parseFloat(props.place.lat)}
                lng={props.place && parseFloat(props.place.lng)}
              />
            )}
          </div>
          <div className="col-12 col-md-3">
            <p className="aboutHeader">Contact Us</p>
            <div className="placeContactContainer">
              {props.place && props.place.street ? (
                <div className="contactAlign">
                  <div>
                    <Icon name="experience" size={20} />
                  </div>
                  <span className="contactText">
                    {props.place && props.place.street}, {props.place && props.place.city}
                  </span>
                </div>
              ) : null}

              {props.place && props.place.gsm ? (
                <div className="contactAlign">
                  <div>
                    <Icon name="phone" size={20} />
                  </div>
                  <span className="contactText">{props.place && props.place.gsm}</span>
                </div>
              ) : null}

              {props.place && props.place.email ? (
                <div className="contactAlign">
                  <div>
                    <Icon name="mail" size={20} />
                  </div>
                  <a href={`mailto:${props.place && props.place.email}`} className="contactText">
                    {props.place && props.place.email}
                  </a>
                </div>
              ) : null}

              {props.place && (props.place.web || props.place.facebook) ? (
                <div className="contactAlign">
                  <div>
                    <Icon name="world" size={20} />
                  </div>
                  <a
                    href={
                      props.place && (addHttps(props.place.web) || addHttps(props.place.facebook))
                    }
                    target="blank"
                    className="contactText"
                  >
                    {props.place && (props.place.web || props.place.facebook)}
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  </React.Fragment>
);

export default withAddReview(withWatchReview(SinglePlaceDescription));
