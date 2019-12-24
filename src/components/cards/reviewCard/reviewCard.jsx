import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import ReviewCardView from "./reviewCardView";
import withWatchReview from "higherOrderComponents/withWatchReview";

import { pullPlace } from "api/collections/places";
import { pullUser } from "api/collections/users";

class ReviewCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbnailSrc: null,
    };
  }

  componentDidMount() {
    const thumbnailSize = {
      w: 310,
      h: 550,
    };
    if (this.props.reviewData.type === "image") {
      this.setState({
        thumbnailSrc: `${this.props.reviewData.mediaLinks["310x550"]}`,
      });
    } else {
      this.setState({
        thumbnailSrc: `https://image.mux.com/${this.props.reviewData.mediaId}/thumbnail.png?width=${thumbnailSize.w}&height=${thumbnailSize.h}&fit_mode=smartcrop&time=0`,
      });
    }

    if (!this.props.users[this.props.reviewData.userId]) {
      pullUser(this.props.reviewData.userId);
    }

    if (!this.props.places[this.props.reviewData.placeId]) {
      pullPlace(this.props.reviewData.placeId);
    }
  }

  render() {
    let userData = this.props.users[this.props.reviewData.userId];
    let placeData = this.props.places[this.props.reviewData.placeId];

    return (
      <ReviewCardView
        openWatchReviewModal={this.props.openWatchReviewModal}
        reviewData={this.props.reviewData}
        thumbnailSrc={this.state.thumbnailSrc}
        indexInArray={this.props.indexInArray}
        userData={userData}
        placeData={placeData}
      />
    );
  }
}

const mapStateToProps = state => {
  return { users: state.collections.users, places: state.collections.places };
};

export default compose(
  connect(
    mapStateToProps,
    null
  )
)(withWatchReview(ReviewCard));
