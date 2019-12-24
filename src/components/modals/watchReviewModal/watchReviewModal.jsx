import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import WatchReviewModalView from "./watchReviewModalView";
import withWatchReview from "higherOrderComponents/withWatchReview";
import urlHandling from "utils/urlHandling";

class WatchReviewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      review: {},
      reviews: this.props.reviews,
      index: this.props.watchReview.currentIndex,
    };
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
    if (this.state.index + 1 >= this.state.reviews.length) {
      this.props.loadMoreReviews();
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
    this.props.closeWatchReviewModal();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.reviews !== prevState.reviews) {
      return { reviews: nextProps.reviews };
    }
    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.index !== this.state.index || nextState.reviews !== this.state.reviews;
  }

  showNextReview = () => {
    this.setState({ index: (this.state.index + 1) % this.state.reviews.length });

    if (this.state.index + 2 >= this.state.reviews.length) {
      this.props.loadMoreReviews();
    }
  };

  showPreviousReview = () => {
    this.setState({
      index: (this.state.index - 1 + this.state.reviews.length) % this.state.reviews.length,
    });
  };

  handleKeyDown = event => {
    // Esc key
    if (this.props.watchReview.isWatchReviewModalOpen && event.keyCode === 27) {
      document.removeEventListener("keydown", this.handleKeyDown);
      this.props.closeWatchReviewModal();
    }
    // Left arrow
    if (
      (this.props.watchReview.isWatchReviewModalOpen &&
        this.state.index !== 0 &&
        event.keyCode === 37) ||
      (this.props.watchReview.isWatchReviewModalOpen &&
        this.state.index === 0 &&
        this.props.allReviewsLoaded &&
        event.keyCode === 37)
    ) {
      this.showPreviousReview();
    }
    // Right arrow
    if (this.props.watchReview.isWatchReviewModalOpen && event.keyCode === 39) {
      this.showNextReview();
    }
  };

  render() {
    let review = this.state.reviews[this.state.index][
      Object.keys(this.props.reviews[this.state.index])
    ];
    let userData = this.props.users[review.userId];
    let placeData = this.props.places[review.placeId];
    let placeUrl =
      urlHandling.createUrlFromName((placeData && placeData.name) || "place-name") +
      "-" +
      (review.placeId || "placeID");

    return (
      <WatchReviewModalView
        isWatchReviewModalOpen={this.props.watchReview.isWatchReviewModalOpen}
        closeWatchReviewModal={this.props.closeWatchReviewModal}
        showNextReview={this.showNextReview}
        showPreviousReview={this.showPreviousReview}
        review={review}
        reviews={this.state.reviews}
        userData={userData}
        placeData={placeData}
        placeUrl={placeUrl}
        index={this.state.index}
        allReviewsLoaded={this.props.allReviewsLoaded}
        history={this.props.history}
      />
    );
  }
}

const mapStateToProps = state => {
  return { places: state.collections.places, users: state.collections.users };
};

export default compose(
  connect(
    mapStateToProps,
    null
  )
)(withWatchReview(withRouter(WatchReviewModal)));
