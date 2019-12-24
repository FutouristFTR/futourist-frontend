import React, { Component } from "react";
import PlaceCardView from "./placeCardView";
import { withRouter } from "react-router-dom";

import withAddReview from "higherOrderComponents/withAddReview";

import urlHandling from "utils/urlHandling";

class PlaceCard extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.place.objectID !== this.props.place.objectID ||
      nextProps.isLoggedIn !== this.props.isLoggedIn
    );
  }
  render() {
    const url =
      urlHandling.createUrlFromName((this.props.place && this.props.place.name) || "place-name") +
      "-" +
      ((this.props.place && this.props.place.objectID) || "placeID");

    return (
      <PlaceCardView
        addReview={this.props.addReview}
        openLoginModal={this.props.openLoginModal}
        openAddReviewModal={this.props.openAddReviewModal}
        addPlaceToReviewModal={this.props.addPlaceToReviewModal}
        clearPlaceFromReviewModal={this.props.clearPlaceFromReviewModal}
        isLoggedIn={this.props.isLoggedIn}
        place={this.props.place}
        history={this.props.history}
        url={url}
        grid={this.props.grid}
      />
    );
  }
}

export default withAddReview(withRouter(PlaceCard));
